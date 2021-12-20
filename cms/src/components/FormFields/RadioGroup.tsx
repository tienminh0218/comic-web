import React from "react";
import { Control, useController } from "react-hook-form";
import { FormControl, RadioGroup, Radio, FormLabel, FormControlLabel, FormHelperText } from "@mui/material";

export interface RadioOption {
    label: string;
    value: string | number;
}

interface RadioGroupFieldProps {
    name: string;
    label: string;
    control: Control<any>;
    disabled?: boolean;
    options: RadioOption[];
}

export const RadioGroupField = ({ name, control, label, disabled, options }: RadioGroupFieldProps) => {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <>
            <div>
                <FormControl disabled={disabled} margin="normal" component="fieldset" error={invalid}>
                    <FormLabel component="legend">{label}</FormLabel>

                    <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
                        {options.map((option, index) => {
                            return (
                                <FormControlLabel
                                    key={index}
                                    value={option.value}
                                    control={<Radio />}
                                    label="Female"
                                />
                            );
                        })}
                    </RadioGroup>

                    <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
            </div>
        </>
    );
};
