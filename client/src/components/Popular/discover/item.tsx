import { FaCrown } from "react-icons/fa";

import { ComicType } from "@/models/comic";
import { colorRating } from "@/utils/index";

interface Props {
    comic: ComicType;
    index: number;
}

export const Item = ({ comic, index }: Props) => {
    return (
        <div>
            <div
                style={{
                    backgroundImage: `url(${comic.images?.thumbnail.url || "/thub.jpg"})`,
                    backgroundPosition: "center 16%",
                    backgroundSize: "cover",
                }}
                className={`group cursor-pointer h-36 w-72 sm:h-40 sm:w-80 relative overflow-hidden rounded-lg flex justify-between items-center`}
            >
                <div
                    className={`${colorRating(
                        index
                    )} group-hover:opacity-75 absolute inset-0 opacity-75 xl:opacity-90 transition-opacity duration-500`}
                ></div>
                <div
                    className={`${
                        index < 3 ? "text-black" : "text-black dark:text-white"
                    } absolute px-4 pt-6 pb-3 inset-0 flex flex-col justify-between text-lg font-bold `}
                >
                    <div className="flex justify-between">
                        <p className="text-lg sm:text-2xl">{comic.name.vnName}</p>
                        {index < 3 && <FaCrown className="ml-4 mt-2 text-yellow-300 w-8 z-1" />}
                    </div>
                    {index < 3 && (
                        <p className="text-xs sm:text-sm text-[#1A1A1A] opacity-60 font-semibold">Phổ biến nhất</p>
                    )}
                </div>
            </div>
        </div>
    );
};
