import {
  STAFF_CREATE_START,
  STAFF_CREATE_SUCCESS,
  STAFF_CREATE_ERROR,
  STAFF_GET_START,
  STAFF_GET_SUCCESS,
  STAFF_GET_ERROR,
  STAFF_UPDATE_START,
  STAFF_UPDATE_SUCCESS,
  STAFF_UPDATE_ERROR,
  STAFF_DESTROY_START,
  STAFF_DESTROY_SUCCESS,
  STAFF_DESTROY_ERROR,
  STAFF_FIND_START,
  STAFF_FIND_SUCCESS,
  STAFF_FIND_ERROR,
  STAFF_EXPORT_START,
  STAFF_EXPORT_SUCCESS,
  STAFF_EXPORT_ERROR,
  STAFF_ERROR_MESSAGE_CLEAR,
  STAFF_TABLE_ROW_SELECTION,
  STAFF_TABLE_ROW_CLICK,
} from "../constants/staff";
import { getHistory } from "../configs/configureStore";
import Message from "../routes/message/message";
import Errors from "../routes/error/errors";

import services from "../services/staff";
import { Excel } from "../components/shared/excel/excel";

const messageUpdateSuccess = "Cập nhật nhân viên thành công.";
const messageCreateSuccess = "Tạo nhân viên thành công.";
const messageDeleteSuccess = "Xóa nhân viên thành công.";

const excelHeaderSchema = [
  "ID",
  "NAME",
  "RUNAME",
  "CAREER",
  "BRANCHID",
  "BRANCHNAME",
];

const actions = {
  doClearErrorMessage: () => {
    return { type: STAFF_ERROR_MESSAGE_CLEAR };
  },

  list: (filter = {}) => async (dispatch) => {
    try {
      dispatch({ type: STAFF_GET_START });

      let response = await services.listFn(filter);

      dispatch({ type: STAFF_GET_SUCCESS, payload: response.data });
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: STAFF_GET_ERROR,
      });
    }
  },

  doExport: (data) => (dispatch) => {
    try {
      dispatch({ type: STAFF_EXPORT_START });

      let dataExcel = [];

      data.forEach((item) => {
        dataExcel.push({
          ID: item.id,
          NAME: item.name,
          RUNAME: item.runame,
          CAREER: item.career,
          BRANCHID: item.branch._id,
          BRANCHNAME: item.branch.name,
        });
      });

      console.log(dataExcel);

      Excel.exportAsExcelFile(dataExcel, excelHeaderSchema, "Staff");
      dispatch({ type: STAFF_EXPORT_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: STAFF_EXPORT_ERROR });
    }
  },

  doTableRowSelection: (selectedRowKeys, selectedRows) => (dispatch) => {
    dispatch({
      type: STAFF_TABLE_ROW_SELECTION,
      payload: { selectedRowKeys, selectedRows },
    });
  },

  doTableRowClick: (selectedRowKey, selectedRow) => (dispatch) => {
    dispatch({
      type: STAFF_TABLE_ROW_CLICK,
      payload: {
        selectedRowKey,
        selectedRow,
      },
    });
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: STAFF_FIND_START,
      });

      const response = await services.findFn(id);
      dispatch({
        type: STAFF_FIND_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: STAFF_FIND_ERROR,
      });
    }
  },

  doCreate: (data) => async (dispatch) => {
    try {
      dispatch({
        type: STAFF_CREATE_START,
      });

      await services.createFn(data);

      dispatch({
        type: STAFF_CREATE_SUCCESS,
      });
      Message.success(messageCreateSuccess);
    } catch (error) {
      dispatch({
        type: STAFF_CREATE_ERROR,
        payload: error,
      });

      console.log(error.errors);
      Errors.handle(error);
    }
  },

  doUpdate: (id, values) => async (dispatch) => {
    try {
      dispatch({
        type: STAFF_UPDATE_START,
      });

      await services.updateFn(id, values);

      dispatch({
        type: STAFF_UPDATE_SUCCESS,
      });

      Message.success(messageUpdateSuccess);

      getHistory().push("/staff");
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: STAFF_UPDATE_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    await ids.forEach(async (staffId) => {
      dispatch(actions.doDestroy(staffId));
    });
  },

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: STAFF_DESTROY_START,
      });

      await services.destroyFn(id);

      dispatch({
        type: STAFF_DESTROY_SUCCESS,
        payload: id,
      });
      Message.success(messageDeleteSuccess);
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: STAFF_DESTROY_ERROR,
      });
    }
  },
};
export default actions;
