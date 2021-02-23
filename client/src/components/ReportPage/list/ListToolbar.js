import { Button, Tooltip } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "../../shared/styles/Toolbar";
import actions from "../../../_actions/report";
import selectors from "../../../_selectors/report";

const ListToolbar = () => {
  const dataLoading = useSelector(selectors.selectDataLoading);
  const exportLoading = useSelector(selectors.selectExportLoading);
  const reports = useSelector(selectors.selectReports);

  const dispatch = useDispatch();
  let doExport = () => {
    dispatch(actions.doExport(reports));
  };

  let renderExportButton = () => {
    const disabled = !reports || dataLoading;

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

  return (
    <Toolbar>
      {/* <Link to="/report/new">
                <Button type="primary" icon="plus">
                    Tạo
                </Button>
            </Link> */}

      {renderExportButton()}
    </Toolbar>
  );
};

export default ListToolbar;
