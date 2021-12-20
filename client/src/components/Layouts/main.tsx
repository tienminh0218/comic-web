import Head from "next/head";

import { LayoutProps } from "@/models/index";
import { NavBottom } from "./Nav";
import Header from "./Header";
import Footer from "./Footer";

export const MainLayout = ({ title, children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title || "MangaZ"}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <div>
                <NavBottom />
                <Header />
                <div className="dark:bg-black transition-all duration-500">{children}</div>
                <Footer />
            </div>
        </>
    );
};
