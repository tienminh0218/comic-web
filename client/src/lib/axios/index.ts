import queryString from "query-string";
import { ComicType, FilterParams } from "@/models/index";
import axios from "./config";

export const apiClient = {
    async homePage<T>(): Promise<T> {
        return await axios.get("/home");
    },

    async getTitles(): Promise<ComicType[]> {
        return await axios.get("/titles");
    },

    async getTitleById<T>(id: string | string[]): Promise<T> {
        return await axios.get(`/titles/${id}`);
    },

    async discover<T>(): Promise<T> {
        return await axios.get(`/discover`);
    },

    async discoverGetMoreComic<T>(id: string): Promise<T> {
        return await axios.get(`/discover/getMore?nextPage=${id}`);
    },

    async filter<T>(params: FilterParams): Promise<T> {
        const paramsString = queryString.stringify(params);
        return await axios.get(`/discover/filter?${paramsString}`);
    },

    async getChapterById<T>(idTitle: string, idChap: string): Promise<T> {
        return await axios.get(`/titles/${idTitle}/views/${idChap}`);
    },

    async getListBookmark(userId: string): Promise<ComicType[]> {
        return await axios.get(`/users/${userId}`);
    },
};
