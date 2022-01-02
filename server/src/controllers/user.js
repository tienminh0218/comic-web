import { db } from "../firebase/config";
import createError from "http-errors";
import { convertsData, convertData, sortChapters, getNextAndPrev } from "../utils";

export const UserController = {
    async getBookmark(req, res, next) {
        try {
            const { userId } = req.params;
            if (!userId) return next(createError(400, "Bookmark Not Found"));
            const user = convertData(await db.collection("users").doc(userId).get());
            const listBookmark = user.histories.comicsWasInteracted;
            const newList = listBookmark.filter((item) => item.isBookmark);
            if (listBookmark.length === 0) return res.status(200).json([]);
            const comics = convertsData(
                await Promise.all(
                    newList.map((item) => {
                        return db.collection("comics").doc(item.idComic).get();
                    })
                )
            );
            return res.status(200).json(comics);
        } catch (error) {
            next(error);
        }
    },
};
