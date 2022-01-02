import { db } from "../firebase/config";
import { convertsData } from "../utils";

export const HomeController = {
    async getAll(req, res, next) {
        try {
            const comicRef = db.collection("comics");
            const result = await Promise.all([
                comicRef.where("recommended", "==", true).get(),
                comicRef.orderBy("interacts.views", "desc").limit(6).get(),
                comicRef.orderBy("updatedAt", "desc").limit(8).get(),
                comicRef.orderBy("createdAt", "desc").limit(6).get(),
            ]);
            const [recommend, popular, lastUpdated, newSeries] = result.map((list) => convertsData(list));

            res.status(200).json({
                recommend,
                popular,
                lastUpdated,
                newSeries,
            });
        } catch (error) {
            next(error);
        }
    },
};
