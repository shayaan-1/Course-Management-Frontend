import React from 'react';
import { Table } from 'antd';

const DataTable = ({ columns, dataSource, loading }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey="id"
    />
  );
};

export default DataTable;
