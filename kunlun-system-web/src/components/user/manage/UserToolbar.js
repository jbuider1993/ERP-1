import React, { Component } from 'react';
import { Button } from 'antd';

const UserToolsBar = (props) => {

  const { addSave, batchDelete, onExport } = props;

  return (
    <div style={{marginTop: "15px"}}>
      <Button type="primary" size="default" icon="plus" onClick={addSave}>新  增</Button>
      <Button type="default" size="default" icon="delete" style={{ marginLeft: "10px" }} onClick={batchDelete}>批量删除</Button>
      <Button type="defalue" size="default" style={{marginLeft: "15px"}} icon="export" onClick={() => onExport()}>导出</Button>
    </div>
  );
};

export default UserToolsBar;
