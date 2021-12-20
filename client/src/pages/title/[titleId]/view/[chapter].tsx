import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";

import { apiClient } from "@/lib/axios/index";
import Footer from "@/components/Layouts/Footer";
import { NavReading, NextAndPrevChap } from "@/components/Layouts/Nav";
import { ComicType, Chapter, NextPageWithLayout } from "@/models/index";
import { LoadingScreen } from "@/components/Common";
import { historyOfComic } from "@/app/selector";
import { comicsHaveReadState } from "@/app/atoms";
import { firestore } from "@/lib/firebase/service";
import { useAuth } from "@/hook/useAuth";

export interface ViewsPageProps {
    comic: ComicType;
    chapter: Chapter;
    nextAndPrev: NextAndPrevChap;
}
interface ParamViewsPageProps extends ParsedUrlQuery {
    titleId: string;
    chapter: string;
}

const ViewsPage = ({ comic, chapter, nextAndPrev }: ViewsPageProps) => {
    const router = useRouter();
    const historyComic = useRecoilValue(historyOfComic(comic.id));
    const [listHistory, setListHistory] = useRecoilState(comicsHaveReadState);
    const { titleId } = router.query as ParamViewsPageProps;
    const { user } = useAuth();

    const handleChangeChap = (url: string) => {
        router.push(`/title/${titleId}/view/${url}`);
    };

    if (router.isFallback) {
        return <LoadingScreen />;
    }

    if (!chapter) {
        router.push("/");
        return <LoadingScreen />;
    }

    useEffect(() => {
        const addToHisory = () => {
            let newList = [...listHistory];
            if (historyComic) {
                newList.splice(historyComic.index, 1, {
                    ...historyComic.comic,
                    idChapter: chapter.id!,
                    nameChapter: chapter.nameChapter,
                    updatedAt: new Date().toUTCString(),
                });
            } else {
                newList.push({
                    idComic: comic.id,
                    nameComic: comic.name.vnName,
                    imageURL: comic.images?.thumbnail.url!,
                    idChapter: chapter.id!,
                    nameChapter: chapter.nameChapter,
                    createdAt: new Date().toUTCString(),
                    updatedAt: new Date().toUTCString(),
                });
            }
            setListHistory(newList);
            if (user)
                firestore.updateDb("users", user.id, {
                    "histories.viewed": newList,
                });
        };
        const timeout = setTimeout(addToHisory, 3000);
        return () => clearTimeout(timeout);
    }, [chapter.id]);

    return (
        <>
            <NavReading
                onChangeChap={handleChangeChap}
                nextAndPrev={nextAndPrev}
                comic={comic}
                idCurrentChapter={chapter.id!}
                titleId={titleId}
            />
            <div className="mx-auto flex flex-col items-center px-2 pb-20 min-h-screen w-full select-none">
                {chapter.images.map((image) => (
                    <LazyLoadImage
                        key={image.nameFile}
                        placeholderSrc="/image-loading.gif"
                        effect="blur"
                        className="obj"
                        src={image.url}
                    />
                ))}
            </div>

            <Footer />
        </>
    );
};

export default ViewsPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const comics = await apiClient.getTitles();
    //filter comic has chapter. Flat return all sub-array elements
    const comicFilterChapterId = comics.filter((comic) => comic.listChapter.length > 0);
    return {
        paths: comicFilterChapterId
            .map((comic) =>
                comic.listChapter.map((chapter) => ({
                    params: { titleId: comic.id, chapter: chapter.idChapter },
                }))
            )
            .flat(),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<ViewsPageProps> = async (context: GetStaticPropsContext) => {
    const { titleId, chapter } = context.params as ParamViewsPageProps;
    if (!titleId || !chapter) return { notFound: true };
    const props: ViewsPageProps = await apiClient.getChapterById(titleId, chapter);
    return {
        props,
        revalidate: 5,
    };
};
