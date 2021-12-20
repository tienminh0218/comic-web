import { PencilIcon, WifiIcon, ClockIcon, TagIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

import { ComicType, GenreSelectorState } from "models";
import { mainURL } from "../";

interface Props {
    comic: ComicType;
    listGenre: GenreSelectorState[];
    getGenre: (slug: string, listGenre: GenreSelectorState[]) => string;
    openModal: () => void;
    handleRecommened: () => void;
    comicId: string;
}

export const DetailComic = ({ comic, listGenre, getGenre, openModal, comicId, handleRecommened }: Props) => {
    return (
        <div className="sm:h-208 lg:h-208">
            <div
                style={{
                    backgroundImage: `url(${comic.images?.thumbnail.url})`,
                }}
                className="h-60 w-full bg-no-repeat bg-cover-image bg-cover overflow-hidden rounded-lg"
            >
                <div className="cover-imageComic w-full h-full"></div>
            </div>
            <div className="relative bottom-36 sm:bottom-44">
                <div className="flex">
                    <div className="w-32 mx-auto lg:mx-4 sm:w-36 md:w-40 lg:w-64 2xl:w-48 rounded-md overflow-hidden shadow-lg">
                        <img src={comic.images?.thumbnail.url} alt="coverImage" className="object-cover w-full" />
                    </div>
                    <div className="hidden relative lg:block text-white pt-4">
                        <strong className="text-3xl">{comic.name.vnName}</strong>
                        <p className="text-gray-300">{comic.name.orgName}</p>
                    </div>
                </div>

                <div className="mt-4 space-y-1">
                    <strong className="text-2xl md:text-3xl lg:hidden">{comic.name.vnName}</strong>
                    <p className="lg:hidden text-gray-700 text-sm pb-4">{comic.name.orgName}</p>
                    <p className="flex items-center gap-1">
                        <PencilIcon className="w-5" /> <strong>Tác giả:</strong> {comic.author}
                    </p>
                    <p className="flex items-center gap-1">
                        <WifiIcon className="w-5" /> <strong>Tình trạng:</strong> {comic.status}
                    </p>
                    <p className="flex items-center gap-1">
                        <ClockIcon className="w-5" /> <strong>Ngày đăng:</strong>{" "}
                        {comic.createdAt?.toDate().toLocaleString("UTC")}
                    </p>
                    <p className="flex items-center gap-1">
                        <ClockIcon className="w-5" /> <strong>Ngày cập nhật:</strong>{" "}
                        {comic.updatedAt?.toDate().toLocaleString("UTC")}
                    </p>
                    <div className="flex flex-wrap items-center gap-1">
                        <TagIcon className="w-5" /> <strong>Thể loại:</strong>
                        {comic.genres.map((item, index) => (
                            <div
                                key={`${comic.id}_${index}`}
                                className="bg-gray-300 px-2 py-1 rounded-full text-sm font-light cursor-pointer hover:bg-black hover:text-white transition-all duration-100"
                            >
                                {getGenre(item, listGenre)}
                            </div>
                        ))}
                    </div>
                    <p>
                        <strong>Mô tả: </strong> {comic.describe}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-4">
                        <Link to={`/${mainURL}`}>
                            <button className="btn text-white bg-gray-500 hover:bg-gray-600 active:bg-gray-500">
                                Back
                            </button>
                        </Link>
                        <button
                            onClick={openModal}
                            className="btn text-white bg-red-500 hover:bg-red-600 active:bg-red-500"
                        >
                            Xóa
                        </button>
                        <Link to={`/${mainURL}/${comicId}/edit`}>
                            <button className="btn text-white bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500">
                                Cập nhật
                            </button>
                        </Link>
                        <Link to={`/${mainURL}/${comicId}/addChapter`}>
                            <button className="btn text-white bg-green-500 hover:bg-green-600 active:bg-green-500">
                                Thêm chap
                            </button>
                        </Link>
                        <button
                            onClick={handleRecommened}
                            className={`${
                                comic.recommended && "pointer-events-none opacity-60"
                            } btn text-white bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-500`}
                        >
                            Recommend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
