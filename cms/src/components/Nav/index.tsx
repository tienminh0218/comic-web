import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { signOut } from "firebase/auth";
import { LogoutIcon } from "@heroicons/react/solid";

import { auth } from "firebase/config";

interface Props {
    handleActive: (value: boolean) => void;
    emailUser: string;
}

const NavBar = ({ handleActive, emailUser }: Props) => {
    const logout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log("sign out");
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
            });
    };

    return (
        <div>
            <nav className="fixed z-40 inset-x-0 top-0 h-16 xl:h-24 px-5 text-gray-600 nav-bg-color w-full flex justify-between items-center text-2xl">
                <div className="cursor-pointer group" onClick={() => handleActive(true)}>
                    <svg
                        className="xl:hidden bg-white transition-all duration-300 rounded-sm text-3xl text-gray-800"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                    >
                        <g fill="currentColor">
                            <circle cx="4" cy="12" r="1"></circle>
                            <rect x="7" y="11" width="14" height="2" rx=".94" ry=".94"></rect>
                            <rect x="3" y="16" width="18" height="2" rx=".94" ry=".94"></rect>
                            <rect x="3" y="6" width="18" height="2" rx=".94" ry=".94"></rect>
                        </g>
                    </svg>
                </div>
                <div className="">
                    <Menu as="div" className="relative z-10 inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex justify-center w-full py-2 text-sm font-medium text-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <img
                                    className="w-10 h-10 group-hover:opacity-100 object-cover rounded-full"
                                    src="https://minimal-kit-react.vercel.app/static/mock-images/avatars/avatar_default.jpg"
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
                            <Menu.Items className="absolute z-10 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1 ">
                                    <div className="text-gray-500 text-sm px-5 py-2.5 border-b border-gray-300">
                                        <p className="text-xl text-black">Tiến DepTraiBodoi</p>
                                        <p>{emailUser}</p>
                                    </div>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={logout}
                                                className={`${
                                                    active && "bg-[#f6f7f8]"
                                                } group text-center space-x-2 text-gray-900 flex items-center w-full px-2 py-2 text-sm`}
                                            >
                                                <LogoutIcon className="h-5 w-5 ml-3 text-gray-900" />

                                                <span>Đăng xuất</span>
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
