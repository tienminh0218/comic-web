import { ChevronLeftIcon, ViewGridIcon } from "@heroicons/react/solid";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useState, ChangeEvent, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { serverTimestamp, arrayUnion, arrayRemove } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import { mainURL } from "../";
import { ImagePreview, ImageEdit } from "../components";
import { ComicType, ImagesChapter, Chapter, ListChapter } from "models";
import { firestore, storage, listeningDoc } from "firebase/service";
import { COMICS } from "constant/collectionName";
import { schemaChapter } from "../validate";
import { useFetchData } from "hooks";

interface Images extends ImagesChapter {
    file: File;
}

export const UpChapter = () => {
    const [isGrid, setIsGrid] = useState(false);
    const history = useHistory();
    const [isPreview, setIsPreview] = useState(false);
    const [images, setImages] = useState<Images[]>([]);
    const [chapter, setChapter] = useState<Chapter>();
    const [nameChapter, setNameChapter] = useState("");
    const { comicId, chapterId } = useParams<{ comicId: string; chapterId?: string }>();
    const isEdit = Boolean(chapterId);
    const { data: comic } = useFetchData<ComicType>(COMICS, comicId);

    useEffect(() => {
        if (!isEdit) return;

        const unsubscribe = listeningDoc<Chapter>(`${COMICS}/${comicId}/chapters`, chapterId!, (data) => {
            setChapter(data);
            setNameChapter(data.nameChapter);
            setImages(data.images as Images[]);
        });

        return () => unsubscribe();
    }, [isEdit, comicId, chapterId]);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(images);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setImages(items);
    };

    const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 0) return;

        const arr: Images[] = [];
        const lengthArr = e.target.files?.length || 0;
        for (let i = 0; i < lengthArr; i++) {
            arr.push({
                fullPath: "",
                nameFile: `${uuidv4()}.jpg`,
                url: URL.createObjectURL(e.target.files?.item(i)!),
                file: e.target.files?.item(i)!,
            });
        }

        e.target.files = null;
        setImages([...images, ...arr]);
    };

    const deleteImage = async (indexImg: number) => {
        try {
            if (isEdit && images[indexImg].fullPath) {
                await toast.promise(
                    Promise.all([
                        firestore.updateDb(`${COMICS}/${comicId}/chapters`, chapter?.id!, {
                            images: arrayRemove(images[indexImg]),
                        }),
                        storage.deleteFile(images[indexImg].fullPath),
                    ]),
                    {
                        pending: "Loading..",
                        success: "Xóa thành công",
                        error: "Lỗi kìa địt mẹ 🤯",
                    }
                );
            }
        } catch (error) {
            console.log({ error });
            toast.error("Ô NÔ");
        }
    };

    const handleUploadImage = async (file: File, nameFolder: string, nameFile: string) => {
        if (!file) return;
        return {
            ...(await storage.uploadAndGetUrl(file, `${nameFolder}/${nameFile}`)),
            nameFile,
        };
    };

    const updatePosition = async () => {
        try {
            toast.promise(
                firestore.updateDb(`${COMICS}/${comicId}/chapters`, chapter?.id!, {
                    images,
                }),
                {
                    pending: "Đang cập nhật",
                    success: "Cập nhật thành công 👌",
                    error: "Á à lỗi kìa 🤯",
                }
            );
        } catch (error) {
            console.log({ error });
        }
    };

    // check nameChapter isExist
    const compareListChapter = (listChap: ListChapter[], id: string, nameChap: string) => {
        const newArr = listChap.filter((chap) => chap.idChapter !== id);
        const isExist = newArr.findIndex((chap) => chap.name === nameChap);
        if (isExist !== -1) {
            throw new Error("Tên Chap tồn tại");
        }
    };

    const addChapter = async () => {
        const idChapter = uuidv4();

        const imagesData = await Promise.all(
            images.map((image) =>
                handleUploadImage(image.file, `${comic!.nameFolder}/chapters/${idChapter}`, image.nameFile)
            )
        );
        await Promise.all([
            firestore.addDb(
                `${COMICS}/${comicId}/chapters`,
                {
                    nameChapter,
                    images: imagesData,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                },
                idChapter
            ),
            firestore.updateDb(COMICS, comicId, {
                listChapter: [
                    ...comic!.listChapter,
                    { idChapter, name: nameChapter, views: 0, createdAt: new Date().toLocaleDateString("UTC") },
                ],
                updatedAt: serverTimestamp(),
            }),
        ]);
    };

    const updateChapter = async () => {
        const imageRaw = await Promise.all(
            images.map((image) =>
                handleUploadImage(image.file, `${comic!.nameFolder}/chapters/${chapter?.id}`, image.nameFile)
            )
        );
        const imagesData = imageRaw.filter(Boolean);

        await Promise.all([
            firestore.updateDb(`${COMICS}/${comicId}/chapters`, chapter?.id!, {
                nameChapter,
                images: arrayUnion(...imagesData),
                updatedAt: serverTimestamp(),
            }),
            firestore.updateDb(COMICS, comicId, {
                listChapter: [
                    ...comic!.listChapter.map((chap) => {
                        if (chap.idChapter === chapter?.id) return { ...chap, name: nameChapter };
                        return chap;
                    }),
                ],
                updatedAt: serverTimestamp(),
            }),
        ]);
    };

    const onSubmit = async () => {
        try {
            schemaChapter.validateSync({ nameChapter, images }, { abortEarly: false });
            if (isEdit) {
                compareListChapter(comic?.listChapter!, chapter?.id!, nameChapter);
                toast.promise(updateChapter, {
                    pending: "Đang cập nhật",
                    success: "Done 👌",
                    error: "Lỗi kìa địt mẹ 🤯",
                });
            } else {
                compareListChapter(comic?.listChapter!, "", nameChapter);
                await toast.promise(addChapter, {
                    pending: "Đang thêm",
                    success: "Done 👌",
                    error: "Lỗi kìa địt mẹ 🤯",
                });

                history.push(`/${mainURL}/${comicId}/detail`);
            }
        } catch (error) {
            console.log({ error });
            toast.error("Ô NÔ");
        }
    };

    return (
        <>
            <div className="group transition-all duration-150 inline-block">
                <Link
                    className="group-hover:text-indigo-400 flex items-center h-5 text-gray-500"
                    to={`/${mainURL}/${comicId}/detail`}
                >
                    <ChevronLeftIcon className="w-5" /> <span>Back</span>
                </Link>
            </div>
            <div className="mt-6 sticky">
                <div>
                    <span className="font-normal text-xl ml-2">Tên chapter</span>
                    <div className="relative z-10 mt-2">
                        <input
                            value={nameChapter}
                            onChange={(e) => setNameChapter(e.target.value)}
                            type="text"
                            className="transition-all w-full duration-700 border border-gray-300 rounded-md pl-11 py-2 outline-none"
                            placeholder="Tên ít hơn 60 kí tự"
                        />
                        <span className="text-gray-400 absolute w-6 top-2 left-2 text-center">
                            {isEdit
                                ? comic?.listChapter.findIndex((chap) => chap.name === nameChapter)! + 1 || 1
                                : (comic?.listChapter.length || 0) + 1}
                        </span>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3 ">
                        <input
                            type="file"
                            onChange={uploadImage}
                            multiple
                            className="hidden"
                            name="images"
                            id="images"
                        />
                        <label
                            className="btn cursor-pointer text-white bg-green-500 hover:bg-green-600 active:bg-green-500"
                            htmlFor="images"
                        >
                            Chọn ảnh
                        </label>
                        <button
                            onClick={() => setIsGrid(!isGrid)}
                            className={`${
                                isGrid ? "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-500"
                            } transition-all duration-150 px-4 py-2 rounded-xl shadow-lg`}
                        >
                            <ViewGridIcon className="w-6 text-white" />
                        </button>
                        <button
                            onClick={() => setIsPreview(!isPreview)}
                            className={`${
                                isPreview ? "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-500"
                            } transition-all duration-150 px-4 py-2 rounded-xl shadow-lg`}
                        >
                            {isPreview ? (
                                <EyeIcon className="w-6 text-white" />
                            ) : (
                                <EyeOffIcon className="w-6 text-white" />
                            )}
                        </button>
                        <button
                            onClick={onSubmit}
                            className={`${
                                isEdit
                                    ? "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500"
                                    : "bg-green-500 hover:bg-green-600 active:bg-green-500 "
                            } btn text-white `}
                        >
                            {isEdit ? "Cập nhật" : "Thêm"}
                        </button>

                        {isEdit && (
                            <button
                                onClick={updatePosition}
                                className="btn text-white bg-green-500 hover:bg-green-600 active:bg-green-500"
                            >
                                Lưu thay đổi
                            </button>
                        )}
                    </div>
                </div>
                <div className="relative mt-4 p-10 min-h-images overflow-hidden flex justify-center border border-gray-300 rounded-md bg-gray-100">
                    <div className="absolute top-0 left-0 w-8 h-8 text-white bg-black flex justify-center items-center select-none">
                        {images.length || 0}
                    </div>
                    {isPreview ? (
                        <ImagePreview images={images} isGrid={isGrid} />
                    ) : (
                        <ImageEdit deleteImage={deleteImage} handleOnDragEnd={handleOnDragEnd} images={images} />
                    )}
                </div>
            </div>
        </>
    );
};
