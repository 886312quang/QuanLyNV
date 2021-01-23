import { MENU_HIDE, MENU_SHOW, MENU_TOGGLE } from "../constants/layout";
import { getHistory } from "../configs/configureStore";

const actions = {
  doToggleMenu: () => {
    return {
      type: MENU_TOGGLE,
    };
  },

  doShowMenu: () => {
    return {
      type: MENU_SHOW,
    };
  },

  doHideMenu: () => {
    return {
      type: MENU_HIDE,
    };
  },

  doSignOut: () => {
    window.localStorage.removeItem("ssauth");
    getHistory().push("/signin");
  },
};
export default actions;
