import * as yup from "yup";

export const schemaLogin = yup.object({
    email: yup.string().required("Bạn chưa nhập email"),
    password: yup.string().min(4, "Mật khẩu ít nhất 6 kí tự").required("Bạn chưa nhập mật khẩu"),
});

export const schemaRegister = yup.object({
    email: yup.string().email("Email không đúng định dạng").required("Bạn chưa nhập email"),
    password: yup.string().min(4, "Mật khẩu ít nhất 6 kí tự").required("Bạn chưa nhập mật khẩu"),
    confirmPassword: yup
        .string()
        .required("Bạn chưa nhập mật khẩu xác thực")
        .oneOf([yup.ref("password"), null], "Mật khẩu xác thực không đúng"),
    lastName: yup
        .string()
        .min(2, "Họ ít nhất 2 kí tự")
        .max(20, "Họ ít hơn 20 kí tự")
        .required("Bạn chưa nhập họ "),
    firstName: yup
        .string()
        .min(2, "Tên ít nhất 2 kí tự")
        .max(20, "Tên ít hơn 20 kí tự")
        .required("Bạn chưa nhập tên"),
});
