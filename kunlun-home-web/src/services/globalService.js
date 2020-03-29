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
          menuObj["url"] = menuObj["url"] + params.params.id
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
