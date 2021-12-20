import Link from "next/link";
import { MdOutlineLightMode } from "react-icons/md";
import { RiUserUnfollowLine, RiMoonLine, RiSearchLine } from "react-icons/ri";

import { navigations } from "@/commons/index";
import { Icon } from "@/components/Common";
import { UserMenu } from "./menu";
import { useAuth, useTheme } from "@/hook/index";

export const NavBottom = () => {
    const { user, signOut } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="z-50 md:hidden bp-filter bg-[#ffffffb8] dark:bg-[#000000c2] text-black dark:text-white fixed inset-x-0 bottom-0 text-xs transition-default">
            <div className="flex justify-evenly items-center h-14">
                <div onClick={toggleTheme} className="flex flex-col items-center gap-1 cursor-pointer">
                    {isDarkMode ? (
                        <>
                            <Icon icon={RiMoonLine} />
                            <p>Dark mode</p>
                        </>
                    ) : (
                        <>
                            <Icon icon={MdOutlineLightMode} />
                            <p>Light mode</p>
                        </>
                    )}
                </div>
                <Link href={"item.path"}>
                    <div
                        className={`${
                            false && " text-blue-500 dark:text-pink-500 font-bold"
                        } flex flex-col items-center gap-1 cursor-pointer`}
                    >
                        <Icon icon={RiSearchLine} />
                        <p>Tìm kiếm</p>
                    </div>
                </Link>
                {navigations
                    .filter((nav) => nav.isOnNav)
                    .map((item, index) => {
                        return (
                            <Link href={item.path} key={item.name}>
                                <div
                                    className={`${
                                        index === 1 && " text-blue-500 dark:text-pink-500 font-bold"
                                    } flex flex-col items-center gap-1 cursor-pointer`}
                                >
                                    <Icon icon={item.icon!} />
                                    <p>{item.name}</p>
                                </div>
                            </Link>
                        );
                    })}
                {user ? (
                    <UserMenu onSignOut={signOut} />
                ) : (
                    <Link href="/auth">
                        <div className="flex flex-col items-center gap-1 cursor-pointer">
                            <Icon icon={RiUserUnfollowLine} />
                            <p>Đăng nhập</p>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};
