import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { userState, genreState } from "app/atoms";
import { PrivateRoute } from "components/Common";
import DashboardLayout from "components/Layouts/dashboard";
import { LoginPage } from "features/auth/pages/LoginPage";
import { auth } from "firebase/config";
import { listeningDocs } from "firebase/service";
import { convertsData } from "utils";
import { GENRES } from "constant/collectionName";

function App() {
    const setUser = useSetRecoilState(userState);
    const setGenre = useSetRecoilState(genreState);

    useEffect(() => {
        const unsubAuth = onAuthStateChanged(auth, (user) => {
            !user && setUser({ currentUser: undefined });
        });
        const { unsubscribe: unsubGenreCollection } = listeningDocs(GENRES, (querySnapshot) => {
            setGenre(convertsData(querySnapshot));
        });

        return () => {
            unsubAuth();
            unsubGenreCollection();
        };
    }, [setUser, setGenre]);

    return (
        <Switch>
            <Route path="/login">
                <LoginPage />
            </Route>

            <PrivateRoute path="/">
                <DashboardLayout />
            </PrivateRoute>
        </Switch>
    );
}

export default App;
