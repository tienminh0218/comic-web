import { useRouter } from "next/router";

import { LoadingScreen } from "@/components/Common";
import { useAuth } from "@/hook/index";

export const withAuth = (WrappedComponent, Layout) => {
    const Component = () => {
        const { user } = useAuth();

        // checks whether we are on client / browser or server.
        if (typeof window !== "undefined") {
            const Router = useRouter();
            if (!user) {
                Router.replace("/");
                return <LoadingScreen />;
            }
            return <WrappedComponent />;
        }
        return null;
    };
    Component.Layout = Layout;
    return Component;
};
