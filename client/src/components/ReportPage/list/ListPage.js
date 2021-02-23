import React from "react";
import Layout from "../../Layout";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import Breadcrumb from "../../shared/Breadcrumb";
import PageTitle from "../../shared/styles/PageTitle";
import ListFilter from "./ListFilter";
import ListTable from "./ListTable";
import ListToolbar from "./ListToolbar";

const ListPage = () => {
  return (
    <React.Fragment>
      <Breadcrumb items={[["Trang chủ", "/"], ["Báo cáo"]]} />

      <ContentWrapper>
        <PageTitle>Báo cáo</PageTitle>

        <ListToolbar />
        <ListFilter />
        <ListTable />
      </ContentWrapper>
    </React.Fragment>
  );
};

export default Layout(ListPage);
