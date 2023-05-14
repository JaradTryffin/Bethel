import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Register</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="true"
        name="radio-buttons-group"
      >
        <FormControlLabel value="true" control={<Radio />} label="Present" />
        <FormControlLabel value="false" control={<Radio />} label="Absent" />
      </RadioGroup>
    </FormControl>
  );
}
