import * as yup from "yup";

export const schemaGenre = yup.object({
    name: yup
        .string()
        .required("Bạn chưa nhập tên")
        .min(2, "Nhập ít thế ai biết bro")
        .max(30, "Định làm hacker à địt mẹ !!!"),
    describe: yup
        .string()
        .required("Bạn chưa nhập mô tả")
        .min(5, "Nhập ít thế ai hiểu ?????")
        .max(255, "Vừa thôi đéo ai coi đâu ??"),
});
