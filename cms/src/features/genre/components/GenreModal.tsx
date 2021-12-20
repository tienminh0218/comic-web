import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AddGenreType } from "models";
import { InputField } from "components/FormFields";
import { firestore } from "firebase/service";
import { GenreType } from "models";
import { GENRES } from "constant/collectionName";
import { schemaGenre } from "../validate";
import { generateSlug } from "utils";

interface Props {
    closeModal: () => void;
    isOpen: boolean;
    isEditing: boolean;
    updateData?: GenreType;
}

const defaultValues = {
    name: "",
    describe: "",
    slug: "",
};

export const GenreModal = ({ isOpen, closeModal, isEditing, updateData }: Props) => {
    const { handleSubmit, control, reset } = useForm<GenreType>({
        defaultValues: defaultValues,
        resolver: yupResolver(schemaGenre),
    });

    const onSubmit = async (data: AddGenreType) => {
        try {
            const slug = generateSlug(data.name);
            if (isEditing) {
                firestore.updateDb(GENRES, updateData?.id!, { ...data, slug });
            } else {
                firestore.addDb(GENRES, { ...data, slug });
                reset(defaultValues);
            }
        } catch (error) {
            console.log({ error });
        }
    };

    const closeAndReset = () => {
        closeModal();
        reset(defaultValues);
    };

    useEffect(() => {
        if (isEditing) {
            reset(updateData);
        } else {
            reset(defaultValues);
        }
    }, [isEditing, updateData, reset]);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeAndReset}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-modal" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    {isEditing ? "Cập nhật thể loại" : "Thêm thể loại"}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <InputField name="name" label="Tên thể loại" control={control} />
                                        <InputField name="describe" label="Mô tả" control={control} multiline />
                                        <button
                                            className={`${
                                                isEditing
                                                    ? "bg-indigo-500 active:bg-indigo-500 hover:bg-indigo-600"
                                                    : "bg-[#00ab55] active:bg-[#00ab55] hover:bg-green-600"
                                            } select-none transition-all duration-200 text-white px-4 py-2 mt-3 rounded-xl font-semibold`}
                                            type="submit"
                                        >
                                            {isEditing ? "Cập nhật" : "Thêm"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
