import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";
import Link from "next/link";

import { useAuth } from "@/hook/index";
import { navigations } from "@/commons/index";
import { Icon } from "@/components/Common";

const DropDown = () => {
    const { user, signOut } = useAuth();

    return (
        <div>
            <div className="">
                <Menu as="div" className="relative z-10 inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex justify-center w-full py-2 text-sm font-medium text-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <img
                                className="w-10 h-10 shadow-avatar group-hover:opacity-100 object-cover rounded-full"
                                src={`https://avatars.dicebear.com/api/adventurer/${user?.email}.svg`}
                                alt=""
                            />
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
                        <Menu.Items className="absolute z-10 right-0 w-56 mt-2 origin-top-right bg-[#f4f4f4] dark:bg-[#1a1a1a] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1 select-none">
                                <div className="cursor-pointer hover:opacity-80 select-none text-gray-500 text-sm px-5 py-2.5 border-b border-gray-300">
                                    <p className="text-xl text-black dark:text-white truncate">{user?.email}</p>
                                </div>

                                {navigations
                                    .filter((item) => item.isOnDrop)
                                    .reverse()
                                    .map((item) => (
                                        <Link key={item.name} href={item.path}>
                                            <a>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active && "opacity-90"
                                                            } space-x-2 text-gray-900 flex items-center w-full p-2 text-sm`}
                                                        >
                                                            <Icon
                                                                icon={item.icon!}
                                                                className="h-5 w-5 text-gray-900 dark:fill-white mx-2"
                                                            />
                                                            <span className="dark:text-white">{item.name}</span>
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </a>
                                        </Link>
                                    ))}

                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={signOut}
                                            className={`${
                                                active && "opacity-90"
                                            } space-x-2 text-gray-900 flex items-center w-full p-2 text-sm`}
                                        >
                                            <MdLogout className="h-5 w-5 ml-3 text-gray-900 dark:fill-white" />
                                            <span className="dark:text-white">Đăng xuất</span>
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
};

export default DropDown;
