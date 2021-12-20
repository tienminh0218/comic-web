import { ReadingLayout } from "@/components/Layouts";
import { PopularDiscoverPage } from "@/components/Popular";
import { NextPageWithLayout } from "@/models/common";
import React from "react";

interface Props {}

const Blank: NextPageWithLayout<Props> = (props) => {
    return (
        <div className="px-6">
            <div className="my-[1000px] md:pl-16 2xl:pl-80 w-full">{/* <PopularDiscoverPage /> */}</div>
        </div>
    );
};

Blank.Layout = ReadingLayout;

export default Blank;
