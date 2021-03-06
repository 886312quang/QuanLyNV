import { Table } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TableWrapper from "../../shared/styles/TableWrapper";
import actions from "../../../_actions/report";
import selectors from "../../../_selectors/report";

const descriptionTitle = (label, content) => {
  return (
    <Text style={{ fontSize: "14px", margin: "0px 5px" }}>
      {label}: <Text strong>{content}</Text>
    </Text>
  );
};

const ListTable = () => {
  const dispatch = useDispatch();

  // Selector
  const selectedRowKeys = useSelector(selectors.selectSelectedRowKeys);
  const reports = useSelector(selectors.selectReports);
  console.log(reports)
  const sumCash = useSelector(selectors.selectSumCash);
  const sumCertificate = useSelector(selectors.selectSumCertificate);
  const sumCashSelectedRow = useSelector(selectors.selectSumCashSelectedRow);
  const sumCertificateSelectedRow = useSelector(
    selectors.selectSumCertificateSelectedRow,
  );

  let columns = [
    {
      title: "Nhân viên",
      dataIndex: "_id.name",
      key: "_id.name",
      sorter: (a, b) => {
        return a._id.name.localeCompare(b._id.name);
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "sum",
      sorter: (a, b) => {
        return a.cash + a.certificate - (b.cash + b.certificate);
      },
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
      render: (text, row, index) => row.cash + row.certificate,
    },
    {
      title: "Tiền mặt",
      dataIndex: "cash",
      key: "cash",
      sorter: (a, b) => a.cash - b.cash,
    },
    {
      title: "Certificate",
      dataIndex: "certificate",
      key: "certificate",
      sorter: (a, b) => a.certificate - b.certificate,
    },
    {
      title: "Thời gian",
      dataIndex: "duration",
      key: "duration",
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: "Tua",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys, _selectedRows) => {
      dispatch(actions.doTableRowSelection(_selectedRowKeys, _selectedRows));
    },
  };

  const handleRowClick = (record) => {
    dispatch(actions.doTableRowClick(record._id._id, record));
  };

  return (
    <TableWrapper>
      {sumCashSelectedRow || sumCertificateSelectedRow ? (
        <>
          {!!sumCashSelectedRow &&
            descriptionTitle("Tiền mặt", sumCashSelectedRow)}

          {!!sumCertificateSelectedRow &&
            descriptionTitle("Certificate", sumCertificateSelectedRow)}

          {!!sumCashSelectedRow &&
            !!sumCertificateSelectedRow &&
            descriptionTitle(
              "Tổng",
              sumCertificateSelectedRow + sumCashSelectedRow,
            )}
        </>
      ) : (
        <>
          {descriptionTitle("Tiền mặt", sumCash)}
          {descriptionTitle("Certificate", sumCertificate)}
        </>
      )}
      <Table
        rowKey={(record) => record._id._id}
        loading={useSelector(selectors.selectDataLoading)}
        columns={columns}
        dataSource={reports}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        // footer={()=>reports.length + ' chi nhánh'}
        bordered={true}
        pagination={{ pageSize: 4 }}
      />
    </TableWrapper>
  );
};

export default ListTable;
