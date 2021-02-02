import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../_actions/shift";
import selectors from "../../../_selectors/shift";
import Layout from "../../Layout";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import Breadcrumb from "../../shared/Breadcrumb";
import PageTitle from "../../shared/styles/PageTitle";
import ListFilter from "./ListFilter";
import ListTable from "./ListTable";
import ListToolbar from "./ListToolbar";

const ListPage = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectors.selectFilter);

  useEffect(() => {
    let options = {
      start: filter.date.startOf("month").format("x"),
      end: filter.date.endOf("month").format("x"),
    };
    if (filter && filter.branch) {
      options.branch = filter.branch;
    }
    dispatch(actions.list(options));
  }, []);
  return (
    <React.Fragment>
      <Breadcrumb items={[["Trang chủ", "/"], ["Ca"]]} />

      <ContentWrapper>
        <PageTitle>Ca</PageTitle>

        <ListToolbar />
        <ListFilter />
        <ListTable />
      </ContentWrapper>
    </React.Fragment>
  );
};

export default Layout(ListPage);
