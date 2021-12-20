import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { CURRENT_USER, GENRES_COMIC } from "constant/recoilKeys";
import { GenreType, UserAtomState } from "models";

const { persistAtom } = recoilPersist({
    key: "recoil-persist",
    storage: localStorage,
});

export const userState = atom<UserAtomState>({
    key: CURRENT_USER,
    default: {
        currentUser: undefined,
    },
    effects_UNSTABLE: [persistAtom],
});

export const genreState = atom<GenreType[]>({
    key: GENRES_COMIC,
    default: [],
});
