import React from 'react';
import { Button, Icon } from 'antd';
import 'remixicon/fonts/remixicon.css';

const IconToolBar = (props) => {

  const { fetchIcons, onExport } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  return (
    <div style={{ marginBottom: "15px", marginTop: "15px"}}>
      <Button type={"primary"} onClick={fetchIcons} icon={<i className="ri-gradienter-line" style={iconStyle}></i>}>抓取</Button>
      <Button onClick={onExport} icon={<i className="ri-download-2-line" style={iconStyle}></i>} style={{marginLeft: "15px", border: "1px solid #786CE7", color: "#786CE7"}}>导出</Button>
    </div>
  );
};

export default IconToolBar;
