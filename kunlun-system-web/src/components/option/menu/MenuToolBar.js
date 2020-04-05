import React from 'react';
import { Button, Icon } from 'antd';
import 'remixicon/fonts/remixicon.css';

const MenuToolBar = (props) => {

  const { addMenu, unfoldCollapse } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  return (
    <div style={{ marginBottom: "15px", marginTop: "15px"}}>
      <Button type={"primary"} onClick={addMenu} icon={<i className="ri-add-line" style={iconStyle}></i>}>新增</Button>
      <Button style={{ marginLeft: "15px" }} onClick={unfoldCollapse}>
        <i className={unfoldCollapse ? "ri-add-box-line" : "ri-checkbox-indeterminate-line"} style={iconStyle}></i>展开/折叠
      </Button>
    </div>
  );
};

export default MenuToolBar;
