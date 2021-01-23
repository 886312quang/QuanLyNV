import {
  SIGNIN_START,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  ERROR_MESSAGE_CLEAR,
} from "../constants/signin";
import produce from "immer";

const initialState = {
  initLoading: true,
  loading: false,
  error: null,
};

const signinReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case ERROR_MESSAGE_CLEAR:
        draft.error = null;
        break;
      case SIGNIN_START:
        draft.loading = true;
        draft.error = null;
        break;
      case SIGNIN_SUCCESS:
        draft.loading = false;
        draft.error = false;
        break;
      case SIGNIN_ERROR:
        draft.loading = false;

        break;
      default:
        break;
    }
  });

export default signinReducer;
