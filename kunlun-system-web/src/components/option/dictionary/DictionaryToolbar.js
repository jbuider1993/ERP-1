import React, { Component } from 'react';
import { Button } from 'antd';
import 'remixicon/fonts/remixicon.css';

const DictionaryToolsBar = (props) => {

  const { addSave, batchDelete, onExport } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  return (
    <div style={{marginTop: "15px"}}>
      <Button type="primary" size="default" icon={<i className="ri-add-line" style={iconStyle}></i>} onClick={addSave}>新增</Button>
      <Button type="default" size="default" icon={<i className="ri-delete-bin-line" style={iconStyle}></i>} style={{ marginLeft: "15px" }} onClick={batchDelete}>删除</Button>
      <Button type="defalue" size="default" style={{marginLeft: "15px"}} icon={<i className="ri-download-2-line" style={iconStyle}></i>} onClick={() => onExport()}>导出</Button>
    </div>
  );
};

export default DictionaryToolsBar;
