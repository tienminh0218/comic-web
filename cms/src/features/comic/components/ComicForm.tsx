import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";

import { schemaComic } from "../validate";
import { listGenreState } from "app/selectors";
import { InputField, SelectField, SelectMultiField } from "components/FormFields";
import DropZone from "components/DropZone";
import { ImagesUploadType, ImagesComic } from "../pages/AddEdit";
interface Props {
    onSubmit: (payload: any) => void;
    initialValues: any;
    onDrop: (type: ImagesComic, acceptedFiles: []) => void;
    imageUpload: ImagesUploadType;
    showError: boolean;
    isEdit: boolean;
}

export const ComicForm = ({ initialValues, onSubmit, onDrop, imageUpload, showError, isEdit }: Props) => {
    const listGenre = useRecoilValue(listGenreState);
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schemaComic),
    });

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="lg:grid lg:grid-cols-2">
                    <div className="">
                        <InputField label="Tên gốc" name="name.orgName" control={control} />
                        <InputField label="Tên việt" name="name.vnName" control={control} />
                        <InputField label="Tác giả" name="author" control={control} />

                        <SelectField
                            label="Trạng thái"
                            name="status"
                            control={control}
                            options={[
                                { label: "Đang tiến hành", value: "Đang tiến hành" },
                                { label: "Đã hoàn thành", value: "Đã hoàn thành" },
                                { label: "Tạm ngưng", value: "Tạm ngưng" },
                            ]}
                        />
                        <SelectMultiField name="genres" label="Thể loại" control={control} options={listGenre} />
                        <InputField label="Mô tả" name="describe" control={control} multiline rows={10} />
                    </div>

                    <div className="mt-7 flex flex-wrap justify-around gap-2 lg:ml-2 lg:mt-0">
                        <div className="w-full max-w-ss">
                            <h3 className="text-lg font-medium ml-2 mb-2">Banner</h3>
                            <DropZone
                                urlImage={imageUpload.banner.url}
                                handleFile={(file) => onDrop("BANNER", file)}
                            />
                        </div>
                        <div className="w-full max-w-ss ">
                            <h3 className="text-lg font-medium ml-2 mb-2">Thumbnail</h3>
                            <DropZone
                                urlImage={imageUpload.thumbnail.url}
                                handleFile={(file) => onDrop("THUMBNAIL", file)}
                            />
                        </div>
                    </div>
                    <div className="h-max w-full mt-7">
                        {showError && (
                            <div
                                className="bg-red-100 border mt-3 border-red-400 text-red-700 px-4 py-3 rounded relative"
                                role="alert"
                            >
                                <strong className="font-bold">Ối dời ơi!</strong>{" "}
                                <span className="block sm:inline">Chưa up ảnh kìa.</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`${isSubmitting && "pointer-events-none opacity-50"}
                             ${
                                 isEdit
                                     ? "bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-400"
                                     : "bg-green-400 hover:bg-green-500 active:bg-green-400"
                             } btn mt-7  text-white flex items-center justify-center`}
                        >
                            {isSubmitting && (
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                            )}
                            {isEdit ? "Cập nhật" : "Thêm"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
