import { MENU_HIDE, MENU_SHOW, MENU_TOGGLE } from "../constants/layout";
import produce from "immer";

const initialState = {
  menuVisible: true,
  loading: false,
};

const layoutReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case MENU_TOGGLE:
        draft.menuVisible = !state.menuVisible;
        break;
      case MENU_SHOW:
        draft.menuVisible = true;
        break;
      case MENU_HIDE:
        draft.menuVisible = false;
        break;
      default:
        draft.menuVisible = true;
        break;
    }
  });

export default layoutReducer;
