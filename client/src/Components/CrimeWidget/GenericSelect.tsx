import React from 'react';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import { SxProps, Theme } from '@mui/system';

export interface SelectOption {
    value: string | number;
    displayValue: string | number;
}

export interface GenericSelectProps<T> {
    title: string;
    value: T;
    handleSelect(event: SelectChangeEvent<T>): void;
    options: SelectOption[];
    sx?: SxProps<Theme>;
}

const GenericSelect = <T extends unknown>(props: GenericSelectProps<T>) => {
    const { title, value, handleSelect, options, sx = [] } = props;

    return (
        <FormControl required={value === undefined} fullWidth={false} size="small" sx={sx}>
            <InputLabel id="selectLabel">{title}</InputLabel>
            <Select
                labelId="selectLabel"
                id="select"
                value={value}
                onChange={(event) => handleSelect(event)}
            >
                {options.map((option: SelectOption) => (
                    <MenuItem value={option.value}>{option.displayValue}</MenuItem>
                ))}
            </Select>
            {value === undefined ? <FormHelperText>Required</FormHelperText> : <></>}
        </FormControl>
    );
};

export default GenericSelect;
