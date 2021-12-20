import { ImagesChapter } from "models";

interface Props {
    isGrid: boolean;
    images: ImagesChapter[];
}

export const ImagePreview = ({ isGrid, images }: Props) => {
    return (
        <div className={`${isGrid && "space-y-8"} `}>
            {images.length !== 0 &&
                images.map(({ url, nameFile }, index) => (
                    <div className="relative flex justify-center" key={index}>
                        <div className="-top-2 -left-2 select-none w-8 h-8 rounded-full flex justify-center items-center absolute bg-black text-white">
                            {index + 1}
                        </div>
                        <img className={`${isGrid && "shadow-2xl"}`} src={url} alt={nameFile} />
                    </div>
                ))}
        </div>
    );
};
