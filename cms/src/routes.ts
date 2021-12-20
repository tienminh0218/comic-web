import Comic from "features/comic";
import Genre from "features/genre";
import Home from "features/home";
import { NotFound } from "components/Common";
import { Routes } from "models";

import { BookOpenIcon, ChartPieIcon, DotsHorizontalIcon, TagIcon } from "@heroicons/react/solid";

export const routes: Routes[] = [
    {
        name: "Trang Chủ",
        path: "/",
        exact: true,
        onSidebar: true,
        icon: ChartPieIcon,
        component: Home,
    },
    {
        name: "Truyện",
        path: "/comics",
        onSidebar: true,
        icon: BookOpenIcon,
        component: Comic,
    },
    {
        name: "Thể Loại",
        path: "/genres",
        onSidebar: true,
        icon: TagIcon,
        component: Genre,
    },
    {
        name: "notfound",
        path: "",
        icon: DotsHorizontalIcon,
        component: NotFound,
    },
];
