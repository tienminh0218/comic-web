import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { InputField } from "@/components/FormFields";
import { SignInType } from "@/models/index";
import { schemaLogin } from "@/validations/index";

const initialValue: SignInType = {
    email: "",
    password: "",
};

interface Props {
    onSignIn: (payload: SignInType) => Promise<void>;
}

export const SignIn = ({ onSignIn }: Props) => {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schemaLogin),
    });

    const onSubmit = async (payload: SignInType) => {
        await onSignIn(payload);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField label="Email" name="email" control={control} />
                <InputField label="Mật khẩu" name="password" control={control} type="password" />
                <button
                    type="submit"
                    className={`${
                        isSubmitting && "pointer-events-none opacity-70"
                    } btn mt-4 py-3 text-lg rounded-md w-full text-white bg-black flex-center space-x-3`}
                >
                    {isSubmitting && <AiOutlineLoading3Quarters className="animate-spin" />}
                    <span>Đăng nhập</span>
                </button>
            </form>
        </div>
    );
};
