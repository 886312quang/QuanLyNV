import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../Layout";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import Breadcrumb from "../../shared/Breadcrumb";
import PageTitle from "../../shared/styles/PageTitle";
import actions from "../../../_actions/user";
import ListTable from "./ListTable";
import ListToolbar from "./ListToolbar";

const ListPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.list());
  }, []);
  return (
    <React.Fragment>
      <Breadcrumb items={[["Trang chủ", "/"], ["Người dùng"]]} />

      <ContentWrapper>
        <PageTitle>Người dùng</PageTitle>
        <ListToolbar />
        <ListTable />
      </ContentWrapper>
    </React.Fragment>
  );
};

export default Layout(ListPage);
