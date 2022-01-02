import React from "react";

interface Props {}

export const EmptyList = (props: Props) => {
    return (
        <div className="min-h-[50vh] w-full col-span-6 flex-center flex-col text-white text-xl">
            <h3>Không có rồi :((</h3>
            <img src="/gif/suba-duck.gif" alt="" />
        </div>
    );
};
