import React, { Component } from 'react';
import { Button } from 'antd';

const OperatorLogToolbar = (props) => {

  const { onExport } = props;

  return (
    <div style={{marginBottom: "15px"}}>
      <Button type="primary" size="default" icon="export" onClick={() => onExport()}>导出</Button>
    </div>
  );
};

export default OperatorLogToolbar;
