export const convertsData = (querySnapshot) => {
    if (!querySnapshot) return [];
    const data = [];
    querySnapshot.forEach((doc) => {
        const item = {
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data()?.createdAt?.toDate(),
            updatedAt: doc.data()?.updatedAt?.toDate(),
        };
        data.push(item);
    });
    return data;
};

export const convertData = (doc) => {
    const data = {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data()?.createdAt?.toDate(),
        updatedAt: doc.data()?.updatedAt?.toDate(),
    };
    return doc.exists ? data : null;
};
