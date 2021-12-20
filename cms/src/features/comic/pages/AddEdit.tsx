import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

import { ComicForm } from "../components/ComicForm";
import { storage, firestore } from "firebase/service";
import { schemaImagesUpload } from "../validate";
import { COMICS } from "constant/collectionName";
import { generateSlug } from "utils";
import { ComicType } from "models";
import { mainURL } from "../";

export type ImagesComic = "BANNER" | "THUMBNAIL";
interface DetailImage {
    file: any[];
    url: string;
}
export interface ImagesUploadType {
    banner: DetailImage;
    thumbnail: DetailImage;
}

const initStateImages = {
    banner: { file: [], url: "" },
    thumbnail: { file: [], url: "" },
};

export const AddEditComic = () => {
    const { comicId } = useParams<{ comicId: string }>();
    const [isError, setIsError] = useState(false);
    const history = useHistory();
    const [images, setImages] = useState<ImagesUploadType>(initStateImages);
    const isEdit = Boolean(comicId);
    const [comic, setComic] = useState<ComicType>();

    useEffect(() => {
        if (!isEdit) return;

        (async () => {
            const data: any = await firestore.getDocDb(COMICS, comicId);
            setComic(data);
            setImages({
                banner: { file: [], url: data!.images!.banner.url },
                thumbnail: { file: [], url: data!.images!.thumbnail.url },
            });
        })();
    }, [comicId, isEdit]);

    const addComic = async (payload: ComicType) => {
        try {
            const nameFolder = `${generateSlug(payload.name.orgName)}_${uuidv4()}`;
            const path = `${nameFolder}/images`;
            const [banner, thumbnail] = await Promise.all([
                handleUploadImage(images.banner.file[0], path, "_banner.jpg"),
                handleUploadImage(images.thumbnail.file[0], path, "_thumbnail.jpg"),
            ]);

            await firestore.addDb(COMICS, {
                ...payload,
                images: {
                    banner,
                    thumbnail,
                },
                nameFolder,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        } catch (error) {
            console.log({ error });
        }
    };

    const updateComic = async ({ id, createdAt, ...payload }: ComicType) => {
        try {
            const [banner, thumbnail] = await Promise.all([
                handleUploadImage(images.banner.file[0], payload.nameFolder, "images/_banner.jpg"),
                handleUploadImage(images.thumbnail.file[0], payload.nameFolder, "images/_thumbnail.jpg"),
            ]);
            await firestore.updateDb(COMICS, id!, {
                ...payload,
                images: {
                    banner: banner || payload.images?.banner,
                    thumbnail: thumbnail || payload.images?.thumbnail,
                },
                updatedAt: serverTimestamp(),
            });
        } catch (error) {
            console.log({ error });
        }
    };

    const handleUploadImage = async (file: any[], nameFolder: string, nameFile: string) => {
        if (!file) return;
        return storage.uploadAndGetUrl(file, `${nameFolder}/${nameFile}`);
    };

    const onSubmit = async (formValue: ComicType) => {
        try {
            /// validate image upload
            !isEdit && schemaImagesUpload.validateSync({ images });
            isError && setIsError(false);
            isEdit ? await updateComic(formValue) : await addComic(formValue);

            toast.success(`${isEdit ? "Cập nhật thành công" : "Thêm thành công"} `);
            history.push(`/${mainURL}`);
        } catch (error) {
            console.log({ error });
            setIsError(true);
        }
    };

    const previewImages = (type: ImagesComic, file: any) => {
        type === "BANNER" &&
            setImages({
                ...images,
                banner: {
                    file,
                    url: URL.createObjectURL(file[0]),
                },
            });

        type === "THUMBNAIL" &&
            setImages({
                ...images,
                thumbnail: {
                    file,
                    url: URL.createObjectURL(file[0]),
                },
            });
    };

    const initialValues: ComicType = {
        name: {
            orgName: "",
            vnName: "",
        },
        author: "",
        status: "Đang tiến hành",
        genres: [],
        describe: "",
        deleted: false,
        nameFolder: "",
        recommended: false,
        interacts: {
            bookMark: 0,
            like: 0,
            unlike: 0,
            views: 0,
        },
        listChapter: [],
        comments: [],

        ...comic,
    };

    return (
        <div className="pb-7">
            <div className="group transition-all duration-150">
                <Link
                    className="group-hover:text-indigo-400 flex items-center h-5 text-gray-500"
                    to={`/${mainURL}${isEdit ? `/${comicId}/detail` : ""}`}
                >
                    <ChevronLeftIcon className="w-5" /> <span>Back</span>
                </Link>
            </div>
            <div className="mt-5 title">{isEdit ? "Cập nhật" : "Thêm Truyện"}</div>
            {(!isEdit || Boolean(comic)) && (
                <div className="mt-2">
                    <ComicForm
                        showError={isError}
                        imageUpload={images}
                        onDrop={previewImages}
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        isEdit={isEdit}
                    />
                </div>
            )}
        </div>
    );
};
