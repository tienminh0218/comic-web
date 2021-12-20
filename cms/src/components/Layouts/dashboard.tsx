import { Switch, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import Sidebar from "components/Sidebar";
import Navbar from "components/Nav";
import { ScrollTop } from "components/Common";
import { userState } from "app/atoms";
import { routes } from "routes";

const DashboardLayout = () => {
    const [active, setActive] = useState(false);
    const { currentUser } = useRecoilValue(userState);
    const { pathname } = useLocation();

    const handleActive = (value: boolean) => {
        setActive(value);
        let body = document.getElementsByTagName("body")[0];
        value ? (body.style.overflow = "hidden") : (body.style.overflow = "auto");
    };

    return (
        <div className="xl:grid xl:grid-template-xl-screen">
            <ScrollTop />

            {/* nav bar */}
            <Navbar emailUser={currentUser!.email} handleActive={handleActive} />

            {/* sidebar */}
            <Sidebar pathName={pathname} active={active} handleActive={handleActive} />

            {/* Content */}
            <div className="px-5 md:px-16 lg:px-28 xl:pt-10 mt-16 xl:mt-0 pb-10">
                <Switch>
                    {routes.map((route) => (
                        <Route
                            path={route.path}
                            component={route.component}
                            key={route.path}
                            exact={route.exact}
                        />
                    ))}
                </Switch>
            </div>
        </div>
    );
};

export default DashboardLayout;
