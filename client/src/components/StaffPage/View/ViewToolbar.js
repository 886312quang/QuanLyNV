import { Button, Popconfirm } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Toolbar from "../../shared/styles/Toolbar";
import selectors from "../../../_selectors/staff";
import actions from "../../../_actions/staff";
import { useSelector, useDispatch } from "react-redux";
import { getHistory } from "../../../configs/configureStore";

const ViewToolbar = ({ match }) => {
  const destroyLoading = useSelector(selectors.selectDestroyLoading);
  const dispatch = useDispatch();

  let id = () => {
    return match.params.id;
  };

  let doDestroy = () => {
    dispatch(actions.doDestroy(id()));
  };

  const back = () => {
    return getHistory().push("/");
  };

  return (
    <Toolbar>
      <Link to={`/staff/${id()}/edit`}>
        <Button type="primary" icon="edit">
          Chỉnh sửa
        </Button>
      </Link>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa trường này"
        onConfirm={() => doDestroy()}
        okText="Chắc chắn"
        cancelText="Hủy"
      >
        <Button type="primary" icon="delete" disabled={destroyLoading}>
          Xóa
        </Button>
      </Popconfirm>
      <Button onClick={back}>Quay lại</Button>
    </Toolbar>
  );
};

export default ViewToolbar;
