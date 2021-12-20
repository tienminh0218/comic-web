import { FaCrown } from "react-icons/fa";
import Link from "next/link";

import { ComicType } from "@/models/comic";

export const colorRating = (index: number): string => {
    switch (index + 1) {
        case 1:
            return "bg-gradient-to-r from-[#ffd749] to-[#FF7A00]";
        case 2:
            return "bg-gradient-to-r from-[#8fffe4] to-[#1D5CFF]";
        case 3:
            return "bg-gradient-to-r from-[#a1ff89] to-[#00BE7A]";

        default:
            return "bg-[#F4F4F4] dark:bg-[#1A1A1A]";
    }
};

interface Props {
    comics: ComicType[];
    className?: string;
    title?: string;
}

export const PopularHomePage = ({ comics, title, className }: Props) => {
    return (
        <div className={className}>
            {title && <h3 className="text-4xl font-bold dark:text-white mb-8">{title}</h3>}
            <div className="grid lg:grid-cols-2 lg:grid-rows-3 lg:grid-flow-col gap-6">
                {comics.map((comic, index) => (
                    <Link key={comic.id} href={`/title/${comic.id}`}>
                        <a>
                            <div
                                style={{
                                    backgroundImage: `url(${comic.images?.thumbnail.url})`,
                                    backgroundPosition: "center 16%",
                                    backgroundSize: "cover",
                                }}
                                className={`group cursor-pointer h-24 w-full relative overflow-hidden rounded-lg px-6 flex justify-between items-center`}
                            >
                                <div
                                    className={`${colorRating(
                                        index
                                    )} group-hover:opacity-75 absolute inset-0 opacity-75 xl:opacity-90 transition-opacity duration-500`}
                                ></div>
                                <div
                                    className={`${
                                        index + 1 <= 3 ? "text-black" : "text-color-default"
                                    } w-full relative z-1 flex text-lg font-bold `}
                                >
                                    <p>{index + 1}</p>
                                    <p className="ml-6 flex-1">{comic.name.vnName}</p>
                                    {index < 3 && <FaCrown className="text-yellow-300 w-10 z-1 item" />}
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
};
