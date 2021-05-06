import React, { Component } from 'react';
import { Button } from 'antd';
import 'remixicon/fonts/remixicon.css';

const UserToolsBar = (props) => {

  const { addSave, isCollapse, unfoldCollapse } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  }

  return (
    <div style={{marginTop: "15px"}}>
      <Button type="primary" size="default" icon={<i className="ri-add-line" style={iconStyle}></i>} onClick={addSave}>新增</Button>
      <Button style={{ marginLeft: "15px", color: "#FE9400", border: "1px solid #FE9400" }} onClick={unfoldCollapse}>
        <i className={isCollapse ? "ri-add-box-line" : "ri-checkbox-indeterminate-line"} style={iconStyle}></i>展开/折叠
      </Button>
    </div>
  );
};

export default UserToolsBar;
