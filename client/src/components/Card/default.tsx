import Link from "next/link";
import { ComicType } from "@/models/comic";
import { fromNowDate } from "@/utils/index";

interface Props {
    isLastUpdate?: boolean;
    comic: ComicType;
}

const convertDate = (dateComic: string): string => {
    const date = new Date(dateComic);
    return date.toUTCString();
};

export const Card = ({ isLastUpdate, comic }: Props) => {
    return (
        <div className="cursor-pointer">
            <Link href={`/title/${comic.id}`}>
                <a>
                    <div className={`${isLastUpdate ? "h-56" : "pt-150 "} relative group z-1`}>
                        <img
                            src={`${comic.images?.thumbnail.url}`}
                            className="absolute top-2 scale-105 w-full h-full rounded-xl opacity-0 object-cover group-hover:opacity-60 group-hover:blur-xl transition-all duration-300"
                            alt=""
                        />
                        <img
                            src={`${comic.images?.thumbnail.url}`}
                            className={`${
                                isLastUpdate && "object-top"
                            } absolute w-full h-full object-cover rounded-xl top-0`}
                            alt=""
                        />
                    </div>
                </a>
            </Link>
            <div>
                <Link href={`/title/${comic.id}`}>
                    <a>
                        <h3 className="truncate font-bold mt-3 text-lg dark:text-white">{comic.name.vnName}</h3>
                    </a>
                </Link>
                <div className="mt-2 text-xs sm:text-sm text-[#6D6D6D] flex justify-between">
                    {comic.listChapter.length > 0 ? (
                        <Link
                            href={`/title/${comic.id}/view/${
                                comic.listChapter[comic.listChapter.length - 1].idChapter
                            }`}
                        >
                            <a className="sub-color-hover">
                                <span>Chap {comic.listChapter[comic.listChapter.length - 1].name}</span>
                            </a>
                        </Link>
                    ) : (
                        "No chap"
                    )}
                    <span>{fromNowDate(comic.updatedAt)}</span>
                </div>
            </div>
        </div>
    );
};
