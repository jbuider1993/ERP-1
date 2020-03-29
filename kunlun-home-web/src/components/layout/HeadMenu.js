import React from 'react';
import {Layout, Menu, Icon, Dropdown, Avatar, Divider, Tooltip, Badge} from 'antd';
import styles from './Menu.less';
import config from "../../config/config";
import NoficationPane from '../nofication/NoficationPane';

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

    const { collapsed, activeHeadMenuKey, toggleSiderMenu, activeSideMenuKey, onSelectHeadMenu, noficationList, messageList, onSelectSideMenu,
      todoList, onShowUserInfo, onLogout, tokenModel, onSystemInfo, onTheme, themeStyle, themeColor, badgeCount, clearPane, onDetail } = this.props;

    // 主菜单项
    const main = config.frame_menu.main;
    const initMainMenu = main.map(item =>
      <MenuItem key={item.key} path={item.url}>
        <Icon type={item.icon} />{item.name}
      </MenuItem>);

    // 子菜单项
    const sider = config.frame_menu.sider[activeHeadMenuKey];
    const isShowSubMenu = sider && sider.length > 0 && themeStyle == "subMenu" ? true : false;
    const initSubMenu = isShowSubMenu ? sider.filter(item => item.isShow).map(item =>
      (item.children ?
        <SubMenu key={item.key} title={<span style={{color: "#000000"}}><Icon type={item.icon}/><span>{item.name}</span><Icon type="caret-down" style={{marginLeft: "5px"}} /></span>} style={{ background: "#f5f5f5" }}>
          {
            item.children ? item.children.filter(item => item.isShow).map(subItem => (
              <MenuItem key={subItem.key} path={subItem.url}>
                <span style={{color: "#ffffff"}}><Icon type={subItem.icon} /><span style={{color: activeSideMenuKey == subItem.key ? "#1890ff" : "#ffffff"}}>{subItem.name}</span></span>
              </MenuItem>)) : null
          }
        </SubMenu> :
        <MenuItem key={item.key} path={item.url}>
          <span style={{color: "#000000"}}><Icon type={item.icon} /><span style={{color: activeSideMenuKey == item.key ? "#1890ff" : "#000000"}}>{item.name}</span></span>
        </MenuItem>)) : null;

    // 消息通知项
    const noficationPaneProps = { noficationList, messageList, todoList, clearPane, onDetail };
    const dropdownNoficationOptions = (
      <NoficationPane {...noficationPaneProps} />
    );

    // 个人信息项
    const dropdownInfoOptions = (
      <Menu style={{ marginTop: "-6px", marginRight: "-1px", right: "-15%", padding: "5px 10px 5px 0px" }}>
        <MenuItem style={{ marginTop: "5px", marginLeft: "10px" }}>
          <div onClick={onShowUserInfo}><Icon type={"user"}/>&nbsp;个人中心</div>
        </MenuItem>
        <Divider style={{ margin: "5px" }} />
        <MenuItem style={{ marginTop: "5px", marginBottom: "8px", marginLeft: "10px" }}>
          <div onClick={onLogout}><Icon type={"logout"}/>&nbsp;退出系统</div>
        </MenuItem>
      </Menu>
    );

  return (
    <div style={{ height: isShowSubMenu ? "90px" : "55px" }}>
      <Header style={{ height: "55px", background: themeColor }} >
        <div style={{ height: "55px", float: "left", marginRight: "0%", marginTop: "-5px" }}>
          <Icon type="windows" theme="filled" style={{ fontSize: "35px", color: "aliceblue", marginLeft: "-20%", marginTop: "15px" }} />
          <span className={styles.logContent}>{config.name}</span>
        </div>
        <div onClick={e => {toggleSiderMenu()}} className={styles.collapseDiv}>
          <Icon title={"缩放左侧菜单"} className={styles.trigger} type={collapsed ? "menu-fold" : "menu-unfold"}/>
        </div>
        <ul style={{ float: "right", listStyle: "none", display: "flex", height: "55px", marginRight: "-25px", cursor: "pointer", marginTop: "-2px" }}>
          <li className={styles.menuToolBarli}>
            <Tooltip title={"了解项目"} onClick={onSystemInfo} overlayClassName={styles.messageToolTipA}>
              <Icon type={"question-circle-o"} style={{ fontSize: "15px", color: "#e8e8e8" }} />
            </Tooltip>
          </li>
          <li className={styles.menuToolBarliMessage}>
            <Tooltip title={"消息"} overlayClassName={styles.messageToolTip}>
              <Dropdown overlay={dropdownNoficationOptions} trigger={['click']}>
                <div>
                  <Badge dot={badgeCount > 0 ? true : false}>
                    <Icon type={"notification"} style={{ fontSize: "15px", color: "#e8e8e8" }} />
                  </Badge>
                </div>
              </Dropdown>
            </Tooltip>
          </li>
          <li className={styles.menuToolBarli} onClick={onTheme}>
            <Tooltip title={"主题"} overlayClassName={styles.messageToolTipA}>
              <Icon type={"skin"} style={{ fontSize: "15px", color: "#e8e8e8" }} />
            </Tooltip>
          </li>
          <li style={{marginTop: "-2px"}}>
            <Dropdown overlay={dropdownInfoOptions} trigger={['click']}>
              <div>
                <Avatar size={33} icon="user" style={{ marginTop: "-5.5%", background: "#096dd9" }} />
                <span style={{ color: "#fff", marginLeft: "3px" }}>&nbsp;{tokenModel ? tokenModel.userInfo.userName : "SCMP"}</span>
              </div>
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
