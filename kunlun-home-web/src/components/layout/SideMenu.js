import React from 'react';
import {Layout, Menu, Tabs, Dropdown, Tooltip} from 'antd';
import styles from './Menu.less';
import 'remixicon/fonts/remixicon.css';
import config from '../../config/config';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;

/**
 * 左侧菜单及中间内容显示
 */
class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshView: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const {tokenModel, themeColor} = nextProps;
    this.onLoadIFrame(tokenModel, themeColor);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!!this.state.refreshView) this.setState({refreshView: null});
  }

  onLoadIFrame(tokenModel, themeColor) {
    // 传递参数到子IFrame页面进行交互
    const iFrameParams = { token: tokenModel.token, userInfo: tokenModel.userInfo, themeColor, isAuth: true };
    window.frames[0].postMessage(iFrameParams, '*');
    window.frames[window.frames.length - 1].postMessage(iFrameParams, '*');
  }

  render() {

    const { collapsed, activeHeadMenuKey, onSelectSideMenu, activeSideMenuKey, menuData, paneTabs, onTabChange, updatePathMap, menuMap,
      onOpenSubMenu, openedSubMenuKey, removeTab, closeCurrentTab, closeOtherTab, onCloseTab, tokenModel, themeStyle, themeColor, siderColor
    } = this.props;

    // 更新路由Map
    if (!menuMap.get(activeSideMenuKey)) {
      menuMap.set(activeSideMenuKey, activeHeadMenuKey);
      updatePathMap(menuMap);
    }

    const iconStyle = (iconType) => {
      return {
        paddingRight: iconType == "dropdown" ? "5px" : collapsed ? "32px" : "5px",
        fontSize: "16px",
        verticalAlign: "sub",
      }
    };

    // 左侧菜单
    const siderFlag = menuData.sider[activeHeadMenuKey] ? true : false;
    const siderMenu = siderFlag ? menuData.sider[activeHeadMenuKey].filter(item => item.show).map(item => (item.children ?
      <SubMenu key={item.key} title={<span><i class={item.icon} style={iconStyle("submenu")}/><span>{item.name}</span></span>} style={{ background: siderColor }}>
        {
          item.children ? item.children.filter(item => item.isShow).map(subItem => (
            <MenuItem key={subItem.key} path={subItem.url}>
              <i class={subItem.icon} style={iconStyle("submenu")}/><span>{subItem.name}</span>
            </MenuItem>)) : ""
        }
      </SubMenu> :
      <MenuItem key={item.key} path={item.url}>
        <i class={item.icon} style={iconStyle("submenu")}/><span>{item.name}</span>
      </MenuItem>)) : "";

    // Tabs页签编辑，即删除
    const onEdit = (targetKey, type) => {
      if (type != "add") {
        removeTab(targetKey, activeSideMenuKey);
      }
    };

    const dropdownOptions = (
      <Menu style={{ marginTop: "10px", marginRight: "-9px", right: "5px", padding: "5px 5px 5px 0px" }}>
        <MenuItem style={{ marginTop: "3px", marginLeft: "5px" }}>
          <div onClick={() => onRefreshTab()}><i className="ri-refresh-line" style={iconStyle("dropdown")}></i>&nbsp;刷新当前页签</div>
        </MenuItem>
        <MenuItem style={{ marginTop: "3px", marginBottom: "5px", marginLeft: "5px" }}>
          <div onClick={closeCurrentTab}><i className="ri-close-line" style={iconStyle("dropdown")}></i>&nbsp;关闭当前页签</div>
        </MenuItem>
        <MenuItem style={{ marginTop: "3px", marginBottom: "5px", marginLeft: "5px" }}>
          <div onClick={closeOtherTab}><i className="ri-checkbox-indeterminate-line" style={iconStyle("dropdown")}></i>&nbsp;关闭其他页签</div>
        </MenuItem>
        <MenuItem style={{ marginTop: "3px", marginBottom: "5px", marginLeft: "5px" }}>
          <div onClick={onCloseTab}><i className="ri-close-circle-line" style={iconStyle("dropdown")}></i>&nbsp;关闭所有页签</div>
        </MenuItem>
      </Menu>
    );

    const tabOperateOptions = <div style={{marginTop: "2px", marginRight: "10px", marginLeft: "10px"}}>
      <Dropdown overlay={dropdownOptions} className={styles.cursorDiv}>
        <Tooltip title={"页签操作"} placement={"left"}>
          <i className="ri-menu-line" style={{ fontSize: "20px" }}></i>
        </Tooltip>
      </Dropdown>
    </div>;

    // 刷新当前页签
    const onRefreshTab = () => {
      this.setState({ refreshView: new Date().getTime() });
    };

    // 刷新时间戳
    const refreshFlag = this.state.refreshView;

    const isShowSider = activeHeadMenuKey != "home" && themeStyle == "siderMenu" ? true : false;
    const pageUrl = siderFlag ? menuData.sider[activeHeadMenuKey].filter(item => item.key == activeSideMenuKey)[0].url : menuData.main[0].url;

    return (
      <Layout style={{height: "100%"}}>
        <Sider trigger={null} collapsible collapsed={collapsed} width={"220px"}
               style={{ display: isShowSider ? "block" : "none" }} className={styles.siderDiv}>
          <Menu
            mode="inline"
            selectedKeys={activeSideMenuKey}
            openKeys={openedSubMenuKey}
            style={{height: '100%', background: siderColor}}
            onOpenChange={onOpenSubMenu}
            onClick={onSelectSideMenu}
          >
            {/* 引入左侧菜单 */}
            {siderMenu}
          </Menu>
        </Sider>
        <Layout style={{background: "#fff"}}>
          <Content>
            {/* 引入页面显示组件 */}
            {
              activeHeadMenuKey == menuData.main[0].key || (activeHeadMenuKey != "home" && themeStyle == "subMenu") ?
              <iframe id={"homeIFrame_" + activeHeadMenuKey} name={"homeIFrame_" + activeHeadMenuKey}
                      style={{width: "100%", height: "100%", padding: activeHeadMenuKey != "home" ? "20px" : "0", display: "block"}}
                      frameBorder={"no"} src={pageUrl} onLoad={() => this.onLoadIFrame(tokenModel, themeColor)}
              /> :
              <Tabs
                className={[styles.gapTab, styles.distanceDiv]}
                type="editable-card"
                hideAdd
                onChange={onTabChange}
                activeKey={activeSideMenuKey}
                onEdit={onEdit}
                tabBarExtraContent={tabOperateOptions}
              >
                {
                  paneTabs.map((pane, index) =>
                    <TabPane key={pane.key} tab={pane.name}>
                      <div className={styles.tabDiv} ref={"iframe" + index}>
                        <iframe id={"tabIFrame_" + activeHeadMenuKey + "_" + activeSideMenuKey + index}
                                name={"tabIFrame_" + activeHeadMenuKey + "_" + activeSideMenuKey + index}
                                frameBorder={"no"} style={{width: "100%", height: "100%"}} onLoad={() => this.onLoadIFrame(tokenModel, themeColor)}
                                src={pane.url + (refreshFlag && activeSideMenuKey == pane.key ? ("?refreshView=" + refreshFlag) : "")}
                        />
                      </div>
                    </TabPane>)
                }
              </Tabs>
            }
          </Content>
        </Layout>
      </Layout>
    );
  };
}

export default SideMenu;
