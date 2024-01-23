import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices

import agentReducer from "./slices/agent";
import ticketReducer from "./slices/ticket";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
  agent: agentReducer,
  ticket: ticketReducer,
});

export { rootPersistConfig, rootReducer };
