import React from "react";
import Layout from "../../Layout/index";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import PageTitle from "../../shared/styles/PageTitle";
import Breadcrumb from "../../shared/Breadcrumb";
import FormComp from "./FormComp";

const FormPage = ({ match }) => {
  let isEditing = () => {
    return !!match.params.id;
  };

  let title = () => {
    return isEditing() ? "Chỉnh sửa chi nhánh" : "Thêm mới chi nhánh";
  };

  return (
    <React.Fragment>
      <Breadcrumb
        items={[["Trang chủ", "/"], ["Chi nhánh", "/branch"], [title()]]}
      />

      <ContentWrapper>
        <PageTitle>{title()}</PageTitle>

        <FormComp match={match} />
      </ContentWrapper>
    </React.Fragment>
  );
};

export default Layout(FormPage);
