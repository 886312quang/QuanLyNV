import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../routes/CustomLoader/Spinner";
import ViewWrapper from "../../shared/styles/ViewWrapper";
import TextViewItem from "../../shared/view/TextViewItem";
import selectors from "../../../_selectors/branch";

const View = () => {
  //Selectors
  const findLoading = useSelector(selectors.selectFindLoading);
  const record = useSelector(selectors.selectRecord);
  
  let renderView = () => {
    return (
      <ViewWrapper>
        <TextViewItem label={"ID"} value={record.id} />

        <TextViewItem label={"Tên chi nhánh"} value={record.name} />
      </ViewWrapper>
    );
  };

  if (findLoading || !record) {
    return <Spinner />;
  }

  return renderView();
};

export default View;
