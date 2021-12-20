import moment from "moment/";
import Link from "next/link";

import { HistoryViewed } from "@/models/user";
import { fromNowDate } from "@/utils/index";

interface Props {
    comic: HistoryViewed;
}

export const CardHistory = ({ comic }: Props) => {
    return (
        <div className="cursor-pointer">
            <div className={`relative pt-150 group z-1`}>
                <img
                    src={`${comic.imageURL}`}
                    className="absolute top-2 scale-105 w-full h-full rounded-xl opacity-0 object-cover group-hover:opacity-60 group-hover:blur-xl transition-all duration-300"
                    alt=""
                />
                <img
                    src={`${comic.imageURL}`}
                    className={`absolute w-full h-full object-cover rounded-xl top-0`}
                    alt=""
                />
            </div>
            <div>
                <h3 className="truncate font-bold mt-3 text-lg dark:text-white">{comic.nameComic}</h3>
                <div className="mt-2 text-sm text-[#6D6D6D] flex justify-between">
                    <Link href={`/title/${comic.idComic}/view/${comic.idChapter}`}>
                        <a className="sub-color-hover">
                            <span>Chap {comic.nameChapter}</span>
                        </a>
                    </Link>
                    <span>{fromNowDate(comic.updatedAt)}</span>
                </div>
            </div>
        </div>
    );
};
