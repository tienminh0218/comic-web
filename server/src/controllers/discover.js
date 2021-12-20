import { db } from "../firebase/config";
import { convertsData } from "../utils";

const STATUS = {
    1: "Đang tiến hành",
    2: "Đã hoàn thành",
    3: "Tạm ngưng",
};

const DATE = {
    1: "desc",
    2: "asc",
};

const ORDER_COMIC = "nameFolder";

const getCursorOnField = async (id) => {
    const comic = await db.collection("comics").doc(id).get();
    return comic.exists ? comic.data().createdAt : null;
};

export const DiscoverController = {
    async getMore(req, res, next) {
        const { nextPage } = req.query;
        if (!nextPage) return res.status(200).json([]);
        const cursor = await getCursorOnField(nextPage);
        if (cursor) {
            const comicsRef = db.collection("comics").orderBy("createdAt", "desc");
            const comics = convertsData(await comicsRef.startAfter(cursor).limit(8).get());
            return res.status(200).json(comics);
        }
        return res.status(200).json([]);
    },

    async getAll(req, res, next) {
        try {
            const comicRef = db.collection("comics");
            const result = await Promise.all([
                comicRef.orderBy("interacts.views", "desc").limit(6).get(),
                comicRef.orderBy("createdAt", "desc").limit(8).get(),
            ]);
            const [popular, lastUpdated] = result.map((list) => convertsData(list));
            res.status(200).json({
                popular,
                lastUpdated,
            });
        } catch (error) {
            next(error);
        }
    },

    /// still fixing
    async filter(req, res, next) {
        try {
            let filterRef = db.collection("comics");
            const { genres, status, upload, nextPage } = req.query;
            if (genres) filterRef = filterRef.where("genres", "array-contains-any", genres.split(","));
            if (DATE[upload] === "asc") filterRef = filterRef.orderBy("createdAt", "asc");
            else filterRef = filterRef.orderBy("createdAt", "desc");
            if (STATUS[status]) filterRef = filterRef.where("status", "==", STATUS[status]);
            if (nextPage) {
                const cursor = await getCursorOnField(nextPage);
                cursor && (filterRef = filterRef.startAfter(cursor));
            }

            const data = convertsData(await filterRef.limit(18).get());
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },
};
