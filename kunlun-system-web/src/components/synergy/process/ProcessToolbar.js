import React, { Component } from 'react';
import { Button } from 'antd';
import 'remixicon/fonts/remixicon.css';

const UserToolsBar = (props) => {

  const { onSubmit, onAudit, onAbolish } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  return (
    <div style={{marginTop: "15px"}}>
      <Button type="primary" size="default" icon={<i className="ri-save-line" style={iconStyle}></i>} onClick={() => onSubmit()}>提交</Button>
      <Button type="danger" size="default" icon={<i className="ri-pause-circle-line" style={iconStyle}></i>} style={{ marginLeft: "15px" }} onClick={() => onAudit()}>审核</Button>
      <Button type="dashed" size="default" icon={<i className="ri-delete-bin-line" style={iconStyle}></i>} style={{ marginLeft: "15px" }} onClick={() => onAbolish()}>废止</Button>
    </div>
  );
};

export default UserToolsBar;
