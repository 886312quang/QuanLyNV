import { Typography } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Layout from "../../Layout";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import Breadcrumb from "../../shared/Breadcrumb";
import PageTitle from "../../shared/styles/PageTitle";
import shiftActions from "../../../_actions/shift";
import shiftSelectors from "../../../_selectors/shift";
import staffActions from "../../../_actions/staff";
import actions from "../../../_actions/ledger";
import ListForm from "./ListForm";
import ListTable from "./ListTable";
import ListToolbar from "./ListToolbar";
const { Text } = Typography;

const ListPage = ({ match }) => {
  const dispatch = useDispatch();
  const shiftRecord = useSelector(shiftSelectors.selectRecord);

  useEffect(() => {
    dispatch(actions.list(match.params.id));
    dispatch(shiftActions.doFind(match.params.id));
    dispatch(staffActions.list());
  }, []);

  const descriptionTitle = (label, content) => {
    return (
      <Text style={{ fontSize: "14px", margin: "0px 5px" }}>
        {label}: <Text strong>{content}</Text>
      </Text>
    );
  };

  if (!match.params.id) {
    return <Redirect to="/shift" />;
  }
  return (
    <React.Fragment>
      <Breadcrumb items={[["Trang chủ", "/"], ["Ca", "/shift"], ["Tua"]]} />

      <ContentWrapper>
        <PageTitle>
          Tua {"  "}
          {shiftRecord &&
            descriptionTitle("Chi nhánh", shiftRecord.branch.name)}
          {shiftRecord &&
            descriptionTitle(
              "Thời gian",
              moment(shiftRecord.date).format("YYYY-MM-DD"),
            )}
        </PageTitle>

        <ListToolbar />
        {shiftRecord && !shiftRecord.lock && (
          <>
            <ListForm />
          </>
        )}

        <ListTable />
      </ContentWrapper>
    </React.Fragment>
  );
};

export default Layout(ListPage);
