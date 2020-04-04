import React from 'react';
import { Button, Icon, Menu, Dropdown } from 'antd';

const MenuItem = Menu.Item;

const MessageToolBar = (props) => {

  const { addMessage, deleteMessage } = props;

  const menuButton = (
    <Menu onClick={(e) => addMessage(e)}>
      <MenuItem key="1"><Icon type="notification" />通知</MenuItem>
      <MenuItem key="2"><Icon type="message" />消息</MenuItem>
    </Menu>
  );

  return (
    <div style={{marginTop: "15px"}}>
      <Dropdown overlay={menuButton}>
        <Button type={"primary"}>新增<Icon type="down" /></Button>
      </Dropdown>
      <Button style={{ marginLeft: "15px" }} icon="delete" onClick={deleteMessage}>删除</Button>
    </div>
  );
};

export default MessageToolBar;
