import React from "react";
import { Table } from "antd";
function ControlTable(props) {
  const { columns, data, className,paginationProps } = props;
  return (
    <Table
      rowKey={record => record.id}
      columns={columns}
      dataSource={data}
      className={className}
      pagination={paginationProps}
    />
  );
}

export default ControlTable;
