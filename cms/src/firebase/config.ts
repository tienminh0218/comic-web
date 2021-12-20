import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { configService } from "../config";

/// config
const firebaseConfig = {
    apiKey: configService.getValue("REACT_APP_FIREBASE_API_KEY"),
    authDomain: configService.getValue("REACT_APP_FIREBASE_AUTH_DOMAIN"),
    projectId: configService.getValue("REACT_APP_FIREBASE_PROJECT_ID"),
    storageBucket: configService.getValue("REACT_APP_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: configService.getValue("REACT_APP_FIREBASE_MESS_SENDER_ID"),
    appId: configService.getValue("REACT_APP_FIREBASE_APP_ID"),
    measurementId: configService.getValue("REACT_APP_FIREBASE_MEASUAREMENT_ID"),
};

/// initialize firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/// get fireStore
const dbStore = getFirestore();

/// get storage
const dbStorage = getStorage();

/// get auth
const auth = getAuth();

if (configService.getValue("REACT_APP_FIREBASE_MODE") === "emulator") {
    console.log("Firebase Emulator Mode");
    connectFirestoreEmulator(dbStore, "localhost", 8080);
    connectStorageEmulator(dbStorage, "localhost", 9199);
    connectAuthEmulator(auth, "http://localhost:9099");
}

export { dbStore, dbStorage, auth };
export default app;
