import React from "react";

interface Props {}

export const LoadingScreen = (props: Props) => {
    return (
        <div className="w-full h-screen bg-[#150733] flex justify-center items-center">
            <img src="loading.gif" alt="" />
        </div>
    );
};
