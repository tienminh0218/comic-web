import Link from "next/link";
import { useRecoilValue } from "recoil";

import { getGenres } from "@/utils/getGenres";
import { genresState } from "@/app/atoms";

interface Props {
    genres: string[];
}

const Genres = ({ genres }: Props) => {
    const listGenres = useRecoilValue(genresState);

    return (
        <div className=" flex flex-wrap text-xs">
            {genres &&
                listGenres &&
                getGenres(listGenres, genres).map((genre) => (
                    <Link href={`/discover/filter?genres=${genre.slug}`} key={genre.id}>
                        <p className="hover:bg-[#333333] hover:text-white dark:hover:bg-[#E7E7E7] dark:hover:text-black bg-[#E7E7E7] dark:bg-[#333333] cursor-pointer shadow-sm font-medium capitalize text-black py-1 rounded-full transition-all dark:text-[#F4F4F4] px-5 mr-2 mb-2">
                            {genre.name}
                        </p>
                    </Link>
                ))}
        </div>
    );
};

export default Genres;
