import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

import { ComicWasInteracted, HistoryViewed } from "./user";
export interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export type NextPageWithLayout<T = any> = NextPage<T> & {
    Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export interface SignInType {
    email: string;
    password: string;
}

export interface SignUpType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface NavigationType {
    name: string;
    path: string;
    icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    isOnHeader?: boolean;
    isOnNav?: boolean;
    isOnDrop?: boolean;
    isOnNavMenu?: boolean;
}

// atoms
export interface UserStateType {
    email: string | null | undefined;
    id: string;
}

// selectors
export interface InteractOfComicType {
    interactState: ComicWasInteracted;
    index: number;
}

export interface HistoryOfComicState {
    comic: HistoryViewed;
    index: number;
}

// axios
export interface FilterParams {
    /** slug genres */
    genres?: string | string[];
    /**
     * 1: Đang tiến hành.
     *
     * 2: Đã hoàn thành.
     *
     * 3: Tạm ngưng.
     * @type number
     */
    status?: number;
    /**
     * desc: decrease.
     *
     * asc: ascending.
     * @type string
     */
    upload?: number;
}
