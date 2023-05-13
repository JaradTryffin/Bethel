import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BasicSelectProps } from "@/types/member.type";
import { useState } from "react";

export default function BasicSelect(props: BasicSelectProps) {
  const { label, options, value, onChange, width, register, errors, name } =
    props;

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        variant="filled"
        sx={width ? { width: width } : { width: 250 }}
      >
        <InputLabel variant="filled" id="demo-simple-select-label">
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value.toString()}
          label={label}
          {...register}
          error={errors && errors[`${name}`] && true}
          onChange={onChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
