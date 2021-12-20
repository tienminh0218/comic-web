module.exports = {
    mode: "jit",
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            boxShadow: {
                green: "rgb(0 171 85 / 24%) 0px 8px 16px 0px",
                base: "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",
            },
            zIndex: {
                "-1": "-1",
                1: 1,
            },
            backgroundColor: {
                overlay: "rgba(22, 28, 36, 0.72)",
                modal: "rgba(22, 28, 36, 0.15)",
            },
            screens: {
                xs: "25rem",
                "3xl": "1664px",
            },
            fontFamily: {
                body: ["hind", "simhei", "verdana", "Helvetica", "sans-serif"],
            },
            minWidth: {
                28: "7rem",
            },
            height: {
                108: "27rem",
                160: "40rem",
                196: "48rem",
                208: "50rem",
                320: "80rem",
                max: "max-content",
            },
            minHeight: {
                images: "36rem",
            },
            maxWidth: {
                ss: "13.5rem",
            },
            backgroundPosition: {
                "cover-image": "0 25%",
            },
            width: {
                86: "21.5rem",
                100: "25rem",
            },
            cursor: {
                "n-resize": "n-resize",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};
