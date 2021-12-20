export const getNextAndPrev = (listChapter, idCurrentChapter) => {
    const result = {
        nextId: undefined,
        prevId: undefined,
    };
    const index = listChapter.findIndex((chapter) => chapter.idChapter === idCurrentChapter);
    listChapter[index + 1] && (result.prevId = listChapter[index + 1].idChapter);
    listChapter[index - 1] && (result.nextId = listChapter[index - 1].idChapter);
    return result;
};
