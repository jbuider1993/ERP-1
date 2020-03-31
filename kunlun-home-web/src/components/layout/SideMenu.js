import React from 'react';
import {Layout, Menu, Icon, Tabs, Dropdown} from 'antd';
import config from "../../config/config";
import styles from './Menu.less';
import umiRouter from 'umi/router';

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

  render() {

    const { history,
      collapsed, activeHeadMenuKey, onSelectSideMenu, activeSideMenuKey, paneTabs, onTabChange, updatePathMap, menuMap,
      onOpenSubMenu, openedSubMenuKey, removeTab, closeCurrentTab, closeOtherTab, onCloseTab, tokenModel, themeStyle, siderColor
    } = this.props;

    // 更新路由Map
    if (!menuMap.get(activeSideMenuKey)) {
      menuMap.set(activeSideMenuKey, activeHeadMenuKey);
      updatePathMap(menuMap);
    }

    // 左侧菜单
    const siderFlag = config.frame_menu.sider[activeHeadMenuKey] ? true : false;
    const siderMenu = siderFlag ? config.frame_menu.sider[activeHeadMenuKey].filter(item => item.isShow).map(item => (item.children ?
      <SubMenu key={item.key} title={<span><Icon type={item.icon}/><span>{item.name}</span></span>} style={{ background: siderColor }}>
        {
          item.children ? item.children.filter(item => item.isShow).map(subItem => (
            <MenuItem key={subItem.key} path={subItem.url}>
              <Icon type={subItem.icon}/><span>{subItem.name}</span>
            </MenuItem>)) : ""
        }
      </SubMenu> :
      <MenuItem key={item.key} path={item.url}>
        <Icon type={item.icon}/><span>{item.name}</span>
      </MenuItem>)) : "";

    // Tabs页签编辑，即删除
    const onEdit = (targetKey, type) => {
      if (type != "add") {
        removeTab(targetKey, activeSideMenuKey);
      }
    };

    const dropdownOptions = (
      <Menu style={{ marginTop: "-6px", marginRight: "-9px", right: "5px", padding: "5px 10px 5px 0px" }}>
        <MenuItem style={{ marginTop: "3px", marginLeft: "10px" }}>
          <div onClick={() => onRefreshTab()}><Icon type={"reload"}/>&nbsp;刷新当前页签</div>
        </MenuItem>
        <MenuItem style={{ marginTop: "3px", marginBottom: "5px", marginLeft: "10px" }}>
          <div onClick={closeCurrentTab}><Icon type={"close"}/>&nbsp;关闭当前页签</div>
        </MenuItem>
        <MenuItem style={{ marginTop: "3px", marginBottom: "5px", marginLeft: "10px" }}>
          <div onClick={closeOtherTab}><Icon type={"close-square"}/>&nbsp;关闭其他页签</div>
        </MenuItem>
        <MenuItem style={{ marginTop: "3px", marginBottom: "5px", marginLeft: "10px" }}>
          <div onClick={onCloseTab}><Icon type={"close-circle"}/>&nbsp;关闭所有页签</div>
        </MenuItem>
      </Menu>
    );

    const tabOperateOptions = <div style={{marginTop: "2px", marginRight: "10px", marginLeft: "10px"}}>
      <Dropdown overlay={dropdownOptions} className={styles.down}>
        <div>
          <Icon type="down-square" style={{ fontSize: "20px" }} />
        </div>
      </Dropdown>
    </div>;

    // 刷新当前页签
    const onRefreshTab = () => {
      this.setState({ refreshView: new Date().getTime() });
    };

    const loadParamsToIFrame = () => {
      if (!tokenModel) {
        umiRouter.push({pathname: "/scmp"});
        return;
      }
      const iFrameParams = { token: tokenModel.token, userInfo: tokenModel.userInfo, isAuth: true };
      window.frames[0].postMessage(iFrameParams, '*');
      window.frames[window.frames.length - 1].postMessage(iFrameParams, '*');
    };

    // 刷新时间戳
    const refreshFlag = this.state.refreshView;

    const isShowSider = activeHeadMenuKey != "home" && themeStyle == "siderMenu" ? true : false;
    const pageUrl = siderFlag ? config.frame_menu.sider[activeHeadMenuKey].filter(item => item.key == activeSideMenuKey)[0].url : "/home";

    const height = (document.documentElement.clientHeight - 55 - 40) + "px";

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
              activeHeadMenuKey == config.frame_menu.main[0].key || (activeHeadMenuKey != "home" && themeStyle == "subMenu") ?
              <iframe id={"homeIFrame"} name={"homeIFrame"} onLoad={loadParamsToIFrame} style={{width: "100%", height: "100%", padding: activeHeadMenuKey != "home" ? "20px" : "0", display: "block"}} frameBorder={"no"} src={config.LOCAL_API + pageUrl}/> :
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
                        <iframe id={"tabIFrame" + index} name={"tabIFrame" + index} frameBorder={"no"}
                                style={{width: "100%", height: "100%"}}
                                onLoad={loadParamsToIFrame}
                                src={(activeHeadMenuKey == "resource" && activeSideMenuKey != "virtual" && activeSideMenuKey != "service")
                                  || (activeHeadMenuKey == "option" && openedSubMenuKey == "interface") || pane.tabType && pane.tabType == "1" ?
                                  pane.url + (refreshFlag ? ("?refreshView=" + refreshFlag) : "") :
                                  config.LOCAL_API + pane.url + (refreshFlag ? ("?refreshView=" + refreshFlag) : "")}
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
