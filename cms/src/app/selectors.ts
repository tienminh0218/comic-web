import { selector } from "recoil";

import { genreState } from "./atoms";
import { LIST_GENRES } from "constant/recoilKeys";
import { GenreSelectorState } from "models";

export const listGenreState = selector<GenreSelectorState[]>({
    key: LIST_GENRES,
    get: ({ get }) => {
        const listGenre = get(genreState);
        return listGenre.map((item) => ({
            name: item.name,
            slug: item.slug!,
        }));
    },
});
