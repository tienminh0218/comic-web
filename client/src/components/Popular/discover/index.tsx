import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

import { ComicType } from "@/models/comic";
import { Item } from "./item";

interface Props {
    comics: ComicType[];
    className?: string;
}

export const PopularDiscoverPage = ({ className, comics }: Props) => {
    return (
        <div className={className}>
            <Swiper slidesPerView="auto" spaceBetween={30} className="w-full popular">
                {comics.map((comic, index) => (
                    <SwiperSlide key={index}>
                        <Link href={`title/${comic.id}`}>
                            <a>
                                <Item comic={comic} index={index} />
                            </a>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
