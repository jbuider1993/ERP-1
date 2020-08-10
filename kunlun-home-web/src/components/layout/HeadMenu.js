import React from 'react';
import {Layout, Menu, Dropdown, Avatar, Divider, Tooltip, Badge} from 'antd';
import styles from './Menu.less';
import config from "../../config/config";
import NoficationPane from '../nofication/NoficationPane';
import 'remixicon/fonts/remixicon.css';
import moment from 'moment';

const { Header } = Layout;
const MenuItem = Menu.Item;
const { SubMenu } = Menu;

/**
 * 顶部主菜单及其内容
 */
class HeadMenu extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {

    const { collapsed, activeHeadMenuKey, toggleSiderMenu, activeSideMenuKey, onSelectHeadMenu, menuData, noficationList, messageList, onSelectSideMenu,
      todoList, onShowUserInfo, onLogout, tokenModel, onSystemInfo, onTheme, themeStyle, themeColor, badgeCount, clearPane, onDetail } = this.props;

    const iconStyle = {
      paddingRight: "5px",
      fontSize: "16px",
      verticalAlign: "sub",
    };

    // 主菜单项
    const main = menuData.main;
    const initMainMenu = main.map(item =>
      <MenuItem key={item.key} path={item.url}>
        <i className={item.icon} style={iconStyle} />{item.name}
      </MenuItem>);

    // 子菜单项
    const sider = menuData.sider[activeHeadMenuKey];
    const isShowSubMenu = sider && sider.length > 0 && themeStyle == "subMenu" ? true : false;
    const initSubMenu = isShowSubMenu ? sider.filter(item => item.isShow).map(item =>
      (item.children ?
        <SubMenu key={item.key} title={<span style={{color: "#000000"}}><i className={item.icon} style={iconStyle}/><span>{item.name}</span><i className="ri-arrow-down-s-line" style={{marginLeft: "5px"}}></i></span>} style={{ background: "#f5f5f5" }}>
          {
            item.children ? item.children.filter(item => item.isShow).map(subItem => (
              <MenuItem key={subItem.key} path={subItem.url}>
                <span style={{color: "#ffffff"}}><i className={item.icon} style={iconStyle} /><span style={{color: activeSideMenuKey == subItem.key ? "#1890ff" : "#ffffff"}}>{subItem.name}</span></span>
              </MenuItem>)) : null
          }
        </SubMenu> :
        <MenuItem key={item.key} path={item.url}>
          <span style={{color: "#000000"}}><i className={item.icon} style={iconStyle}/><span style={{color: activeSideMenuKey == item.key ? "#1890ff" : "#000000"}}>{item.name}</span></span>
        </MenuItem>)) : null;

    // 消息通知项
    const noficationPaneProps = { noficationList, messageList, todoList, clearPane, onDetail };
    const dropdownNoficationOptions = (
      <NoficationPane {...noficationPaneProps} />
    );

    // 个人信息项
    const dropdownInfoOptions = (
      <Menu style={{ marginTop: "16px", right: "-5%", padding: "0px 0px 1px 0px" }}>
        <div style={{background: themeColor, width: "260px", height: "185px", textAlign: "center", padding: "15px 0px 10px 0px"}}>
          <Avatar size={80} icon={<i className={"ri-user-line"} />} />
          <div style={{marginTop: "10px"}}>
            <span style={{fontWeight: "bolder"}}>admin</span>
            <span style={{marginLeft: "20px"}}>系统管理员</span>
            <div>15555555555</div>
            <div>{moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}</div>
          </div>
        </div>
        <MenuItem style={{ margin: "5px 10px 0px 10px" }}>
          <div onClick={onShowUserInfo}><i className="ri-shield-user-line" style={iconStyle}></i>&nbsp;个人中心</div>
        </MenuItem>
        <Divider style={{ margin: "5px" }} />
        <MenuItem style={{ margin: "5px 10px 0px 10px", marginBottom: "10px" }}>
          <div onClick={onLogout}><i className="ri-logout-circle-r-line" style={iconStyle}></i>&nbsp;退出系统</div>
        </MenuItem>
      </Menu>
    );

  const userInfo = tokenModel && tokenModel.userInfo ? JSON.parse(tokenModel.userInfo) : "";

  return (
    <div style={{ height: isShowSubMenu ? "90px" : "55px" }}>
      <Header className="header" style={{ height: "55px", background: themeColor, lineHeight: "0px" }} >
        <div style={{ height: "55px", float: "left", marginRight: "0%", marginTop: "28px", marginLeft:"15px" }}>
          <i className="ri-global-fill" style={{ fontSize: "35px", color: "aliceblue", marginLeft: "-20%", marginTop: "-17px" }}></i>
          <span className={styles.logContent}>{config.name}</span>
        </div>
        <div title={"缩放左侧菜单"} onClick={e => {toggleSiderMenu()}} className={styles.collapseDiv}>
          <i className={collapsed ? "ri-indent-increase" : "ri-indent-decrease"} />
        </div>
        <ul style={{ float: "right", listStyle: "none", display: "flex", marginRight: "-25px", cursor: "pointer", marginTop: "20px" }}>
          <li className={styles.menuToolBarli}>
            <Tooltip title={"了解项目"} onClick={onSystemInfo} overlayClassName={styles.messageToolTipA}>
              <i className="ri-information-line" style={{ fontSize: "18px", color: "#e8e8e8", verticalAlign: "text-bottom" }}></i>
            </Tooltip>
          </li>
          <li className={styles.menuToolBarliMessage}>
            <Tooltip title={"消息待办"} overlayClassName={styles.messageToolTip}>
              <Dropdown overlay={dropdownNoficationOptions} trigger={['click']}>
                <div>
                  <Badge dot={badgeCount > 0 ? true : false}>
                    <i className="ri-volume-up-line" style={{ fontSize: "18px", color: "#e8e8e8", verticalAlign: "text-bottom" }}></i>
                  </Badge>
                </div>
              </Dropdown>
            </Tooltip>
          </li>
          <li className={styles.menuToolBarli} onClick={onTheme}>
            <Tooltip title={"主题样式"} overlayClassName={styles.messageToolTipA}>
              <i className="ri-t-shirt-line" style={{ fontSize: "18px", color: "#e8e8e8", verticalAlign: "text-bottom" }}></i>
            </Tooltip>
          </li>
          <li style={{marginTop: "-6px"}}>
            <Dropdown overlay={dropdownInfoOptions} trigger={['click']}>
              <Tooltip title={"个人中心"} overlayClassName={styles.messageToolTipPerson}>
                <Avatar size={33} icon={<i className="ri-account-circle-line" style={{fontSize: "19px", verticalAlign: "sub"}}></i>} style={{ marginTop: "-5.5%", background: "#096dd9" }} />
                <span style={{ color: "#fff", marginLeft: "3px" }}>&nbsp;{userInfo ? userInfo.userName : "admin"}</span>
              </Tooltip>
            </Dropdown>
          </li>
        </ul>
        <Menu
          className={styles.menu}
          selectedKeys={[activeHeadMenuKey]}
          theme="dark"
          mode="horizontal"
          style={{ width: "100%",height: "55px", marginLeft: "-60px", marginRight: "-3.95%", background: themeColor }}
          onClick={onSelectHeadMenu}
        >
          {/* 引入主菜单 */}
          { initMainMenu }
        </Menu>
      </Header>
      <Menu
        className={styles.subMenu}
        selectable={false}
        theme="dark"
        mode="horizontal"
        style={{ width: "100%",height: "35px", background: "#f5f5f5", display: isShowSubMenu ? "block" : "none", paddingLeft: "13.15%" }}
        onClick={onSelectSideMenu}
      >
        {/* 引入主菜单 */}
        { initSubMenu }
      </Menu>
    </div>
  )};
}

export default HeadMenu;
