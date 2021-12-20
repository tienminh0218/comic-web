import { Control, useController } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

interface SelectOption {
    label: string;
    value: string | number;
}

interface SelectFieldProps {
    label: string;
    name: string;
    control: Control<any>;
    disabled?: boolean;
    options: SelectOption[];
}

export const SelectField = ({ label, name, control, disabled, options }: SelectFieldProps) => {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <div className="mt-4">
            <FormControl fullWidth variant="outlined" disabled={disabled} error={invalid}>
                <InputLabel id={`${name}_label`}>{label}</InputLabel>
                <Select labelId={`${name}_label`} value={value} label={label} onChange={onChange} onBlur={onBlur}>
                    {options.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        </div>
    );
};
