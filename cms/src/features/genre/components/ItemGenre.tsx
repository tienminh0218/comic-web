import { GenreType } from "models";

interface Props extends GenreType {
    index: number;
    handleEditing: (data: GenreType) => void;
    handleDeleting: (id: string) => void;
}

export const ItemGenre = ({ id, name, describe, index, handleEditing, handleDeleting }: Props) => {
    return (
        <tr className="hover:bg-gray-50 transition-all duration-150 select-none">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div>
                        <div className="text-sm font-medium text-gray-900">{name}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{describe}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                <span
                    onClick={() => handleEditing({ id, name, describe })}
                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                >
                    Sửa
                </span>
                <span
                    onClick={() => handleDeleting(id!)}
                    className="text-pink-600 hover:text-pink-900 cursor-pointer"
                >
                    Xóa
                </span>
            </td>
        </tr>
    );
};
