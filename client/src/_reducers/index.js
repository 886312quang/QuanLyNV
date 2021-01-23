import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import signin from "./signin";
import layout from "./layout";
import branch from "./branch";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    signin,
    layout,
    branch,
  });
