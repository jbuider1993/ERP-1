import React, { Component } from 'react';
import { Button } from 'antd';
import {PlusOutlined, DeleteOutlined, ExportOutlined} from '@ant-design/icons';

const UserToolsBar = (props) => {

  const { addSave, batchDelete, onExport } = props;

  return (
    <div style={{marginTop: "15px"}}>
      <Button type="primary" size="default" icon={<PlusOutlined />} onClick={addSave}>新增</Button>
      <Button type="default" size="default" icon={<DeleteOutlined />} style={{ marginLeft: "15px" }} onClick={batchDelete}>删除</Button>
      <Button type="defalue" size="default" style={{marginLeft: "15px"}} icon={<ExportOutlined />} onClick={() => onExport()}>导出</Button>
    </div>
  );
};

export default UserToolsBar;
