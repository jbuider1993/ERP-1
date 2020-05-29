import React from 'react';
import { Layout, Spin, Modal } from 'antd';
import config from "../config/config";
import HeadMenu from '../components/layout/HeadMenu';
import SideMenu from '../components/layout/SideMenu';
import UserInfo from '../components/userInfo/UserInfo';
import ThemeDrawer from '../components/theme/ThemeDrawer';
import { connect } from 'dva';
import 'remixicon/fonts/remixicon.css';
import * as globalService from '../services/globalService';

const { Content, Footer } = Layout;

/**
 * 顶部主菜单及其内容
 */
const AppPage = (props) => {

  const { dispatch, history, globalModel, noficationModel } = props;
  let { collapsed, activeHeadMenuKey, activeSideMenuKey, menuData, paneTabs, themeStyle, siderColor,
          openedSubMenuKey, homeView, tokenModel, themeDrawerVisible, themeColor, selectedStyle, menuMap } = globalModel;

  // 兼容单独运行前端服务
  if (menuData) {
    menuData = menuData;
  } else if (sessionStorage.menuData) {
    menuData = JSON.parse(sessionStorage.menuData);
  } else {
    const menuList = globalService.getAppMenuFromConfig();
    menuData = {};
    menuData["list"] = menuList;
    menuData = {...menuData, ...config.frame_menu};
  }

  const { noficationList, messageList, todoList, badgeCount } = noficationModel;

  const headMenuProps = {
    collapsed,
    activeHeadMenuKey,
    activeSideMenuKey,
    menuData,
    tokenModel,
    themeStyle,
    themeColor,
    noficationList,
    messageList,
    todoList,
    badgeCount,
    toggleSiderMenu: () => {
      dispatch({ type: "globalModel/updateState", payload: { collapsed: !collapsed }});
    },
    onSelectHeadMenu: (params) => {
      const { item, key, keyPath } = params;
      const sideMenu = menuData.sider[key];
      let openedSubMenuKey, activeSideMenuKey;
      if (sideMenu) {
        const isExist = paneTabs.filter(item => item.key == sideMenu[0].key).length > 0 ? true : false;
        const isHasChild = sideMenu[0].children ? true : false;
        if (!isExist && !isHasChild) {
          activeSideMenuKey = sideMenu[0].key;
          paneTabs.push({...sideMenu[0]});
        } else if (isHasChild) {
          openedSubMenuKey = sideMenu[0].key;
          activeSideMenuKey = sideMenu[0].children[0].key;
          const isExistChild = paneTabs.filter(item => activeSideMenuKey == item.key).length > 0 ? true : false;
          if (!isExistChild) {
            paneTabs.push({...sideMenu[0].children[0], key: activeSideMenuKey});
          }
        }
      }
      activeSideMenuKey = activeSideMenuKey ? activeSideMenuKey : sideMenu ? sideMenu[0].key : null;
      openedSubMenuKey = openedSubMenuKey ? openedSubMenuKey : null;
      dispatch({ type: "globalModel/updateState", payload: { activeHeadMenuKey: key, paneTabs, activeSideMenuKey, openedSubMenuKey }});
    },
    onSelectSideMenu: (params) => {
      const { item, key, keyPath } = params;
      const pathUrl = menuData.list.filter(item => key == item.key);
      const isExist = paneTabs.filter(item => item.key == pathUrl[0].key).length > 0 ? true : false;
      if (!isExist) {
        paneTabs.push({...pathUrl[0]});
      }
      dispatch({ type: "globalModel/updateState", payload: { activeSideMenuKey: key, paneTabs, pageUrl: item.props.path }});
    },
    onShowUserInfo: () => {
      dispatch({ type: "globalModel/updateState", payload: { activeHeadMenuKey: "userInfo" }});
    },
    onLogout: () => {
      Modal.confirm({
        title: '提示',
        okText: "确认",
        cancelText: "取消",
        content: <div><i className="ri-error-warning-line" style={{fontSize: "18px", marginRight: "10px", verticalAlign: "sub"}}></i>确定要退出系统？</div>,
        onOk() {
          Promise.all([dispatch({ type: "globalModel/logout", payload: {}})]).then(() =>
            window.g_app._history.push({pathname: "/"})
          );
        },
        onCancel() {},
      });
    },
    onSystemInfo: () => {
      dispatch({ type: "noficationModel/onDetail", payload: { key: "info" }});
    },
    onTheme: () => {
      dispatch({ type: "globalModel/updateState", payload: { themeDrawerVisible: true }});
    },
    clearPane: (paneKey) => {
      dispatch({ type: "noficationModel/clearPane", payload: { paneKey }});
    },
    onDetail: (key) => {
      dispatch({ type: "noficationModel/onDetail", payload: { key }});
    },
  };

  const userInfoProps = {
    tokenModel,
    onSaveUserInfo: () => {
      dispatch({ type: "globalModel/updateState", payload: { activeHeadMenuKey: "home" }});
    },
    onCloseUserInfo: () => {
      dispatch({ type: "globalModel/updateState", payload: { activeHeadMenuKey: "home" }});
    }
  };

  const sideMenuProps = {
    history,
    collapsed,
    activeHeadMenuKey,
    activeSideMenuKey,
    menuData,
    paneTabs,
    openedSubMenuKey,
    homeView,
    userInfoProps,
    tokenModel,
    themeStyle,
    siderColor,
    menuMap,
    themeColor,
    onTabChange: (activeTabKey) => {
      dispatch({ type: "globalModel/updateState", payload: { activeSideMenuKey: activeTabKey, activeHeadMenuKey: menuMap.get(activeTabKey) }});
    },
    onSelectSideMenu: (params) => {
      const { item, key, keyPath } = params;
      const pathUrl = menuData.list.filter(item => key == item.key);
      const isExist = paneTabs.filter(item => item.key == pathUrl[0].key).length > 0 ? true : false;
      if (!isExist) {
        paneTabs.push({...pathUrl[0]});
      }
      dispatch({ type: "globalModel/updateState", payload: { activeSideMenuKey: key, paneTabs, pageUrl: item.props.path }});
    },
    onOpenSubMenu: (openedKey) => {
      dispatch({ type: "globalModel/updateState", payload: { openedSubMenuKey: openedKey }});
    },
    removeTab: (targetKey, activeTabKey) => {
      let panes = paneTabs.filter(item => item.key != targetKey);
      const activedPane = panes.filter(item => activeTabKey == item.key);
      const activeKey = activedPane.length > 0 ? activeTabKey : panes.length == 0 ? null : panes[panes.length - 1].key;
      let activeHomeKey = menuData.main[0].key;
      if (activeKey) {
        const activeSubMenu = menuData.list.filter(item => item.key == activeKey)[0];
        const activeMenu = menuData.list.filter(item => item.id == activeSubMenu.parentId)[0];
        activeHomeKey = activeMenu.key;
      }
      if (panes.length == 0) {
        activeHomeKey = menuData.main[0].key;
      }
      dispatch({ type: "globalModel/updateState", payload: { paneTabs: panes, activeSideMenuKey: activeKey, activeHeadMenuKey: activeHomeKey }});
    },
    closeCurrentTab: () => {
      let closeTabs = paneTabs.filter(item => item.key != activeSideMenuKey);
      const activeTabKey = closeTabs.length > 0 ? closeTabs[closeTabs.length - 1].key : null;
      let activeKey = activeHeadMenuKey;
      if (closeTabs.length == 0) {
        activeKey = menuData.main[0].key;
      }
      dispatch({ type: "globalModel/updateState", payload: { paneTabs: closeTabs, activeSideMenuKey: activeTabKey, activeHeadMenuKey: activeKey }});
    },
    closeOtherTab: () => {
      let closeTabs = paneTabs.filter(item => item.key == activeSideMenuKey);
      let activeKey = activeHeadMenuKey;
      if (closeTabs.length == 0) {
        activeKey = menuData.main[0].key;
      }
      dispatch({ type: "globalModel/updateState", payload: { paneTabs: closeTabs, activeHeadMenuKey: activeKey }});
    },
    onCloseTab: () => {
      dispatch({ type: "globalModel/updateState", payload: { paneTabs: [], activeHeadMenuKey: menuData.main[0].key }});
    },
    updatePathMap: (pathMap) => {
      dispatch({ type: "globalModel/updateState", payload: { menuMap: pathMap }});
    },
  };

  const themeDrawerProps = {
    themeDrawerVisible,
    themeColor,
    siderColor,
    themeStyle,
    selectedStyle,
    onClose: () => {
      dispatch({ type: "globalModel/updateState", payload: { themeDrawerVisible: false }});
    },
    onChangeColor: (type, color) => {
      const payload = type == "preset" ? {themeColor: color} : selectedStyle == "theme" ? { themeColor: color } : { siderColor: color };
      dispatch({ type: "globalModel/updateState", payload: {themeColor: color}});
    },
    onDefaultColor: () => {
      dispatch({ type: "globalModel/updateState", payload: { themeColor: "#000000", siderColor: "#fff" }});
    },
    onChangeStyle: (style) => {
      dispatch({ type: "globalModel/updateState", payload: { themeStyle: style }});
    },
    onDefaultStyle: (style) => {
      dispatch({ type: "globalModel/updateState", payload: { themeStyle: "siderMenu" }});
    },
    onSelectStyle: (e) => {
      dispatch({ type: "globalModel/updateState", payload: { selectedStyle: e.target.value }});
    },
  };

  const footNoteProps = {
    themeColor
  };

return (
  <Layout style={{ width: "100%", height: '100%', borderRight: 0, background: "#fff" }}>
    <HeadMenu {...headMenuProps} />
    <Content>
      {
        activeHeadMenuKey == "userInfo" ? <UserInfo {...userInfoProps} /> :
        <SideMenu {...sideMenuProps} />
      }
      <ThemeDrawer {...themeDrawerProps} />
    </Content>
    <Footer style={{ height: 0, textAlign: "center", paddingTop: "0.2%", zIndex: "99", background: themeColor, display: "none" }}>
      <span style={{ color: "#d1d1d1", fontSize: "10px" }}>{config.footerText}</span>
    </Footer>
  </Layout>
)};

function mapStateToProps({ globalModel, noficationModel }) {
  return { globalModel, noficationModel };
}

export default connect(mapStateToProps)(AppPage);
