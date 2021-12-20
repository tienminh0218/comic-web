import { Timestamp } from "@firebase/firestore";

export interface ImagesChapter {
    fullPath: string;
    nameFile: string;
    url: string;
}

export interface Chapter {
    id?: string;
    nameChapter: string;
    images: ImagesChapter[];
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}
