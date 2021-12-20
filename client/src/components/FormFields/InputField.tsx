import { Control, useController } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import { TextField } from "@mui/material";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    colorBorder?: "error" | "primary" | "secondary" | "info" | "success" | "warning";
    control: Control<any>;
    multiline?: boolean;
    rows?: number | string;
    className?: string;
}

export const InputField = ({
    name,
    label,
    control,
    colorBorder,
    multiline,
    rows = 1,
    className,
    ...inputProps
}: InputFieldProps) => {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <div>
            <TextField
                fullWidth
                margin="normal"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                label={label}
                variant="outlined"
                inputRef={ref}
                error={invalid}
                helperText={error?.message}
                inputProps={inputProps}
                color={colorBorder}
                multiline={multiline}
                rows={rows}
            />
        </div>
    );
};
