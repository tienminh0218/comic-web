import "tailwindcss/tailwind.css";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../index.css";
import { AppPropsWithLayout } from "@/models/index";
import { Empty } from "@/components/Layouts";
import { AuthStateChange } from "@/hoc/index";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const Layout = Component.Layout ?? Empty;

    return (
        <RecoilRoot>
            <AuthStateChange>
                <ToastContainer autoClose={1500} />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthStateChange>
        </RecoilRoot>
    );
}

export default MyApp;
