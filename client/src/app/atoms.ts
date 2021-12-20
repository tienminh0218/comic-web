import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { UserStateType, GenreType, HistoryViewed, ComicWasInteracted } from "@/models/index";
import { CURRENT_USER, GENRE_STATE, INTERACT_COMIC_STATE, COMICS_READ_STATE } from "@/commons/index";

const { persistAtom } = recoilPersist();

export const userState = atom<UserStateType | undefined>({
    key: CURRENT_USER,
    default: undefined,
});

export const interactComicsState = atom<ComicWasInteracted[]>({
    key: INTERACT_COMIC_STATE,
    default: [],
});

export const comicsHaveReadState = atom<HistoryViewed[]>({
    key: COMICS_READ_STATE,
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const genresState = atom<GenreType[] | undefined>({
    key: GENRE_STATE,
    default: undefined,
});
