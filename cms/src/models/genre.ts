export interface GenreType {
    id?: string;
    name: string;
    describe: string;
    slug?: string;
}

export type AddGenreType = {
    name: string;
    describe: string;
};
