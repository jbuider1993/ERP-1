import React, { Component } from 'react';
import { Button } from 'antd';
import 'remixicon/fonts/remixicon.css';

const UserToolsBar = (props) => {

  const { addSave, batchDelete } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  return (
    <div style={{marginBottom: "15px", marginTop: "15px"}}>
      <Button type="primary" size="default" icon={<i className="ri-add-line" style={iconStyle}></i>} onClick={addSave}>新增</Button>
      <Button type="dashed" danger size="default" icon={<i className="ri-delete-bin-line" style={iconStyle}></i>} style={{ marginLeft: "15px", color: "red" }} onClick={batchDelete}>删除</Button>
    </div>
  );
};

export default UserToolsBar;
