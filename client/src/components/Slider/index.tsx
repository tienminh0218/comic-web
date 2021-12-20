import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { SlideItem } from "./slideItem";
import { ComicType } from "@/models/comic";

const textColorRating = (index: number) => {
    switch (index + 1) {
        case 1:
            return "text-[#4DAAAF]";
        case 2:
            return "text-[#CD342F]";
        case 3:
            return "text-[#CE5754]";
        case 4:
            return "text-[#9D7F70]";
        case 5:
            return "text-[#546FB8]";
        default:
            return "text-black dark:text-white";
    }
};

interface Props {
    comics: ComicType[];
}

const Slider = ({ comics }: Props) => {
    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay
            pagination={{ clickable: true }}
            className="bg-[#f5f3f2] dark:bg-[#1a1a1a] sm:p-10 swiper-custom transition-all duration-500"
        >
            {comics &&
                comics.map((comic, index) => (
                    <SwiperSlide key={comic.id}>
                        <SlideItem color={textColorRating(index)} comic={comic} />
                    </SwiperSlide>
                ))}
        </Swiper>
    );
};

export default Slider;
