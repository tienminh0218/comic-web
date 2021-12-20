module.exports = {
    mode: "jit",
    purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "dark-text-color": "#e4e6eb",
            },
            boxShadow: {
                green: "rgb(0 171 85 / 24%) 0px 8px 16px 0px",
                avatar: "0 0 4px 0px #242526",
            },
            zIndex: {
                1: "1",
                "-1": "-1",
            },
            backgroundColor: {
                overlay: "rgba(22, 28, 36, 0.72)",
                modal: "rgba(22, 28, 36, 0.15)",
            },
            screens: {
                xs: "25rem",
                "2xl-slide": "1547px",
            },
            fontFamily: {
                body: ["hind", "simhei", "verdana", "Helvetica", "sans-serif"],
            },
            minWidth: {
                28: "7rem",
                96: "24rem",
            },
            height: {
                max: "max-content",
                108: "27rem",
            },
            maxWidth: {
                ss: "13.5rem",
                96: "24rem",
                "main-web": "1410px",
            },
            width: {
                86: "21.5rem",
                100: "25rem",
            },
            fill: {
                black: "black",
                white: "white",
            },
            padding: {
                150: "150%",
            },
            objectPosition: {
                "center-top": "center 30%",
            },
        },
    },
    variants: {
        extend: {
            borderColor: ["dark"],
        },
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};
