import { useEffect, useState } from "react";

import { NextPageWithLayout, ComicType } from "@/models/index";
import { MainLayout } from "@/components/Layouts";
import { ListComic } from "@/components/ListComic";
import { withAuth } from "@/hoc/index";
import { LoadingScroll } from "@/components/Common";
import { apiClient } from "@/lib/axios";
import { useAuth } from "@/hook/index";

const Bookmark: NextPageWithLayout = () => {
    const { user } = useAuth();
    const [comics, setComics] = useState<ComicType[]>([]);

    useEffect(() => {
        (async () => {
            const comics = await apiClient.getListBookmark(user?.id!);
            setComics(comics);
        })();
    }, []);

    return (
        <div className="px-6 mt-20 min-h-screen">
            <div className=" md:pl-16 2xl:pl-80 w-full mb-16">
                {comics.length > 0 ? <ListComic title="Truyện theo dõi" comics={comics} /> : <LoadingScroll />}
            </div>
        </div>
    );
};

export default withAuth(Bookmark, MainLayout);
