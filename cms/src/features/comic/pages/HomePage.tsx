import { ChevronDownIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { where } from "firebase/firestore";

import { classNames } from "utils";
import { CardItem, SkeletonCard } from "../components";
import { ComicType } from "models";
import { COMICS } from "constant/collectionName";
import { useFetchData } from "hooks";

interface Props {
    mathUrl: string;
}

export const HomePage = ({ mathUrl }: Props) => {
    const { data: comics } = useFetchData<ComicType[]>(COMICS, undefined, where("deleted", "==", false));

    return (
        <div>
            <div className="flex justify-between items-center pt-7">
                <h3 className="title">Danh sách</h3>
                <Link to={`${mathUrl}/add`}>
                    <button className="bg-[#00ab55] shadow-green select-none active:bg-[#00ab55] hover:bg-green-600 transition-all duration-200 text-white px-2 py-2 rounded-xl font-semibold space-x-1 flex items-center">
                        <PlusIcon className="w-4" /> <span>Thêm truyện</span>
                    </button>
                </Link>
            </div>
            <div className="flex justify-between mt-10">
                <div className="relative z-10 w-52">
                    <input
                        type="text"
                        className="transition-all w-full duration-700 border border-gray-300 rounded-md pl-11 py-2 outline-none"
                        placeholder="Tìm truyện...."
                    />
                    <SearchIcon className="text-gray-300 absolute w-6 top-2 left-2" />
                </div>
                <Menu as="div" className="relative z-10 inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                            Lọc
                            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <span
                                            className={classNames(
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                "block cursor-pointer px-4 py-2 text-sm"
                                            )}
                                        >
                                            Mới nhất
                                        </span>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <span
                                            className={classNames(
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                "block cursor-pointer px-4 py-2 text-sm"
                                            )}
                                        >
                                            Phổ biến
                                        </span>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <span
                                            className={classNames(
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                "block cursor-pointer px-4 py-2 text-sm"
                                            )}
                                        >
                                            Lượt xem
                                        </span>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <div className="mt-8 space-y-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl: 2xl:grid-cols-4 sm:space-y-0 sm:gap-5 ">
                {comics ? (
                    comics.map((comic) => <CardItem key={comic.id} {...comic} />)
                ) : (
                    <SkeletonCard numberItem={4} />
                )}
            </div>
        </div>
    );
};
