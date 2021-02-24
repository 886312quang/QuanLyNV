import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import TableWrapper from "../../shared/styles/TableWrapper";
import selectors from "../../../_selectors/ledgerPublic";

const ListTable = () => {
  const ledgers = useSelector(selectors.selectLedgers);

  let columns = [
    {
      title: "Dịch vụ",
      dataIndex: "vnname",
      key: "vnname",
      sorter: (a, b) => {
        return a.vnname.localeCompare(b.vnname);
      },
    },
    {
      title: "Nhân viên",
      dataIndex: "staff.name",
      key: "staff.name",
      sorter: (a, b) => {
        return a.staff.name.localeCompare(b.staff.name);
      },
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "ascend",
    },
    {
      title: "Tiền",
      dataIndex: "sum",
      key: "sum",
      render: (_, record) => record.cash + record.certificate,
      sorter: (a, b) => {
        return a.cash + a.certificate - (b.cash + b.certificate);
      },
    },
  ];

  return (
    <TableWrapper>
      <Table
        rowKey="_id"
        loading={useSelector(selectors.selectDataLoading)}
        columns={columns}
        dataSource={ledgers}
        bordered={true}
        pagination={{ pageSize: 4 }}
      />
    </TableWrapper>
  );
};

export default ListTable;
