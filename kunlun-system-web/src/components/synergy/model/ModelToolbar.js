import React, { Component } from 'react';
import { Button } from 'antd';
import 'remixicon/fonts/remixicon.css';

const ModelToolbar = (props) => {

  const { addSave, onDeploy, onDelete, onExport, onImport } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  return (
    <div style={{marginTop: "15px"}}>
      <Button type="primary" size="default" icon={<i className="ri-add-line" style={iconStyle}></i>} onClick={() => addSave()}>新增</Button>
      <Button type="danger" size="default" icon={<i className="ri-play-circle-line" style={iconStyle}></i>} style={{ marginLeft: "15px" }} onClick={() => onDeploy()}>部署</Button>
      <Button type="dashed" danger size="default" icon={<i className="ri-delete-bin-line" style={iconStyle}></i>} style={{ marginLeft: "15px", color: "red" }} onClick={() => onDelete()}>删除</Button>
      <Button type="default" size="default" icon={<i className="ri-download-2-line" style={iconStyle}></i>} style={{ marginLeft: "15px" }} onClick={() => onExport()}>导出</Button>
      <Button type="default" size="default" icon={<i className="ri-upload-2-line" style={iconStyle}></i>} style={{ marginLeft: "15px" }} onClick={() => onImport()}>导入</Button>
    </div>
  );
};

export default ModelToolbar;
