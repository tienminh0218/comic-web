import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
// import serviceAccount from "./serviceAccountKey.json";
import "dotenv/config";

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDS);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
});

const db = getFirestore();

export { db };
