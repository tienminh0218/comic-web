import { HistoryViewed } from "@/models/index";
import { CardHistory } from "@/components/Card/";
import { EmptyList } from "@/components/Common";

interface Props {
    className?: string;
    title?: string;
    comics: HistoryViewed[];
}

export const ListHistory = ({ className, title, comics }: Props) => {
    return (
        <div className={`${className || ""} w-full`}>
            {title && <h3 className="font-bold text-2xl xs:text-4xl dark:text-white mb-10">{title}</h3>}
            <div
                className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-y-10`}
            >
                {comics.length !== 0 ? (
                    comics.map((comic) => <CardHistory key={comic.idComic} comic={comic} />)
                ) : (
                    <EmptyList />
                )}
            </div>
        </div>
    );
};
