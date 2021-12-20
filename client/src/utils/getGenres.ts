import { GenreType } from "@/models/genre";

export const getGenres = (listGenres: GenreType[], listSlug: string[]) => {
    if (!(listGenres && listSlug)) return [];
    return listGenres.filter((genre) => {
        const isExist = listSlug.findIndex((slug) => genre.slug === slug);
        if (isExist !== -1) return true;
    });
};
