import { db } from "../firebase/config";
import createError from "http-errors";
import { convertsData, convertData, sortChapters, getNextAndPrev } from "../utils";

export const TitleController = {
    async getAll(req, res, next) {
        try {
            const comics = convertsData(await db.collection("comics").get());
            res.status(200).json(comics);
        } catch (error) {
            next(error);
        }
    },

    async getOne(req, res, next) {
        try {
            const idComic = req.params.id;
            if (!idComic) next(createError(400, "Missing params"));
            const comic = convertData(await db.collection("comics").doc(idComic).get());
            comic && (comic.listChapter = sortChapters(comic.listChapter));
            res.status(200).json({ comic });
        } catch (error) {
            next(error);
        }
    },

    async getChap(req, res, next) {
        try {
            const { id, idChap } = req.params;
            if (!(id && idChap)) next(createError(400, "Gì vậy trời"));
            const result = await Promise.all([
                db.collection("comics").doc(id).get(),
                db.collection("comics").doc(id).collection("chapters").doc(idChap).get(),
            ]);
            const [comic, chapter] = result.map((list) => convertData(list));
            comic.listChapter = sortChapters(comic.listChapter);
            const nextAndPrev = getNextAndPrev(comic.listChapter, chapter.id);
            res.status(200).json({ nextAndPrev, comic, chapter });
        } catch (error) {
            next(error);
        }
    },
};
