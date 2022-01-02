import { AiOutlineHome, AiOutlineHeart, AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { BsBackspace } from "react-icons/bs";
import { MdOutlineLightMode } from "react-icons/md";
import { RiMoonLine } from "react-icons/ri";
import { HideScroll } from "react-hide-on-scroll";
import Link from "next/link";
import { toast } from "react-toastify";

import { useTheme } from "@/hook/index";
import { ComicType } from "@/models/comic";

export interface NextAndPrevChap {
    nextId?: string;
    prevId?: string;
}

interface Props {
    className?: string;
    comic: ComicType;
    idCurrentChapter: string;
    nextAndPrev: NextAndPrevChap;
    titleId: string;

    onChangeChap: (url: string) => void;
}

export const NavReading = ({ className, comic, idCurrentChapter, nextAndPrev, onChangeChap, titleId }: Props) => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <HideScroll variant="down">
            <div
                className={`${className} fixed z-50 bottom-0 inset-x-0 h-14  bp-filter transition-default select-none`}
            >
                <div className="bg-[#ffffffb8] dark:bg-[#000000c2] w-full h-full flex justify-between items-center py-1.5 px-6">
                    <div className="flex-center gap-3 sm:gap-5 xl:hidden">
                        <BsBackspace className="w-6 h-6 sm:w-7 sm:h-7 color-icon-default cursor-pointer" />
                        <AiOutlineHome className="w-6 h-6 sm:w-7 sm:h-7 color-icon-default cursor-pointer" />
                    </div>
                    <div className="gap-2 hidden xl:flex xl:w-[450px] items-center">
                        <Link href="/">
                            <a>
                                <svg
                                    className="cursor-pointer w-6 color-icon-default transition-all duration-200 mr-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 80 74"
                                >
                                    <g clipPath="url(#clip0)">
                                        <path d="M57.192 36.691c-1.344.232-2.616.55-3.785.906-.658.2-3.258.995-6.567 2.69 0 0-.95.486-1.872 1.017-6.905 3.975-12.915 11.81-19.835 11.958-4.732.101-7.836-2.119-7.836-2.119a10.56 10.56 0 01-1.994-1.852c.148.11 2.58 1.846 5.304 2.485 4.009.94 9.695-2.557 11.425-3.643 2.08-1.305 1.59-1.312 5.774-4.195a123.864 123.864 0 015.546-3.596c.782-.479 1.446-.863 1.626-.966 1.398-.804 4.684-2.243 12.214-2.685zm-25.787-25.78s-1.76 1.825-3.386 2.152c-1.538.309-3.808-.628-3.808-.628s1.446-1.959 3.041-2.357c1.81-.45 4.153.832 4.153.832zm-8.189 8.294c.183-1.603 1.306-2.928 2.802-3.331 2.467-.66 4.267 1.638 4.236 1.692-.03.054-1.934-1.724-3.941-1.302-1.499.315-2.486 1.737-3.097 2.941zm.079.495c.545-1.52 1.938-2.556 3.484-2.607 2.55-.085 3.786 2.563 3.744 2.607-.041.045-1.496-2.115-3.544-2.159-1.531-.035-2.815 1.128-3.684 2.159zm0 .445c.986-1.277 2.631-1.832 4.118-1.401 2.45.708 2.808 3.608 2.755 3.64-.064 0-.777-2.48-2.704-3.154-1.446-.505-3.024.204-4.17.915zM10.047 71.304c5.176 3.064 10.547 2.765 13.451 2.604 2.8-.156 5.057-.674 10.272-2.54.511-.186 1.053-.382 1.626-.593l.167-.062a285.915 285.915 0 004.271-1.613c2.057-.797 3.86-1.524 5.46-2.18 1.015-.416 1.95-.803 2.817-1.16 4.013-1.661 6.589-2.705 9.094-3.112 1.29-.207 2.558-.248 3.994-.117.824.072 1.797.212 2.904.481.108.026.22.055.33.083.466.124.957.268 1.467.442 1.63.552 3.463 1.384 5.444 2.645 1.389-.74 3.776-2.255 5.706-5.03.53-.761 4.236-6.265 2.482-12.807-.61-2.282-1.733-4.13-3.02-5.6-1.174-1.344-2.483-2.377-3.652-3.145 0-.003-.004-.003-.004-.003a20.758 20.758 0 00-3.242-1.73c-2.056-.892-4.157-1.353-6.209-1.509a61.278 61.278 0 00-.83-2.566 56.212 56.212 0 00-4.442-9.66c-.89-1.536-4.837-8.157-12.364-14.765A63.239 63.239 0 0031.66 0s-.678 3.168 0 5.515a20.39 20.39 0 00-3.925.756c-1.607.48-2.456.744-3.287 1.55-.501.482-1.306 1.267-1.468 2.419-.095.71.07 1.414-.393 2.306-.073.14-.187.356-.4.59-.561.636-1.175.7-1.86 1.035 0 0-.92.452-1.545 1.27-1.267 1.655.298 5.469 2.495 7.66.77.768 2.258 2.251 3.935 2.172.336-.016.922-.108 1.795-.006.573.069 1.31.155 1.88.495.05.03.1.062.149.097 1.27.887 1.879 3.16 1.04 4.783-.6 1.16-1.745 1.614-2.379 1.865a4.991 4.991 0 01-1.673.355c-.717.038-1.553-.024-2.765-.076-1.426-.064-2.853-.02-4.28-.08-3.469-.149-8.226 1.753-11.625 4.525C.726 42.642.11 50.696.037 51.918c-.475 7.875 3.618 15.601 10.01 19.386"></path>
                                    </g>
                                </svg>
                            </a>
                        </Link>
                        <Link href={`/title/${titleId}`}>
                            <a>
                                <p className="dark:text-[#cacaca] truncate">{comic.name.vnName}</p>
                            </a>
                        </Link>
                    </div>
                    <div className="h-full flex-1 flex-center transform xl:-translate-x-40">
                        <div className={`${!nextAndPrev.prevId && "opacity-50 pointer-events-none"}`}>
                            <Link
                                href={{
                                    pathname: "/title/[titleId]/view/[chapter]",
                                    query: {
                                        titleId,
                                        chapter: nextAndPrev.prevId,
                                    },
                                }}
                            >
                                <a>
                                    <AiFillCaretLeft className="text-5xl dark:fill-[#e4e6eb]  cursor-pointer" />
                                </a>
                            </Link>
                        </div>
                        <select
                            onChange={(e) => onChangeChap(e.target.value)}
                            value={idCurrentChapter}
                            className="h-4/5 bg-black dark:bg-[#e4e6eb] text-color-default-reverse w-1/2 md:w-1/3 pl-2 outline-none rounded-md"
                        >
                            {comic.listChapter.map((chapter) => {
                                return (
                                    <option key={chapter.idChapter} value={chapter.idChapter}>
                                        {chapter.name}
                                    </option>
                                );
                            })}
                        </select>
                        <div className={`${!nextAndPrev.nextId && "opacity-50 pointer-events-none"}`}>
                            <Link
                                href={{
                                    pathname: "/title/[titleId]/view/[chapter]",
                                    query: {
                                        titleId,
                                        chapter: nextAndPrev.nextId,
                                    },
                                }}
                            >
                                <a>
                                    <AiFillCaretRight className={`text-5xl dark:fill-[#e4e6eb] cursor-pointer`} />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-center gap-3 sm:gap-5">
                        <AiOutlineHeart
                            onClick={() => toast.info("This feature still pending")}
                            className="w-6 h-6 sm:w-7 sm:h-7 color-icon-default cursor-pointer"
                        />
                        <div onClick={toggleTheme}>
                            {isDarkMode ? (
                                <RiMoonLine className="w-6 h-6 sm:w-7 sm:h-7 color-icon-default cursor-pointer" />
                            ) : (
                                <MdOutlineLightMode className="w-6 h-6 sm:w-7 sm:h-7 color-icon-default cursor-pointer" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </HideScroll>
    );
};
