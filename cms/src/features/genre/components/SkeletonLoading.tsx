export const SkeletonLoading = () => {
    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                    <div className="bg-gray-200 animate-pulse rounded-sm py-2"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center bg-gray-200 animate-pulse rounded-sm">
                        <div>
                            <div className="text-sm font-medium py-2"></div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 py-2 bg-gray-200 animate-pulse rounded-sm"></div>
                </td>
                <td className="px-6 py-4 "></td>
            </tr>
        </>
    );
};
