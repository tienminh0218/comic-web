import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DownloadIcon } from "@heroicons/react/outline";

interface Props {
    handleFile: (file: []) => void;
    urlImage: string;
}

const DropZone = ({ handleFile, urlImage }: Props) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            handleFile(acceptedFiles);
        },
        [handleFile]
    );

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: false,
        onDrop,
    });

    return (
        <div
            className={`${
                !urlImage ? "h-72 bg-gray-100  border-gray-400 hover:border-green-300" : "border-gray-300"
            } group w-full transition-all cursor-pointer border-2 border-dashed`}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            {urlImage ? (
                <div className="aspect-w-3 aspect-h-4">
                    <img className="object-cover w-full" src={urlImage} alt={urlImage} />
                </div>
            ) : (
                <div className="group-hover:text-gray-400 text-gray-500 h-full flex items-center justify-center flex-col transition-all ">
                    <DownloadIcon className="w-20 group-hover:text-green-300" />
                    <span className="text-center"> Chọn hoặc quăng tao cái bonk</span>
                </div>
            )}
        </div>
    );
};

export default DropZone;
