import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Props {
    callback: () => void;
    closeModal: () => void;
    isOpen: boolean;
}

const Modal = ({ callback, closeModal, isOpen }: Props) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed right-12 sm:right-32 md:right-1/3 -top-1/4 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
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
                                    Chắc không ku
                                </Dialog.Title>
                                <div className="mt-2 w-80">
                                    <p className="text-sm text-gray-500">
                                        Có không giữ mất đừng tìm, xóa là mất luôn đấy.
                                    </p>
                                </div>

                                <div className="mt-4 space-x-2 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm text-white bg-indigo-600 font-semibold border border-transparent rounded-md active:bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Đóng
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm text-white bg-red-600 font-semibold border border-transparent rounded-md active:bg-red-600 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={callback}
                                    >
                                        Ok luôn
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Modal;
