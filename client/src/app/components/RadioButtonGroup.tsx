import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface Props {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}


export default function RadiButtonGroup({options, onChange,selectedValue }:Props) {
    return (
        <FormControl component='fieldset'>
            <RadioGroup onChange={onChange} value={selectedValue}>
                {options.map(({ value, label }) => (
                    <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
                ))}
            </RadioGroup>
        </FormControl>
    )
}