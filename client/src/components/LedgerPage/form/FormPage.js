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
    return isEditing() ? "Chỉnh sửa Tua" : "Thêm mới Tua";
  };

  return (
    <React.Fragment>
      <Breadcrumb items={[["Trang chủ", "/"], ["Ca", "/shift"], [title()]]} />

      <ContentWrapper>
        <PageTitle>{title()}</PageTitle>

        <FormComp match={match} />
      </ContentWrapper>
    </React.Fragment>
  );
};

export default Layout(FormPage);
