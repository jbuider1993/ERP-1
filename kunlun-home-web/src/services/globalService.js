import * as request from '../utils/request';
import config from '../config/config';

export function login(params) {
  return request.get(`${config.gate_way_api.login}`, params);
}

export function getAuthCode(params) {
  return request.get(`${config.base_cache_api.getAuthCode}`, params);
}

export function getAppMenu(params) {
  return request.get(`${config.base_cache_api.getAppMenu}`, params);
}

export function logout(params) {
  return request.get(`${config.gate_way_api.logout}`, params);
}

export function getTodoList(params) {
  return request.get(`${config.system_api.getTodoList}`, params);
}

export function getMessageList(params) {
  return request.get(`${config.base_cache_api.getAllMessages}`, params);
}

export function getActivedMenu(params, paneTabList) {
  const siderMenuObj = config.frame_menu.sider;
  let activeHeadMenuKey;
  for (let siderKey of Object.keys(siderMenuObj)) {
    const siderChildren = siderMenuObj[siderKey];
    for (let i = 0; i < siderChildren.length; i++) {
      const menuObj = siderChildren[i];
      if (menuObj.key == params.key) {
        activeHeadMenuKey = siderKey;
        if (params.key == "update") {
          const url = menuObj["url"].substring(0, menuObj["url"].indexOf("=") + 1);
          menuObj["url"] = url + params.params.id;
        }

        // 如Tab已经打开，则直接跳转到已打卡的Tab
        const openedMenuObj = paneTabList.filter(item => item.key == params.key);
        if (openedMenuObj && openedMenuObj.length == 0) {
          paneTabList.push(menuObj);
          break;
        }
      }
    }
  }
  return {activeHeadMenuKey, paneTabList};
}

export function getAppMenuFromConfig() {
  let menuList = new Array();
  const main1 = config.frame_menu.main;
  const sider1 = config.frame_menu.sider;
  const siderKeys = main1.map(obj => obj.key);
  const siders = siderKeys.slice(1, siderKeys.length).map(obj => sider1[obj]);
  const temps = siders.flatMap(obj => obj);
  const tempss = temps.filter(obj => obj.children && obj.children.length);
  const childs = tempss.flatMap(obj => obj.children);
  const array = [...main1, ...temps, ...childs];
  for (let i = 0; i < array.length; i++) {
    if (array[i].key != "") menuList.push({...array[i]});
  }
  return menuList;
}
