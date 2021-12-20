import { DocumentData, QuerySnapshot, DocumentSnapshot } from "firebase/firestore";

export const convertsData = <T>(querySnapshot: QuerySnapshot<DocumentData>) => {
    const data: T | any = [];
    querySnapshot.forEach((doc) => {
        const item: any = { id: doc.id, ...doc.data() };
        data.push(item);
    });
    return data;
};

export const convertData = <T>(doc: DocumentSnapshot<DocumentData>) => {
    const data: T | any = { id: doc.id, ...doc.data() };
    return doc.exists() ? data : null;
};
