import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/outline";

export const ScrollTop = () => {
    const [showGoTop, setShowGoTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowGoTop(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {showGoTop && (
                <div
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed z-50 bottom-5 right-8 w-10 h-10 cursor-pointer bg-green-400 hover:bg-green-500 active:bg-green-400 transition-opacity duration-150 text-white rounded-full flex justify-center items-center "
                >
                    <ChevronUpIcon className="w-8" />
                </div>
            )}
        </>
    );
};
