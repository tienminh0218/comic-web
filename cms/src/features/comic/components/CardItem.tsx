import { ChatIcon, HeartIcon } from "@heroicons/react/solid";
import { Link, useRouteMatch } from "react-router-dom";

import { ComicType } from "models";

export const CardItem = ({ id, images, name, createdAt, interacts, comments }: ComicType) => {
    const { url } = useRouteMatch();

    return (
        <div className="relative z-0 overflow-hidden rounded-2xl shadow-2xl">
            <div className="aspect-w-3 aspect-h-4 sm:aspect-w-4 sm:aspect-h-5">
                <img className="object-cover shadow-lg" src={images?.thumbnail.url} alt="comic" />
            </div>
            <div className="absolute bg-overlay inset-0"></div>
            <div className="absolute inset-x-0 bottom-0 px-6 pb-4">
                <p className="text-gray-400 font-light sm:text-sm lg:text-xs">
                    {createdAt?.toDate().toLocaleString("UTC")}
                </p>
                <Link to={`${url}/${id}/detail`}>
                    <p className="mt-2 hover:underline text-white text-xl font-medium">{name.orgName}</p>
                </Link>
                <div className="text-gray-400 font-light flex justify-end space-x-3 mt-2 ">
                    <div className="flex items-center space-x-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="img"
                            width="1em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                        >
                            <g fill="currentColor">
                                <circle cx="12" cy="12" r="1.5"></circle>
                                <path d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5c-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zm-9.87 4a3.5 3.5 0 1 1 3.5-3.5a3.5 3.5 0 0 1-3.5 3.5z"></path>
                            </g>
                        </svg>
                        <span>{interacts?.views} </span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <ChatIcon className="w-4" /> <span>{comments?.length}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <HeartIcon className="w-4" />
                        <span>{interacts?.bookMark}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
