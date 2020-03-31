import React, { Component } from 'react';
import { Button } from 'antd';

const ModelToolbar = (props) => {

  const { addSave, onDeploy, onDelete, onExport, onImport } = props;

  return (
    <div style={{marginTop: "15px"}}>
      <Button type="primary" size="default" icon="plus" onClick={() => addSave()}>新增</Button>
      <Button type="danger" size="default" icon="play-circle" style={{ marginLeft: "15px" }} onClick={() => onDeploy()}>部署</Button>
      <Button type="dashed" size="default" icon="delete" style={{ marginLeft: "15px" }} onClick={() => onDelete()}>删除</Button>
      <Button type="default" size="default" icon="export" style={{ marginLeft: "15px" }} onClick={() => onExport()}>导出</Button>
      <Button type="default" size="default" icon="import" style={{ marginLeft: "15px" }} onClick={() => onImport()}>导入</Button>
    </div>
  );
};

export default ModelToolbar;
