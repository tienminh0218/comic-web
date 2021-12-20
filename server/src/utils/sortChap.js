export const sortChapters = (listChap) => {
    return [...listChap].sort((a, b) => {
        return b.name.localeCompare(a.name);
    });
};
