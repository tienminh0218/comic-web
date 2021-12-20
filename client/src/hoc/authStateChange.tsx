import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState, useRecoilState } from "recoil";

import { LoadingScreen } from "@/components/Common";
import { auth } from "@/lib/firebase/config";
import { firestore } from "@/lib/firebase/service";
import { useAuth } from "@/hook/useAuth";
import { genresState, interactComicsState, comicsHaveReadState } from "@/app/atoms";
import { GenreType } from "@/models/genre";
import { User } from "../models";

interface Props {
    children: ReactNode;
}

export const AuthStateChange = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const setGenres = useSetRecoilState(genresState);
    const [test, setComicsHaveReadState] = useRecoilState(comicsHaveReadState);
    const setInteractState = useSetRecoilState(interactComicsState);
    const { setUser } = useAuth();

    useEffect(() => {
        /// theme
        document.body.classList.add("transition-all", "duration-500");
        Boolean(localStorage.getItem("DarkTheme")) && document.body.classList.add("dark", "bg-black");

        (async () => {
            const data = await firestore.getDocsDb<GenreType[]>("genres");
            setGenres(data);
        })();

        /// auth state change
        const getUser = async (uid: string): Promise<User> => {
            return firestore.getDocDb<User>("users", uid);
        };

        const unSubAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const u = await getUser(user.uid);
                setInteractState(u.histories.comicsWasInteracted);
                setComicsHaveReadState(u.histories.viewed);
                setUser({ id: user.uid, email: user.displayName || user.email });
            }
            setIsLoading(false);
        });

        return () => {
            unSubAuth();
        };
    }, []);

    return <>{isLoading ? <LoadingScreen /> : <>{children}</>}</>;
};
