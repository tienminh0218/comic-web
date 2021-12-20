import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputField } from "@/components/FormFields";
import { SignUpType } from "@/models/index";
import { schemaRegister } from "@/validations/index";

interface InitValueSignUp extends SignUpType {
    confirmPassword: string;
}

interface Props {
    onSignUp: (payload: SignUpType) => Promise<void>;
}

const initialValue: InitValueSignUp = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
};

export const SignUp = ({ onSignUp }: Props) => {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schemaRegister),
    });

    const onSubmit = async (payload: InitValueSignUp) => {
        await onSignUp(payload);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField label="Email" name="email" control={control} />
                <InputField label="Mật khẩu" name="password" control={control} type="password" />
                <InputField label="Nhập lại mật khẩu" name="confirmPassword" control={control} type="password" />
                <div className="flex gap-2">
                    <InputField label="Họ" name="lastName" control={control} />
                    <InputField label="Tên" name="firstName" control={control} />
                </div>
                <button
                    type="submit"
                    className={`${
                        isSubmitting && "pointer-events-none opacity-70"
                    }  btn mt-4 py-3 text-lg rounded-md w-full text-white bg-black flex-center space-x-3`}
                >
                    {isSubmitting && <AiOutlineLoading3Quarters className="animate-spin" />}
                    <span>Đăng ký</span>
                </button>
            </form>
        </div>
    );
};
