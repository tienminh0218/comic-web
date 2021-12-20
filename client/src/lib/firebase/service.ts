import {
    doc,
    setDoc,
    collection,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    onSnapshot,
    QuerySnapshot,
    DocumentData,
    Query,
} from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL, deleteObject } from "firebase/storage";

import { dbStore, dbStorage } from "./config";
import { convertsData, convertData } from "@/utils/index";

/// Firestore

const addDb = async (collectionName: string, payload: any, ...arg: any[]) => {
    const docRef =
        arg.length >= 1 ? doc(dbStore, collectionName, arg[0]) : doc(collection(dbStore, collectionName));
    await setDoc(docRef, payload);
};

const updateDb = async (collectionName: string, document: string, payload: any) => {
    const docRef = doc(dbStore, collectionName, document);
    await updateDoc(docRef, payload);
};

const getDocDb = async <T>(collectionName: string, document: string): Promise<T> => {
    const docRef = doc(dbStore, collectionName, document);
    const docSnap = await getDoc(docRef);
    return convertData<T>(docSnap);
};

const getDocsDb = async <T>(collectionName: string, opt?: Query<DocumentData>): Promise<T> => {
    const docRef = collection(dbStore, collectionName);
    const q = opt ? opt : query(docRef);
    const querySnapshot = await getDocs(q);
    return convertsData<T>(querySnapshot);
};

const deleteDb = async (collectionName: string, document: string) => {
    const docRef = doc(dbStore, collectionName, document);
    await deleteDoc(docRef);
};

export const firestore = {
    getDocDb,
    getDocsDb,
    addDb,
    deleteDb,
    updateDb,
};

/// Storage

const uploadFile = async (file: any, nameFile: string, parentFolder: string = "comics") => {
    const fullPath: string = `${parentFolder}/${nameFile}`;
    const storageRef = ref(dbStorage, fullPath);
    const data = await uploadBytes(storageRef, file);

    return {
        data,
        fullPath,
    };
};

const deleteFile = async (path: string) => {
    if (!path) return;
    const desertRef = ref(dbStorage, path);
    return deleteObject(desertRef);
};

const getUrl = async (path: string): Promise<string> => {
    const refPath = ref(dbStorage, path);
    return getDownloadURL(refPath);
};

const uploadAndGetUrl = async (file: any, nameFile: string, parentFolder: string = "comics") => {
    const { fullPath } = await uploadFile(file, nameFile, parentFolder);
    return {
        url: await getUrl(fullPath),
        fullPath,
    };
};

export const storage = { uploadFile, getUrl, uploadAndGetUrl, deleteFile };

///

export const listeningDocs = (collectionName: string, callback: (data: QuerySnapshot<DocumentData>) => void) => {
    const q = query(collection(dbStore, collectionName));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        callback(querySnapshot);
    });
    return unsubscribe;
};

export const listeningDoc = <T>(collectionName: string, document: string, callback: (data: T) => void) => {
    const docRef = doc(dbStore, collectionName, document);
    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        callback(convertData(querySnapshot));
    });
    return unsubscribe;
};
