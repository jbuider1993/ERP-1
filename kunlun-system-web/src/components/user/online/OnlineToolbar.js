import React, { Component } from 'react';
import { Button } from 'antd';
import 'remixicon/fonts/remixicon.css';

const OnlineToolbar = (props) => {

  const { onExport } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  return (
    <div style={{marginBottom: "15px", marginTop: "15px"}}>
      <Button type="primary" size="default" icon={<i className="ri-download-2-line" style={iconStyle}></i>} onClick={() => onExport()}>导出</Button>
      <Button type="dashed" size="default" danger icon={<i className="ri-cloud-off-line" style={iconStyle}></i>} onClick={() => onExport()} style={{ marginLeft: "15px", color: "red" }}>强制下线</Button>
    </div>
  );
};

export default OnlineToolbar;
