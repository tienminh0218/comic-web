import { selectorFamily } from "recoil";

import { interactComicsState, comicsHaveReadState } from "./atoms";
import { COMICS_INTERACTED, COMICS_HAVE_READ } from "@/commons/recoilKey";
import { HistoryOfComicState, InteractOfComicType } from "@/models/index";

export const interactOfComic = selectorFamily<InteractOfComicType, string>({
    key: COMICS_INTERACTED,
    get:
        (comicId) =>
        ({ get }) => {
            const DEFAULT_VALUE = {
                isLike: false,
                isBookmark: false,
            };
            const comicsInteracted = get(interactComicsState);
            const index = comicsInteracted.findIndex((item) => item.idComic === comicId);
            return index === -1
                ? { interactState: DEFAULT_VALUE, index }
                : { interactState: comicsInteracted[index], index };
        },
});

export const historyOfComic = selectorFamily<HistoryOfComicState | undefined, string | undefined>({
    key: COMICS_HAVE_READ,
    get:
        (comicId) =>
        ({ get }) => {
            if (!comicId) return;
            const histories = get(comicsHaveReadState);
            const index = histories.findIndex((item) => item.idComic === comicId);
            return index === -1 ? undefined : { comic: histories[index], index };
        },
});
