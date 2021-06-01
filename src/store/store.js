import quoteReducer from "./reducers/quoteReducer";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";


const combineReducer = combineReducers({
  quoteReducer:quoteReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
