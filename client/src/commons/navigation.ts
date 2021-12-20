import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { RiHistoryLine } from "react-icons/ri";
import { BsBookmarkCheck } from "react-icons/bs";

import { NavigationType } from "@/models/index";
import { MdOutlineCategory } from "react-icons/md";

export const navigations: NavigationType[] = [
    {
        name: "Trang chủ",
        path: "/",
        icon: AiOutlineHome,
        isOnNav: true,
        isOnHeader: true,
    },

    {
        name: "Theo dõi",
        path: "/bookmark",
        icon: BsBookmarkCheck,
        isOnNavMenu: true,
        isOnDrop: true,
    },
    {
        name: "Lịch sử",
        path: "/history",
        icon: RiHistoryLine,
        isOnNavMenu: true,
        isOnDrop: true,
    },
    {
        name: "Khám phá",
        path: "/discover",
        icon: MdOutlineCategory,
        isOnHeader: true,
        isOnNav: true,
    },
    {
        name: "Cá nhân",
        path: "/profile",
        icon: AiOutlineUser,
        isOnDrop: true,
        isOnNavMenu: true,
    },
    {
        name: "Top",
        path: "/top",
        isOnHeader: true,
    },
];
