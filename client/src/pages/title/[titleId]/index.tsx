import { useRouter } from "next/router";
import Link from "next/link";
import AnimatedShowMore from "react-animated-show-more";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";

import { MainLayout } from "@/components/Layouts";
import { apiClient } from "@/lib/axios";
import { firestore } from "@/lib/firebase/service";
import { ComicType, NextPageWithLayout, ComicWasInteracted } from "@/models/index";
import { LoadingScreen, SoonFeature } from "@/components/Common";
import Genres from "@/components/Genres";
import { useAuth } from "@/hook/index";
import { interactOfComic, historyOfComic } from "@/app/selector";
import { interactComicsState } from "@/app/atoms";

interface DetailPageProps {
    comic: ComicType;
}

interface InteractOfUserWithComic {
    isLike?: boolean;
    isBookmark?: boolean;
}

const TitlePage: NextPageWithLayout<DetailPageProps> = ({ comic }) => {
    const [comicState, setComicState] = useState<ComicType>(comic);
    const { interactState, index } = useRecoilValue(interactOfComic(comic.id!));
    const historyComic = useRecoilValue(historyOfComic(comic.id!));
    const [listInteract, setListInteract] = useRecoilState(interactComicsState);
    const router = useRouter();
    const { user } = useAuth();

    if (router.isFallback) {
        return <LoadingScreen />;
    }

    const updateLikeAndBookmark = (interaction: InteractOfUserWithComic) => {
        if (interaction?.isLike || interaction?.isLike === false) {
            const updateNumLike: number = interaction.isLike
                ? comicState.interacts!.like + 1
                : comicState.interacts!.like - 1;

            setComicState({
                ...comicState,
                interacts: {
                    ...comicState.interacts!,
                    like: updateNumLike,
                },
            });
            firestore.updateDb("comics", comicState.id!, {
                "interacts.like": updateNumLike,
            });
        }
        if (interaction?.isBookmark || interaction?.isBookmark === false) {
            const updateNumBookmark: number = interaction.isBookmark
                ? comicState.interacts!.bookMark + 1
                : comicState.interacts!.bookMark - 1;

            setComicState({
                ...comicState,
                interacts: {
                    ...comicState.interacts!,
                    bookMark: updateNumBookmark,
                },
            });
            firestore.updateDb("comics", comicState.id!, {
                "interacts.bookMark": updateNumBookmark,
            });
        }
    };

    const handleInteracts = async (interaction: InteractOfUserWithComic) => {
        if (!user) return toast.error("Bạn chưa đăng nhập", { autoClose: 2000 });
        let newList: ComicWasInteracted[] = [...listInteract];
        const data = {
            idComic: comicState.id,
            ...interactState,
            ...interaction,
        };
        if (index === -1) {
            newList.push(data);
        } else {
            newList.splice(index, 1, data);
        }
        setListInteract(newList);
        updateLikeAndBookmark(interaction);
        await firestore.updateDb("users", user.id, {
            "histories.comicsWasInteracted": newList,
        });
    };

    return (
        <div className="min-w-[350px] px-5">
            <div className="flex flex-wrap-reverse w-full md:flex-nowrap md:justify-between pt-12 md:pt-24 md:pl-16 md:pb-8 2xl:mb-0 2xl:pl-80">
                <div
                    key={comicState.id}
                    className=" w-full h-max relative z-1 -mt-12 md:flex md:flex-col md:items-start md:mt-0 "
                >
                    <p className="mb-1 text-2xl text-[#989898] font-semibold">{comicState.name.orgName}</p>
                    <p className="text-5xl font-bold pb-4 dark:text-dark-text-color transition-all ">
                        {comicState.name.vnName}
                    </p>
                    <div className="flex flex-wrap text-xs pb-5">
                        <Genres genres={comicState.genres} />
                    </div>
                    <div className="h-max">
                        <AnimatedShowMore
                            shadowColor="#8a8a8a"
                            height={90}
                            toggle={({ isOpen }) =>
                                isOpen ? (
                                    <p className="text-lg font-semibold underline dark:text-dark-text-color transition-all">
                                        Rút gọn
                                    </p>
                                ) : (
                                    <p className="text-lg font-semibold underline dark:text-dark-text-color transition-all">
                                        Xem thêm
                                    </p>
                                )
                            }
                            speed={200}
                        >
                            <p className="text-lg leading-8 dark:text-dark-text-color transition-all ">
                                {comicState.describe}
                            </p>
                        </AnimatedShowMore>
                    </div>
                    <div className="mt-5 h-auto flex flex-col w-full bg-dark-text-color p-8 gap-4 rounded-lg dark:bg-[#1A1A1A] dark:text-[#c9d1d9] transition-all 2xl:mb-8 ">
                        <div className="flex flex-col gap-2 md:flex-row">
                            <p className="font-bold text-base ">Tác giả / Họa sĩ:</p>
                            <span>
                                <a
                                    className="text-base underline-custom hover:underline hover:cursor-pointer dark:text-[#fff]"
                                    href="https://catmanga.org/discover?authors=Iori%20Asaga"
                                >
                                    {comicState.author}
                                </a>
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 md:flex-row">
                            <p className="font-bold text-base ">Lượt xem:</p>
                            <p className="font-semibold text-base dark:text-[#fff]">
                                {comicState.interacts?.views || 0}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 md:flex-row">
                            <p className="font-bold text-base ">Trạng thái:</p>
                            <p className="font-semibold text-base dark:text-[#fff]">{comicState.status}</p>
                        </div>
                    </div>
                </div>
                <div className=" w-full h-max relative min-w-min md:flex md:justify-end md:w-3/5 ">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#f4f4f400] via-[#f4f4f400] to-dark-text-color dark:to-[#000000] md:hidden"></div>
                    <img
                        className="rounded-lg h-96 w-full object-cover object-top md:flex md:h-max md:w-8/12"
                        src={comicState.images?.thumbnail.url}
                        alt={comicState.name.vnName}
                    />
                </div>
            </div>
            <div className=" flex flex-wrap-reverse pb-16 md:justify-between md:pl-16 2xl:pl-80 ">
                <div className="w-full justify-between shadow-base overflow-y-auto h-108 border border-[#d8dee4] dark:border-[#30363d] rounded-2xl scroll-custom ">
                    <div className="flex justify-between py-3 pr-4 border-b border-[#d8dee4] dark:border-[#30363d]  bg-dark-text-color text-sm font-semibold dark:bg-[#1A1A1A] dark:text-[#c9d1d9] ">
                        <span className="min-w-[9rem] w-1/2 ml-4">Danh sách chương</span>
                        <div className="flex justify-between w-1/2 space-x-2">
                            <span className="">Ngày cập nhật</span>
                            <span className="">Lượt xem</span>
                        </div>
                    </div>
                    <>
                        {comicState && comicState.listChapter.length !== 0 ? (
                            comicState.listChapter.map((chapter) => (
                                <Link
                                    key={chapter.idChapter}
                                    href={{
                                        pathname: "/title/[titleId]/view/[chapter]",
                                        query: {
                                            titleId: comicState.id,
                                            chapter: chapter.idChapter,
                                        },
                                    }}
                                >
                                    <a>
                                        <div className="flex justify-between pr-4 py-2 border-b border-[#d8dee4] dark:border-[#30363d] text-sm font-normal text-gray-500  dark:text-dark-text-color">
                                            <span
                                                className={`${
                                                    historyComic?.comic.listChap.includes(chapter.idChapter) &&
                                                    "sub-color"
                                                } hover:text-black dark:hover:text-pink-500 hover:font-semibold min-w-[9rem] w-1/2  truncate  cursor-pointer ml-4`}
                                            >
                                                Chương {chapter.name}
                                            </span>
                                            <div className="flex justify-between w-1/2 space-x-2">
                                                <span className="">{chapter.createdAt}</span>
                                                <span className="">{chapter.views} </span>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center pr-4 py-2 border-b border-[#d8dee4] dark:border-[#30363d] text-sm font-normal text-gray-500  dark:text-dark-text-color">
                                <span className="ml-4 font-semibold">Chưa có chap nào</span>
                            </div>
                        )}
                    </>
                </div>

                <div className="flex flex-col w-full relative min-w-min md:justify-start gap-2 md:flex-row md:items-center my-8">
                    <div className=" flex w-content flex-wrap  md:w-8/12 text-lg dark:text-dark-text-color">
                        {comicState.listChapter.length > 0 && (
                            <>
                                {historyComic ? (
                                    <Link
                                        href={`/title/${historyComic.comic.idComic}/view/${historyComic.comic.idChapter}`}
                                    >
                                        <a className="text-base flex-center mr-2 mb-2 px-3 py-1 rounded-md tracking-wider font-semibold border-solid border border-[#d8dee4] dark:border-[#30363d] bg-gray-200 hover:bg-transparent hover:cursor-pointer dark:bg-[#1A1A1A] dark:hover:bg-transparent transition-default ">
                                            Đọc tiếp chap {historyComic.comic.nameChapter}
                                        </a>
                                    </Link>
                                ) : (
                                    <Link
                                        href={`/titles/${comicState.id}/views/${comicState.listChapter[0].idChapter}`}
                                    >
                                        <a className="text-base flex-center mr-2 mb-2 px-3 py-1 rounded-md tracking-wider font-semibold border-solid border border-[#d8dee4] dark:border-[#30363d] bg-gray-200 hover:bg-transparent hover:cursor-pointer dark:bg-[#1A1A1A] dark:hover:bg-transparent transition-default ">
                                            Đọc mới nhất
                                        </a>
                                    </Link>
                                )}

                                <Link
                                    href={`/title/${comicState.id}/view/${
                                        comicState.listChapter[comicState.listChapter.length - 1].idChapter
                                    }`}
                                >
                                    <a className="text-base flex-center mr-2 mb-2 px-3 py-1 rounded-md tracking-wider font-semibold border-solid border border-[#d8dee4] dark:border-[#30363d] bg-gray-200 hover:bg-transparent hover:cursor-pointer dark:bg-[#1A1A1A] dark:hover:bg-transparent transition-default ">
                                        Đọc từ đầu
                                    </a>
                                </Link>
                            </>
                        )}
                        <div
                            className="inline-block mr-2 mb-2 p-1 w-28 rounded-md tracking-wider font-semibold border-solid border border-[#d8dee4] dark:border-[#30363d] bg-gray-200 hover:bg-transparent hover:cursor-pointer dark:bg-[#1A1A1A] dark:hover:bg-transparent transition-default "
                            onClick={() => handleInteracts({ isLike: !interactState.isLike })}
                        >
                            <span className="flex items-center space-x-2 justify-center w-full">
                                {interactState.isLike ? <AiTwotoneLike /> : <AiOutlineLike />}
                                <p>{comicState.interacts?.like || 0}</p>
                            </span>
                        </div>
                        <div
                            className="inline-block mr-2 mb-2 p-1  w-28 rounded-md tracking-wider font-semibold border-solid border border-[#d8dee4] dark:border-[#30363d] bg-gray-200 hover:bg-transparent hover:cursor-pointer dark:bg-[#1A1A1A] dark:hover:bg-transparent transition-default"
                            onClick={() => handleInteracts({ isBookmark: !interactState.isBookmark })}
                        >
                            <span className="flex items-center space-x-2 justify-center w-full">
                                {interactState.isBookmark ? <BsBookmarkFill /> : <BsBookmark />}
                                <p>{comicState.interacts?.bookMark || 0}</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:pl-16 2xl:pl-80">
                <h3 className="text-color-default font-medium text-3xl">Comments</h3>
                <SoonFeature />
            </div>
        </div>
    );
};

TitlePage.Layout = MainLayout;

export default TitlePage;

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await apiClient.getTitles();
    return {
        paths: data.map((comic) => ({ params: { titleId: comic.id } })),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<DetailPageProps> = async (context: GetStaticPropsContext) => {
    const titleId = context.params?.titleId as string;
    const props = await apiClient.getTitleById<DetailPageProps>(titleId);
    if (!(titleId && props)) return { notFound: true };
    return {
        props,
        revalidate: 5,
    };
};
