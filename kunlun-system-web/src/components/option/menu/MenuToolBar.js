import React from 'react';
import { Button, Icon } from 'antd';

const MenuToolBar = (props) => {

  const { addMenu, unfoldCollapse } = props;

  return (
    <div style={{ marginBottom: "15px", marginTop: "15px"}}>
      <Button type={"primary"} onClick={addMenu} icon="plus">新增</Button>
      <Button style={{ marginLeft: "10px" }} onClick={unfoldCollapse} icon={"pic-center"}>展开/折叠</Button>
    </div>
  );
};

export default MenuToolBar;
