import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
import { API_VERSION } from "../../config";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  agents: [],
};

const slice = createSlice({
  name: "agent",
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

    // GET AGENTS
    getAgentsSuccess(state, action) {
      state.isLoading = false;
      state.agents = action.payload;
    },

    // CREATE AGENT
    createAgentSuccess(state, action) {
      const newAgent = action.payload;
      state.isLoading = false;
      state.agents = [...state.agents, newAgent];
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getAgentsSuccess, createAgentSuccess, hasError, startLoading } =
  slice.actions;

// ----------------------------------------------------------------------

export function getAgents(text) {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`/api/${API_VERSION}/agents/?text=${text}`);
        dispatch(getAgentsSuccess(response.data.data.agents));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createAgent(newAgent) {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      dispatch(createAgentSuccess(newAgent));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}
