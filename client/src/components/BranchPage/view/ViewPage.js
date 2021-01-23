import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../Layout";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import Breadcrumb from "../../shared/Breadcrumb";
import PageTitle from "../../shared/styles/PageTitle";
import actions from "../../../_actions/branch";
import View from "./View";
import ViewToolbar from "./ViewToolbar";

const ViewPage = ({ match }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, []);

  return (
    <React.Fragment>
      <Breadcrumb
        items={[["Trang chủ", "/"], ["Chi nhánh", "/branch"], ["Thông tin"]]}
      />

      <ContentWrapper>
        <PageTitle>Thông tin chi nhánh</PageTitle>

        <ViewToolbar match={match} />

        <View />
      </ContentWrapper>
    </React.Fragment>
  );
};
export default Layout(ViewPage);
