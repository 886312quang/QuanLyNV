import { Button, Popconfirm } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Toolbar from "../../shared/styles/Toolbar";
import selectors from "../../../_selectors/ledger";
import actions from "../../../_actions/ledger";
import { useSelector, useDispatch } from "react-redux";

const ViewToolbar = ({ match }) => {
  const destroyLoading = useSelector(selectors.selectDestroyLoading);
  const dispatch = useDispatch();

  let id = () => {
    return match.params.id;
  };

  let doDestroy = () => {
    dispatch(actions.doDestroy(id()));
  };

  return (
    <Toolbar>
      <Link to={`/ledger/${id()}/edit`}>
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
    </Toolbar>
  );
};

export default ViewToolbar;
