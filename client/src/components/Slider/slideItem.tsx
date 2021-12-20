import Link from "next/link";

import Genres from "@/components/Genres";
import { ComicType } from "@/models/comic";

interface Props {
    comic: ComicType;
    color: string;
}

export const SlideItem = ({ comic, color }: Props) => {
    return (
        <div className="w-full h-full relative">
            <div className="h-max w-full md:max-w-2xl my-auto py-28 px-6 md:ml-16 2xl:ml-80">
                <p className="text-base xs:text-2xl font-semibold text-[#989898]">Recommended</p>
                <Link href={`/title/${comic.id}`}>
                    <a>
                        <h3 className={`${color} text-3xl xs:text-5xl font-bold cursor-pointer`}>
                            {comic.name.vnName}
                        </h3>
                    </a>
                </Link>
                <div className="hidden md:block mt-5">
                    <Genres genres={comic.genres} />
                </div>
                <p className="desc mt-6 dark:text-white font-normal text-lg">{comic.describe}</p>
                <Link href={`/title/${comic.id}`}>
                    <a>
                        <button className="hover:opacity-80 dark:text-black dark:bg-white mt-8 px-6 py-2 font-semibold text-white bg-black rounded-full text-base transition-all duration-500 cursor-pointer">
                            Check it out
                        </button>
                    </a>
                </Link>
            </div>
            <div className="absolute inset-y-0 w-full sm:right-0 2xl:right-16 sm:max-w-max 2xl-slide:max-w-[40%] -z-1">
                <div className=" absolute inset-0 bg-gradient-to-t from-[#f5f3f2] dark:from-[#1a1a1a] xl:hidden"></div>
                <img
                    className="w-full h-full object-cover object-top sm:object-contain 2xl-slide:object-cover 2xl-slide:object-center-top"
                    src={comic.images?.banner.url || "/01.jpg"}
                    alt={comic.name.vnName}
                />
            </div>
        </div>
    );
};
