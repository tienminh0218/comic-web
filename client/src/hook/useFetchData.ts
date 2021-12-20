// import { useEffect, useState } from "react";
// import { QueryConstraint } from "firebase/firestore";
// import { firestore } from "@/firebase/service";

// export const useFetchData = <T>(collection: string, document?: string, opt?: QueryConstraint) => {
//     const [data, setData] = useState<T>();

//     useEffect(() => {
//         const getDocs = async () => {
//             const result = await firestore.getDocsDb<T>(collection, opt);
//             setData(result);
//         };

//         const getDoc = async () => {
//             const result = await firestore.getDocDb<T>(collection, document!);
//             setData(result);
//         };

//         document ? getDoc() : getDocs();
//     }, [document, collection, opt]);

//     return { data, setData };
// };

export {};
