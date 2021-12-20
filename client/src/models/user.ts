import { Timestamp, FieldValue } from "firebase/firestore";

interface InfoUser {
    firstName: string | any;
    lastName: string | any;
    dob?: string;
    phoneNumber?: string;
    gender?: string;
    email?: string;
    photoURL?: string;
}

export interface HistoryViewed {
    idComic?: string;
    createdAt?: Timestamp | Date | any;
    updatedAt?: Timestamp | Date | any;
    nameChapter: string;
    idChapter: string;
    imageURL: string;
    nameComic: string;
}

export interface ComicWasInteracted {
    idComic?: string;
    isLike: boolean;
    isBookmark: boolean;
}

export interface HistoryUser {
    comicsWasInteracted: ComicWasInteracted[];
    viewed: HistoryViewed[];
}

export interface User {
    id?: string;
    providerId: string;
    info: InfoUser;
    histories: HistoryUser;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface InsertNewUser {
    providerId: string;
    info: InfoUser;
}
