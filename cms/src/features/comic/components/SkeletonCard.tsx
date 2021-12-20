interface Props {
    numberItem: number;
}

export const SkeletonCard = ({ numberItem }: Props) => {
    return (
        <>
            {[...new Array(numberItem)].map((item, index) => (
                <div key={`SkeletonCard_${index}`} className="relative z-0 overflow-hidden rounded-2xl">
                    <div className=" aspect-w-3 aspect-h-4 sm:aspect-w-4 sm:aspect-h-5"></div>
                    <div className="absolute bg-gray-200 inset-0"></div>
                    <div className="absolute inset-x-0 bottom-0 px-6 pb-4">
                        <p className="py-2 animate-pulse bg-white w-32 mt-4 rounded-md"></p>
                        <div className="animate-pulse py-4 rounded-md bg-white mt-4 hover:underline text-white text-xl font-medium"></div>
                        <div className="py-2 animate-pulse bg-white w-32 float-right mt-4 rounded-md"></div>
                    </div>
                </div>
            ))}
        </>
    );
};
