import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { arrayRemove } from "firebase/firestore";
import { toast } from "react-toastify";

import { SkeletonDetail, Interacts, ListChapter, DetailComic } from "../components";
import { COMICS } from "constant/collectionName";
import { firestore, storage } from "firebase/service";
import { Chapter, ComicType, GenreSelectorState, ListChapter as ListChapterType } from "models";
import Modal from "components/Modal";
import { useFetchData } from "hooks";
import { mainURL } from "../";
import { listGenreState } from "app/selectors";

export const Detail = () => {
    const { comicId } = useParams<{ comicId: string }>();
    const { data: comic, setData: setComic } = useFetchData<ComicType>(COMICS, comicId);
    let [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const listGenre = useRecoilValue(listGenreState);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const deleteDoc = async () => {
        await firestore.updateDb(COMICS, comicId, { deleted: true });
        closeModal();
        history.push(`/${mainURL}`);
    };

    const getGenre = (slug: string, listGenre: GenreSelectorState[]): string => {
        return listGenre.find((genre) => genre.slug === slug)?.name!;
    };

    const recommend = () => {
        try {
            toast.promise(
                firestore.updateDb(COMICS, comicId, {
                    recommended: true,
                }),
                {
                    pending: "Đang cập nhật",
                    success: "Cập nhật thành công 🐧 ",
                    error: "Recommend -> Lỗi gì kìa ku 🌚 ",
                }
            );
        } catch (error) {
            console.log({ error });
        }
    };

    const handleDeleteChap = async (chapter: ListChapterType) => {
        const { images } = await firestore.getDocDb<Chapter>(`comics/${comicId}/chapters`, chapter.idChapter);

        await toast.promise(
            Promise.all([
                images.map((image) => storage.deleteFile(image?.fullPath)),
                firestore.deleteDb(`comics/${comicId}/chapters`, chapter.idChapter),
                firestore.updateDb(COMICS, comicId, {
                    listChapter: arrayRemove(chapter),
                }),
            ]),
            {
                pending: "Đang xóa 😴",
                success: "Xóa thành công 🐧 ",
                error: "Lỗi gì kìa ku 🌚 ",
            }
        );
        comic &&
            setComic({
                ...comic,
                listChapter: comic?.listChapter.filter((chap) => chap.idChapter !== chapter.idChapter),
            });
    };

    return (
        <div>
            <Modal callback={deleteDoc} isOpen={isOpen} closeModal={closeModal} />
            {comic ? (
                <DetailComic
                    comic={comic}
                    comicId={comicId}
                    openModal={openModal}
                    getGenre={getGenre}
                    handleRecommened={recommend}
                    listGenre={listGenre}
                />
            ) : (
                <SkeletonDetail />
            )}

            <div className="flex flex-wrap justify-around gap-8 2xl:gap-4">
                {comic && (
                    <>
                        <ListChapter
                            handleDeleteChap={handleDeleteChap}
                            comicId={comic.id}
                            listChapter={comic.listChapter}
                        />
                        <Interacts {...comic.interacts!} />
                    </>
                )}
            </div>
        </div>
    );
};
