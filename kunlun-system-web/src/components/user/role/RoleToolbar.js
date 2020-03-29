import React, { Component } from 'react';
import { Button } from 'antd';

const UserToolsBar = (props) => {

  const { addSave, batchDelete } = props;

  return (
    <div style={{marginBottom: "15px"}}>
      <Button type="primary" size="default" icon="plus" onClick={addSave}>新  增</Button>
      <Button type="default" size="default" icon="delete" style={{ marginLeft: "10px" }} onClick={batchDelete}>批量删除</Button>
    </div>
  );
};

export default UserToolsBar;
