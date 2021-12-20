import { Menu, Transition } from "@headlessui/react";
import { AiOutlineUser } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { Fragment } from "react";
import Link from "next/link";

import { navigations } from "@/commons/index";
import { Icon } from "@/components/Common";

interface Props {
    onSignOut: () => void;
}

export const UserMenu = ({ onSignOut }: Props) => {
    return (
        <Menu as="div" className="relative">
            <div>
                <Menu.Button className="text-xs flex flex-col items-center gap-1">
                    <Icon icon={AiOutlineUser} />
                    <p>Thông tin</p>
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
                <Menu.Items className="absolute bottom-[130%] right-0 w-max px-2 origin-top-right bg-[#f4f4f4] dark:bg-[#1a1a1a] divide-y divide-[#333] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {navigations
                        .filter((item) => item.isOnNavMenu)
                        .map((item) => (
                            <Menu.Item key={item.path}>
                                {({ active }) => (
                                    <Link href={item.path}>
                                        <button
                                            className={`text-center space-x-2 w-full flex items-center p-3 text-xs`}
                                        >
                                            <Icon icon={item.icon!} />
                                            <span className="text-color-default">{item.name}</span>
                                        </button>
                                    </Link>
                                )}
                            </Menu.Item>
                        ))}

                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={onSignOut}
                                className={`text-center space-x-2 w-full flex items-center p-3 text-xs`}
                            >
                                <Icon icon={MdLogout} />
                                <span className="text-color-default">Đăng xuất</span>
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
