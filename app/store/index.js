import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import thunkMiddleware from "redux-thunk";
import loggingMiddleware from "redux-logger";

import asteroidsReducer from "./asteroids";
import singleAsteroidReducer from "./singleAsteroid";
import dateReducer from "./date";
import { animationReducer } from "./controls";

const reducer = combineReducers({
  date: dateReducer,
  asteroids: asteroidsReducer,
  singleAsteroid: singleAsteroidReducer,
  paused: animationReducer,
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
