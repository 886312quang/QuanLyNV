import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../routes/CustomLoader/Spinner";
import ViewWrapper from "../../shared/styles/ViewWrapper";
import TextViewItem from "../../shared/view/TextViewItem";
import selectors from "../../../_selectors/service";

const View = () => {
  const findLoading = useSelector(selectors.selectFindLoading);
  const record = useSelector(selectors.selectRecord);
  let renderView = () => {
    return (
      <ViewWrapper>
        <TextViewItem label={"ID"} value={record.id} />
        <TextViewItem label={"Code dịch vụ"} value={record.code} />
        <TextViewItem label={"Tên dịch vụ"} value={record.name} />
        <TextViewItem label={"Chi nhánh"} value={record.branch.name} />
      </ViewWrapper>
    );
  };

  if (findLoading || !record) {
    return <Spinner />;
  }

  return renderView();
};

export default View;
