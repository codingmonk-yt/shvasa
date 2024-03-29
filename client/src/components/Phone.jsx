import { TextField } from "@mui/material";
import { forwardRef } from "react";

const PhoneInput = forwardRef((props, ref) => (
  <TextField
    {...props}
    inputRef={ref}
    fullWidth
    variant="outlined"
    name="phone"
  />
));

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
