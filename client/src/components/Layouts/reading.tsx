import Head from "next/head";

import { LayoutProps } from "@/models/index";
import { NavReading } from "./Nav";
import Footer from "./Footer";

export const ReadingLayout = ({ title, children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title || "MangaZ"}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <div>
                {/* <NavReading /> */}
                <div className="dark:bg-black transition-all duration-500">{children}</div>
                <Footer />
            </div>
        </>
    );
};
