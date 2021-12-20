import * as yup from "yup";

export const schemaLogin = yup.object({
    username: yup.string().required("Bạn chưa nhập tài khoản"),
    password: yup.string().min(4, "Mật khẩu ít nhất 4 kí tự").required("Bạn chưa nhập mật khẩu"),
});
