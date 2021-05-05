import React, { Component } from 'react';
import { Button } from 'antd';
import 'remixicon/fonts/remixicon.css';

const UserToolsBar = (props) => {

  const { onAuthorize, onAllot, radioValue } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  }

  let iconName = "", buttonName = "", buttonIcon = "";
  if ("role" == radioValue) {
    iconName = "ri-lock-2-line";
    buttonName = "菜单授权";
  } else if ("post" == radioValue) {
    iconName = "ri-user-follow-line";
    buttonName = "人员任命";
  } else {
    iconName = "ri-links-line";
    buttonName = "人员分配";
  }

  return (
    <div style={{marginTop: "15px"}}>
      <Button type="primary" size="default" icon={<i className={iconName} style={iconStyle}></i>} onClick={onAuthorize}>
        {buttonName}
      </Button>
      {
        "role" == radioValue && <Button style={{marginLeft: "15px", color: "#FE9400", border: "1px solid #FE9400"}} onClick={onAllot}>
          <i className={"ri-contacts-line"} style={iconStyle}></i>关联用户
        </Button>
      }
    </div>
  );
}

export default UserToolsBar;
