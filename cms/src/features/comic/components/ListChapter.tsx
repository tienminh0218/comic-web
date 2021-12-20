import { Link } from "react-router-dom";

import { ListChapter as ListChapterType } from "models";
interface Props {
    listChapter?: ListChapterType[];
    handleDeleteChap: (chapter: ListChapterType) => void;
    comicId?: string;
}

export const ListChapter = ({ listChapter, comicId, handleDeleteChap }: Props) => {
    return (
        <div className="w-full max-w-lg lg:max-w-sm xl:max-w-lg 2xl:max-w-lg 3xl:max-w-2xl shadow-base overflow-y-auto h-108 border border-gray-200 rounded-2xl pt-4 scroll-custom">
            {listChapter && listChapter.length !== 0 ? (
                listChapter.map((item, index) => (
                    <div
                        key={item.idChapter}
                        className="flex justify-between pr-4 py-2 border-b border-gray-200 text-sm font-normal text-gray-500"
                    >
                        <Link to={`/comics/${comicId}/${item.idChapter}`}>
                            <span className="hover:text-indigo-600 cursor-pointer ml-4">
                                {isNaN(+item.name) ? item.name : `Chương ${item.name}`}
                            </span>{" "}
                        </Link>
                        <div>
                            <span className="mr-4">{item.createdAt}</span>
                            <span onClick={() => handleDeleteChap(item)} className="text-red-500 cursor-pointer">
                                X
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center pr-4 py-2 border-b border-gray-200 text-sm font-normal text-gray-500">
                    <span className="hover:text-indigo-500 cursor-pointer ml-4 font-semibold">
                        Chưa có chap nào
                    </span>
                </div>
            )}
        </div>
    );
};
