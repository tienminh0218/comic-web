import * as yup from "yup";

export const schemaComic = yup.object({
    author: yup
        .string()
        .required("Bạn chưa nhập tên tác giả")
        .min(2, "Nhập ít thế ai biết bro")
        .max(30, "Định làm hacker à địt mẹ !!!"),
    describe: yup.string().required("Bạn chưa nhập mô tả").min(5, "Nhập ít thế ai hiểu ?????"),
    genres: yup.array().required().min(1, "Quên thêm thể loại kìa ku"),
    status: yup.string().required("Bạn chưa chọn trang thái"),
    name: yup.object({
        orgName: yup
            .string()
            .required("Bạn chưa nhập tên gốc")
            .min(2, "Nhập ít thế ai biết bro")
            .max(50, "Vừa vừa thôi !!!"),
        vnName: yup
            .string()
            .required("Bạn chưa nhập tên việt")
            .min(2, "Nhập ít thế ai biết bro")
            .max(50, "Vừa vừa thôi !!!"),
    }),
});

export const schemaImagesUpload = yup.object().shape({
    images: yup.object().shape({
        banner: yup.object().shape({
            file: yup.array().min(1),
            url: yup.string().required(),
        }),
        thumbnail: yup.object().shape({
            file: yup.array().min(1),
            url: yup.string().required(),
        }),
    }),
});

export const schemaChapter = yup.object().shape({
    nameChapter: yup
        .string()
        .required("Bạn chưa nhập chương")
        .min(1, "Nhập chưa thế ???")
        .max(60, "Tên chương quá  60 kí tự"),
    images: yup.array().min(1, "Đéo up ảnh đéo cho đâu ku"),
});
