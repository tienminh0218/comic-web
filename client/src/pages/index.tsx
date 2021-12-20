import { GetStaticProps } from "next";

import { MainLayout } from "@/components/Layouts";
import Slider from "@/components/Slider";
import { ListComic } from "@/components/ListComic";
import { PopularHomePage } from "@/components/Popular";
import { NextPageWithLayout, ComicType } from "@/models/index";
import { apiClient } from "@/lib/axios";

interface HomePageProps {
    recommend: ComicType[];
    popular: ComicType[];
    lastUpdated: ComicType[];
    newSeries: ComicType[];
}

const Home: NextPageWithLayout<HomePageProps> = ({ recommend, popular, lastUpdated, newSeries }) => {
    return (
        <>
            <Slider comics={recommend} />
            <div className="flex flex-col items-end px-6">
                <div className="md:pl-16 2xl:pl-80 w-full mt-14 mb-20">
                    <ListComic title="Cập nhật" className="mt-8" comics={lastUpdated} isNew />
                    <PopularHomePage title="Lượt xem" className="my-16" comics={popular} />
                </div>
            </div>
            <div className="flex flex-col items-end px-6 pt-10 pb-16 bg-[#f4f4f4] dark:bg-[#1a1a1a] transition-all duration-500">
                <div className="md:pl-16 2xl:pl-80 w-full">
                    <ListComic title="New Series" comics={newSeries} />
                </div>
            </div>
        </>
    );
};

Home.Layout = MainLayout;

export default Home;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    const props = await apiClient.homePage<HomePageProps>();
    return {
        props,
        revalidate: 5,
    };
};
