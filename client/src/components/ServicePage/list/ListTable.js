import { Popconfirm, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonLink from "../../shared/styles/ButtonLink";
import TableWrapper from "../../shared/styles/TableWrapper";
import actions from "../../../_actions/service";
import selectors from "../../../_selectors/service";

const ListTable = () => {
  const dispatch = useDispatch();
  // Selector
  const selectedRowKeys = useSelector(selectors.selectSelectedRowKeys);
  const services = useSelector(selectors.selectServices);

  let doDestroy = (id) => {
    dispatch(actions.doDestroy(id));
  };

  let columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => {
        return a.code.localeCompare(b.code);
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: "Chi nhánh",
      dataIndex: "branch.name",
      key: "branch.name",
      sorter: (a, b) => {
        return a.branch.name.localeCompare(b.branch.name);
      },
    },
    {
      title: "",
      dataIndex: "",
      width: "160px",
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/service/${record.id}/view`}>Xem</Link>
          <Link to={`/service/${record.id}/edit`}>Sửa</Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa trường này?"
            onConfirm={() => doDestroy(record.id)}
            okText="Chắc chắn"
            cancelText="Hủy"
          >
            <ButtonLink>Xóa</ButtonLink>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys, _selectedRows) => {
      dispatch(actions.doTableRowSelection(_selectedRowKeys, _selectedRows));
    },
  };

  const handleRowClick = (record) => {
    dispatch(actions.doTableRowClick(record.id, record));
  };

  return (
    <TableWrapper>
      <Table
        rowKey="id"
        loading={useSelector(selectors.selectDataLoading)}
        columns={columns}
        dataSource={services}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        footer={() => services.length + " dịch vụ"}
        bordered={true}
        pagination={{ pageSize: 4 }}
      />
    </TableWrapper>
  );
};

export default ListTable;
