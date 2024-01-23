/* eslint-disable react-hooks/exhaustive-deps */
// Prop Types
import PropTypes from "prop-types";
//form
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
//Components
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "../../components/hook-form";
//Phone Input
import "react-phone-number-input/style.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAgents } from "../../redux/slices/agent";

// util
import axios from "../../utils/axios";
import { useSnackbar } from "notistack";
import { API_VERSION } from "../../config";
import { createTicket } from "../../redux/slices/ticket";

const SEVERITY_OPTIONS = [
  {
    label: "Critical",
    value: "CRITICAL",
  },
  {
    label: "High",
    value: "HIGH",
  },
  {
    label: "Medium",
    value: "MEDIUM",
  },
  {
    label: "Low",
    value: "LOW",
  },
];

const TYPE_OPTIONS = [
  {
    label: "Bug",
    value: "BUG",
  },
  {
    label: "Feature Request",
    value: "FEATURE REQUEST",
  },
  {
    label: "User Assistance",
    value: "USER ASSISTANCE",
  },
  {
    label: "Infrastructure",
    value: "INFRASTRUCTURE",
  },
  {
    label: "Security",
    value: "SECURITY",
  },
];

const STATUS_OPTIONS = [
  {
    label: "New",
    value: "NEW",
  },
  {
    label: "Assigned",
    value: "ASSIGNED",
  },
  {
    label: "Resolved",
    value: "RESOLVED",
  },
];

// @mui
const AddAgent = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { agents } = useSelector((state) => state.agent);

  const AGENT_OPTIONS = agents.map((el) => ({
    label: el.name,
    value: el._id,
  }));

  useEffect(() => {
    dispatch(getAgents(""));
  }, []);

  const NewTicketSchema = Yup.object().shape({
    topic: Yup.string().required("Topic is required"),
    description: Yup.string().required("Description is required"),
    dateCreated: Yup.string().required("Date created is required"),
    severity: Yup.string().required("Severity is required"),
    type: Yup.string().required("Type is required"),
    status: Yup.string().required("Status is required"),
    assignedTo: Yup.string().nullable(),
    resolvedOn: Yup.string().required("Resolution Date is required"),
  });

  const defaultValues = {
    topic: "",
    description: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewTicketSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(`/api/${API_VERSION}/tickets`, data);
      reset();
      enqueueSnackbar(response.data.message);
      dispatch(createTicket(response.data.data));
      handleClose();
    } catch (error) {
      //
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
            Add Ticket
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <RHFTextField name="topic" label="Topic" />
            <RHFTextField
              name="description"
              label="Description"
              multiline
              rows={3}
            />
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <Controller
                name="dateCreated"
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <Stack spacing={0.5}>
                    <DesktopDatePicker
                      {...field}
                      label="Date Created"
                      error={!!error}
                      helperText={error ? error?.message : ""}
                    />
                    {!!error && (
                      <Typography variant="caption" color="error">
                        {error ? error?.message : ""}
                      </Typography>
                    )}
                  </Stack>
                )}
              />
              <RHFSelect
                name="severity"
                label="Severity"
                placeholder="Severity"
              >
                <option value="" />
                {SEVERITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="type" label="Type" placeholder="Type">
                <option value="" />
                {TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                name="assignedTo"
                label="Assigned To"
                placeholder="Assigned To"
              >
                <option value="" />
                {AGENT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="status" label="Status" placeholder="Status">
                <option value="" />
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <Controller
                name="resolvedOn"
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <Stack spacing={0.5}>
                    <DesktopDatePicker
                      {...field}
                      label="Resolved On"
                      error={!!error}
                      helperText={error ? error?.message : ""}
                    />
                    {!!error && (
                      <Typography variant="caption" color="error">
                        {error ? error?.message : ""}
                      </Typography>
                    )}
                  </Stack>
                )}
              />
            </Box>
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
