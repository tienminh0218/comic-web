/// atoms
interface CurrentUserState {
    email: string;
    id: string;
}

export interface UserAtomState {
    currentUser: CurrentUserState | undefined;
}

/// selector
export interface GenreSelectorState {
    name: string;
    slug: string;
}

/// common
export type LoginType = {
    username: string;
    password: string;
};

export interface Routes {
    name: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    path: string;
    exact?: boolean;
    onSidebar?: boolean;
    component: (props: any) => JSX.Element;
}
