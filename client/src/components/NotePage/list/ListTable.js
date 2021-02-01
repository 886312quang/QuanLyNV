import { Popconfirm, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonLink from "../../shared/styles/ButtonLink";
import TableWrapper from "../../shared/styles/TableWrapper";
import actions from "../../../_actions/note";
import selectors from "../../../_selectors/note";

const ListTable = () => {
  const dispatch = useDispatch();
  // Selector
  const selectedRowKeys = useSelector(selectors.selectSelectedRowKeys);
  const branchs = useSelector(selectors.selectBranchs);

  let doDestroy = (id) => {
    dispatch(actions.doDestroy(id));
  };

  let columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "",
      dataIndex: "",
      width: "160px",
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/branch/${record.id}/view`}>Xem</Link>
          <Link to={`/branch/${record.id}/edit`}>Sửa</Link>
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
        dataSource={branchs}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        bordered={true}
        pagination={{ pageSize: 4 }}
      />
    </TableWrapper>
  );
};

export default ListTable;
