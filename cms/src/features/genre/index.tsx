import { PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import { GenreModal, ItemGenre, SkeletonLoading, ConfirmModal } from "./components";
import { GenreType } from "models";
import { genreState } from "app/atoms";

const HomeGenreComics = () => {
    const listGenre = useRecoilValue(genreState);
    const [isOpen, setIsOpen] = useState(false);
    const [updateData, setUpdateData] = useState<GenreType>();
    const [isEditing, setIsEditing] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState<string>();

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = (isEdit: boolean) => {
        !isEdit && setIsEditing(false);
        setIsOpen(true);
    };

    const openConfirm = (id: string) => {
        setIsConfirm(true);
        setDeleteId(id);
    };

    const closeConfirm = () => {
        setIsConfirm(false);
        setDeleteId(undefined);
    };

    const handleEditing = (data: GenreType) => {
        setUpdateData(data);
        setIsEditing(true);
        openModal(true);
    };

    return (
        <div className="flex flex-col">
            {/* Modal */}
            <GenreModal isEditing={isEditing} updateData={updateData} isOpen={isOpen} closeModal={closeModal} />
            <ConfirmModal isOpen={isConfirm} idGenre={deleteId} closeModal={closeConfirm} />

            {/* Table */}
            <div className="flex justify-between items-center pt-7">
                <h3 className="title">Thể Loại</h3>

                <button
                    onClick={() => openModal(false)}
                    className="bg-[#00ab55] shadow-green select-none active:bg-[#00ab55] hover:bg-green-600 transition-all duration-200 text-white px-2 py-2 rounded-xl font-semibold space-x-1 flex items-center"
                >
                    <PlusIcon className="w-4" /> <span>Thêm</span>
                </button>
            </div>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-10">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        STT
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Tên
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Mô tả
                                    </th>

                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {listGenre.length !== 0 ? (
                                    listGenre.map((genre, index) => (
                                        <ItemGenre
                                            handleDeleting={openConfirm}
                                            handleEditing={handleEditing}
                                            {...genre}
                                            index={index}
                                            key={genre.id}
                                        />
                                    ))
                                ) : (
                                    <SkeletonLoading />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeGenreComics;
