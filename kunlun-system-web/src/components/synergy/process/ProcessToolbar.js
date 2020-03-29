import React, { Component } from 'react';
import { Button } from 'antd';

const UserToolsBar = (props) => {

  const { onSubmit, onAudit, onAbolish } = props;

  return (
    <div>
      <Button type="primary" size="default" icon="plus" onClick={() => onSubmit()}>提交</Button>
      <Button type="danger" size="default" icon="play-circle" style={{ marginLeft: "15px" }} onClick={() => onAudit()}>审核</Button>
      <Button type="dashed" size="default" icon="rest" style={{ marginLeft: "15px" }} onClick={() => onAbolish()}>废止</Button>
    </div>
  );
};

export default UserToolsBar;
