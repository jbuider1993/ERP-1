import React from 'react';
import { Button, Menu, Dropdown } from 'antd';
import 'remixicon/fonts/remixicon.css';

const MenuItem = Menu.Item;

const MessageToolBar = (props) => {

  const { addMessage, deleteMessage } = props;

  const iconStyle = {
    verticalAlign: "bottom",
    marginRight: "5px",
  };

  const menuButton = (
    <Menu onClick={(e) => addMessage(e)}>
      <MenuItem key="1"><i className="ri-notification-3-line" style={iconStyle}></i>通知</MenuItem>
      <MenuItem key="2"><i className="ri-wechat-2-line" style={iconStyle}></i>消息</MenuItem>
    </Menu>
  );

  return (
    <div style={{marginTop: "15px"}}>
      <Dropdown overlay={menuButton}>
        <Button type={"primary"} icon={<i className="ri-add-line" style={iconStyle}/>}>新增<i className="ri-arrow-down-s-line" style={{verticalAlign: "bottom", marginLeft: "5px"}}></i></Button>
      </Dropdown>
      <Button type="dashed" danger style={{ marginLeft: "15px", color: "red" }} icon={<i className="ri-delete-bin-line" style={iconStyle}></i>} onClick={deleteMessage}>删除</Button>
    </div>
  );
};

export default MessageToolBar;
