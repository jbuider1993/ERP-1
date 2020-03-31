import React from 'react';
import { Button, Icon } from 'antd';

const IconToolBar = (props) => {

  const { fetchIcons } = props;

  return (
    <div style={{ marginBottom: "15px", marginTop: "15px"}}>
      <Button type={"primary"} onClick={fetchIcons} icon={"sync"}>抓取</Button>
    </div>
  );
};

export default IconToolBar;
