import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import branch from "./branch";
import layout from "./layout";
import note from "./note";
import service from "./service";
import signin from "./signin";
import staff from "./staff";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    signin,
    layout,
    branch,
    staff,
    service,
    note,
  });
