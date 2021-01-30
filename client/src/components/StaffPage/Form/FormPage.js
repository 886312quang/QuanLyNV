import React from "react";
import Layout from "../../Layout";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import Breadcrumb from "../../shared/Breadcrumb";
import PageTitle from "../../shared/styles/PageTitle";
import FormComp from "./FormComp";

const FormPage = ({ match }) => {
  let isEditing = () => {
    return !!match.params.id;
  };

  let title = () => {
    return isEditing() ? "Chỉnh sửa nhân viên" : "Thêm mới nhân viên";
  };

  return (
    <React.Fragment>
      <Breadcrumb
        items={[["Trang chủ", "/"], ["Nhân viên", "/staff"], [title()]]}
      />

      <ContentWrapper>
        <PageTitle>{title()}</PageTitle>

        <FormComp match={match} />
      </ContentWrapper>
    </React.Fragment>
  );
};

export default Layout(FormPage);
