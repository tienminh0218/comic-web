import { useState } from "react";

const DARK_THEME = "DarkTheme";

export const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(Boolean(localStorage.getItem(DARK_THEME)));

    const toggleTheme = () => {
        const isDarkTheme = Boolean(localStorage.getItem(DARK_THEME));
        if (isDarkTheme) {
            document.body.classList.remove("dark", "bg-black");
            localStorage.removeItem(DARK_THEME);
        } else {
            document.body.classList.add("dark", "bg-black");
            localStorage.setItem(DARK_THEME, "true");
        }
        setIsDarkMode(!isDarkTheme);
    };

    return {
        toggleTheme,
        isDarkMode,
    };
};
