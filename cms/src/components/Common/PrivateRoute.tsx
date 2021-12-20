import { RouteProps, Route, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userState } from "app/atoms";

export const PrivateRoute = (props: RouteProps) => {
    const user = useRecoilValue(userState);

    return <>{user.currentUser ? <Route {...props} /> : <Redirect to="/login" />}</>;
};
