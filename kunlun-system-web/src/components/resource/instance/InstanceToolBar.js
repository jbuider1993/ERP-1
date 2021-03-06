import React from 'react';
import { Button, Icon } from 'antd';

const InstanceToolBar = (props) => {

  const { addMachine, downloadTemplate, onImport } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  }

  return (
    <div style={{ marginBottom: "15px", marginTop: "15px" }}>
      <Button type="primary" size="default" icon={<i className="ri-save-3-line" style={iconStyle}></i>} onClick={addMachine}>新增</Button>
      <Button type="dashed" size="default" icon={<i className="ri-download-2-line" style={iconStyle}></i>} style={{ marginLeft: "15px" }} onClick={downloadTemplate}>下载模板</Button>
      <Button type="default" size="default" icon={<i className="ri-upload-2-line" style={iconStyle}></i>} style={{ marginLeft: "15px" }} onClick={onImport}>导入</Button>
    </div>
  );
};

export default InstanceToolBar;
