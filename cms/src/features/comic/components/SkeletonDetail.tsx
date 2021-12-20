import { PencilIcon, WifiIcon, ClockIcon, FilterIcon } from "@heroicons/react/outline";

interface Props {}

export const SkeletonDetail = (props: Props) => {
    return (
        <div className="">
            <div className="h-60 w-full bg-no-repeat bg-cover-image bg-cover overflow-hidden rounded-lg">
                <div className="cover-imageComic w-full h-full"></div>
            </div>
            <div className="relative z-10 bottom-36 sm:bottom-44">
                <div className="flex">
                    <div className="w-32 h-40 bg-gray-300 mx-auto lg:mx-4 sm:w-36 sm:h-48 md:h-60 md:w-48 rounded-md overflow-hidden shadow-lg"></div>
                    <div className="hidden relative lg:block text-white pt-4 mr-4">
                        <div className="text-xl text-transparent bg-gray-300 animate-pulse rounded-md">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, iste! adipisicing elit. A,
                            iste!
                        </div>
                        <p className="text-xs text-transparent bg-gray-300 animate-pulse rounded-md w-max mt-2">
                            comic.name.orgName
                        </p>
                    </div>
                </div>

                <div className="mt-4 space-y-1">
                    <strong className="text-xl md:text-2xl bg-gray-300 rounded-md animate-pulse text-transparent w-max lg:hidden">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                    </strong>
                    <p className="lg:hidden bg-gray-300 rounded-md animate-pulse text-transparent w-max animate-pulse text-sm">
                        Lorem ipsum dolor sit, amet consectetur
                    </p>
                    <p className="flex items-center gap-1">
                        <PencilIcon className="w-5" />
                        <strong>Tác giả:</strong>{" "}
                        <span className="bg-gray-300 animate-pulse w-max rounded-md text-transparent">
                            {"comic.author"}
                        </span>
                    </p>
                    <p className="flex items-center gap-1">
                        <WifiIcon className="w-5" />
                        <strong>Tình trạng:</strong>{" "}
                        <span className="bg-gray-300 animate-pulse w-max rounded-md text-transparent">
                            {"comic.author"}
                        </span>
                    </p>
                    <p className="flex items-center gap-1">
                        <ClockIcon className="w-5" />
                        <strong>Ngày đăng:</strong>{" "}
                        <span className="bg-gray-300 animate-pulse w-max rounded-md text-transparent">
                            {"comic.author"}
                        </span>
                    </p>
                    <p className="flex items-center gap-1">
                        <ClockIcon className="w-5" />
                        <strong>Ngày cập nhật:</strong>{" "}
                        <span className="bg-gray-300 animate-pulse w-max rounded-md text-transparent">
                            {"comic.author"}
                        </span>
                    </p>
                    <div className="flex items-center gap-1">
                        <FilterIcon className="w-5" />
                        <strong>Thể loại:</strong>{" "}
                        <span className="bg-gray-300 animate-pulse w-max rounded-md text-transparent mr-1">
                            Lorem.
                        </span>
                        <span className="bg-gray-300 animate-pulse w-max rounded-md text-transparent mr-1">
                            Lorem.
                        </span>
                        <span className="bg-gray-300 animate-pulse w-max rounded-md text-transparent mr-1">
                            Lorem.
                        </span>
                    </div>
                    <p>
                        <strong>Mô tả:</strong>{" "}
                        <span className="bg-gray-300 animate-pulse w-max rounded-md text-transparent mr-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, optio voluptatum?
                            Suscipit et ratione Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
                            quibusdam blanditiis laborum, itaque deserunt ipsa, similique libero, hic vel odit est
                            magnam exercitationem ea eveniet quis sunt repellendus. Earum! et ratione Lorem ipsum
                            dolor sit amet consectetur
                        </span>
                    </p>
                    <div className="flex flex-wrap gap-2 pt-4">
                        <button className="btn flex justify-center bg-gray-500">
                            <svg
                                className="animate-spin -ml-1 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </button>

                        <button className="btn flex justify-center bg-red-500">
                            <svg
                                className="animate-spin -ml-1 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </button>
                        <button className="btn flex justify-center bg-indigo-500">
                            <svg
                                className="animate-spin -ml-1 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </button>
                        <button className="btn flex justify-center bg-green-500">
                            <svg
                                className="animate-spin -ml-1 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
