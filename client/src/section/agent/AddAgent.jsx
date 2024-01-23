// Prop Types
import PropTypes from "prop-types";
//form
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
//Components
import Phone from "../../components/Phone";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { FormProvider, RHFTextField } from "../../components/hook-form";
//Phone Input
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch } from "react-redux";
import { createAgent } from "../../redux/slices/agent";
import { API_VERSION } from "../../config";

// util
import axios from "../../utils/axios";
import { useSnackbar } from "notistack";

const AddAgent = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const NewAgentSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    description: Yup.string()
      .min(10, "Min 10 characters")
      .max(50, "Max 50 characters")
      .required("Description is required"),
  });

  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    description: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewAgentSchema),
    defaultValues,
  });

  const {
    reset,
    // watch,
    control,
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`/api/${API_VERSION}/agents`, data);
      reset();
      enqueueSnackbar(response.data.message);
      dispatch(createAgent(response.data.data));
      handleClose();
    } catch (error) {
      console.error(error);

      if (error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
        enqueueSnackbar(errorMessage, { variant: "error" });
      } else if (error.request) {
        enqueueSnackbar("No response received from the server", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("An error occurred while processing the request", {
          variant: "error",
        });
      }
    }
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Add Agent
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <RHFTextField name="name" label="Name" />
            <RHFTextField name="email" label="Email" />
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                // @ts-ignore
                <PhoneInput
                  {...field}
                  placeholder="Phone Number"
                  inputComponent={Phone}
                  defaultCountry="IN"
                  error={!!error}
                  helperText={error ? error?.message : ""}
                />
              )}
            />
            <RHFTextField
              name="description"
              label="Description"
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            variant="contained"
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

AddAgent.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default AddAgent;
