import React from 'react';
import { Button, Icon } from 'antd';

const MachineToolBar = (props) => {

  const { addMachine, downloadTemplate, onImport } = props;

  return (
    <div style={{ marginBottom: "9px", marginTop: "15px" }}>
      <Button type={"primary"} onClick={addMachine} icon={"plus"}>新增</Button>
      <Button style={{ marginLeft: "10px" }} onClick={downloadTemplate} icon={"download"}>下载模板</Button>
      <Button style={{ marginLeft: "10px" }} onClick={onImport} icon={"import"}>导入</Button>
    </div>
  );
};

export default MachineToolBar;
