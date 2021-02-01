import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import branchActions from "../../../_actions/branch";
import Layout from "../../Layout";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import Breadcrumb from "../../shared/Breadcrumb";
import PageTitle from "../../shared/styles/PageTitle";
import actions from "../../../_actions/service";
import FormComp from "./FormComp";

const FormPage = ({ match }) => {
  let isEditing = () => {
    return !!match.params.id;
  };
  const dispatch = useDispatch();

  let title = () => {
    return isEditing() ? "Chỉnh sửa dịch vụ" : "Thêm mới dịch vụ";
  };

  useEffect(() => {
    dispatch(branchActions.list());
    if (isEditing()) {
      dispatch(actions.doFind(match.params.id));
    }
  }, []);

  return (
    <React.Fragment>
      <Breadcrumb
        items={[["Trang chủ", "/"], ["Dịch vụ", "/service"], [title()]]}
      />

      <ContentWrapper>
        <PageTitle>{title()}</PageTitle>

        <FormComp match={match} />
      </ContentWrapper>
    </React.Fragment>
  );
};

export default Layout(FormPage);
