import React from 'react';
import { Button, Icon } from 'antd';
import 'remixicon/fonts/remixicon.css';

const IconToolBar = (props) => {

  const { fetchIcons } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  return (
    <div style={{ marginBottom: "15px", marginTop: "15px"}}>
      <Button type={"primary"} onClick={fetchIcons} icon={<i className="ri-gradienter-line" style={iconStyle}></i>}>抓取</Button>
    </div>
  );
};

export default IconToolBar;
