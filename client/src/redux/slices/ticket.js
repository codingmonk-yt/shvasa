import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
import { API_VERSION } from "../../config";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  tickets: [],
};

const slice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET TICKETS
    getTicketsSuccess(state, action) {
      state.isLoading = false;
      state.tickets = action.payload;
    },

    // CREATE TICKET
    createTicketSuccess(state, action) {
      const newTicket = action.payload;
      state.isLoading = false;
      state.tickets = [...state.tickets, newTicket];
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getTicketsSuccess, createTicketSuccess, hasError, startLoading } =
  slice.actions;

// ----------------------------------------------------------------------

export function getTickets(text) {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`/api/${API_VERSION}/tickets/?text=${text}`);
        dispatch(getTicketsSuccess(response.data.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createTicket(newTicket) {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      dispatch(createTicketSuccess(newTicket));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}
