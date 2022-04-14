import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import thunkMiddleware from "redux-thunk";
import loggingMiddleware from "redux-logger";

import asteroidsReducer from "./asteroids";

const reducer = combineReducers({
  asteroids: asteroidsReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware.withExtraArgument({ axios }),
      loggingMiddleware
    )
  )
);

export default store;
