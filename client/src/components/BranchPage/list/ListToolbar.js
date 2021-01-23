import { Button, Popconfirm, Tooltip } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import actions from "../../../_actions/branch";
import selectors from "../../../_selectors/branch";
import Toolbar from "../../shared/styles/Toolbar";

const ListToolbar = () => {
  // Selectors
  const destroyLoading = useSelector(selectors.selectDestroyLoading);
  const dataLoading = useSelector(selectors.selectDataLoading);
  const exportLoading = useSelector(selectors.selectExportLoading);
  const selectedRowKeys = useSelector(selectors.selectSelectedRowKeys);
  const branchs = useSelector(selectors.selectBranchs);

  const dispatch = useDispatch();

  let doExport = () => {
    dispatch(actions.doExport(branchs));
  };

  let doDestroyAllSelected = () => {
    dispatch(actions.doDestroyAll(selectedRowKeys));
  };

  let renderExportButton = () => {
    const disabled = !branchs || dataLoading;

    const button = (
      <Button
        disabled={disabled}
        icon="file-excel"
        onClick={doExport}
        loading={exportLoading}
      >
        Export to Excel
      </Button>
    );

    if (disabled) {
      return <Tooltip title="Không có dữ liệu">{button}</Tooltip>;
    }

    return button;
  };

  let renderDestroyButton = () => {
    const disabled =
      (selectedRowKeys && !selectedRowKeys.length) || dataLoading;

    const button = (
      <Button
        disabled={disabled}
        loading={destroyLoading}
        type="primary"
        icon="delete"
      >
        Xóa
      </Button>
    );

    const buttonWithConfirm = (
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa?"
        onConfirm={() => doDestroyAllSelected()}
        okText="Chắc chắn"
        cancelText="Hủy"
      >
        {button}
      </Popconfirm>
    );

    if (disabled) {
      return (
        <Tooltip title="Vui lòng chọn những trường muốn xóa">{button}</Tooltip>
      );
    }

    return buttonWithConfirm;
  };

  const onReload = () => {
    dispatch(actions.list());
  };

  return (
    <Toolbar>
      <Link to="/branch/new">
        <Button type="primary" icon="plus">
          Tạo
        </Button>
      </Link>

      {renderDestroyButton()}

      <Button type="primary" onClick={() => onReload()} icon="reload">
        Tải lại
      </Button>

      {renderExportButton()}
    </Toolbar>
  );
};

export default ListToolbar;
