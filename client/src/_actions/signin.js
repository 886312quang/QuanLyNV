import {
  SIGNIN_ERROR,
  SIGNIN_START,
  SIGNIN_SUCCESS,
  ERROR_MESSAGE_CLEAR,
} from "../constants/signin";
import { getHistory } from "../configs/configureStore";
import { fetchSignin } from "../services/signin";
import Errors from "../routes/error/errors";

const actions = {
  doClearErrorMessage: () => {
    return { type: ERROR_MESSAGE_CLEAR };
  },

  doSignin: (username, password) => async (dispatch) => {
    try {
      dispatch({ type: SIGNIN_START });

      let response = await fetchSignin(username, password);

      window.localStorage.setItem("ssauth", JSON.stringify(response.data));
      dispatch({ type: SIGNIN_SUCCESS, payload: response.data });
      getHistory().push("/");
      
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: SIGNIN_ERROR,
      });
    }
  },
};
export default actions;
