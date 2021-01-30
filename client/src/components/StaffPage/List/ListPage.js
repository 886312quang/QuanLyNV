import React, { useEffect } from "react";
import ListToolbar from "./ListToolbar";
import Layout from "../../../components/Layout";
import ContentWrapper from "../../../components/Layout/styles/ContentWrapper";
import PageTitle from "../../../components/shared/styles/PageTitle";
import Breadcrumb from "../../../components/shared/Breadcrumb";
import { useDispatch } from "react-redux";
import actions from "../../../_actions/staff";
import ListTable from "./ListTable";

const ListPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.list());
  }, []);
  return (
    <React.Fragment>
      <Breadcrumb items={[["Trang chủ", "/"], ["Nhân viên"]]} />

      <ContentWrapper>
        <PageTitle>Nhân viên</PageTitle>

        <ListToolbar />
        <ListTable />
      </ContentWrapper>
    </React.Fragment>
  );
};

export default Layout(ListPage);
