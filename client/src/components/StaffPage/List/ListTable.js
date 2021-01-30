import { Popconfirm, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonLink from "../../../components/shared/styles/ButtonLink";
import TableWrapper from "../../../components/shared/styles/TableWrapper";
import actions from "../../../_actions/staff";
import selectors from "../../../_selectors/staff";

const ListTable = () => {
  const dispatch = useDispatch();
  //Selector
  const selectedRowKeys = useSelector(selectors.selectSelectedRowKeys);
  const staffs = useSelector(selectors.selectStaffs);

  let doDestroy = (id) => {
    dispatch(actions.doDestroy(id));
  };

  let columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: "Tên tiếng nga",
      dataIndex: "runame",
      key: "runame",
      sorter: (a, b) => {
        return a.runame.localeCompare(b.runame);
      },
    },
    {
      title: "Chức vụ",
      dataIndex: "career",
      key: "career",
      sorter: (a, b) => {
        return a.career.localeCompare(b.career);
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
          <Link to={`/staff/${record.id}/view`}>Xem</Link>
          <Link to={`/staff/${record.id}/edit`}>Sửa</Link>
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
        dataSource={staffs}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        footer={()=>staffs.length + ' nhân viên'}
        bordered={true}
        pagination={{ pageSize: 4 }}
      />
    </TableWrapper>
  );
};

export default ListTable;
