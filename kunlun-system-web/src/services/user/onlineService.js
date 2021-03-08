import * as request from '../../utils/request';
import config from '../../config/config';

export function getAllOnlineUser(params) {
  return request.get(`${config.system_api.getOnlineUserList}`, params);
}

export function forceExit(params) {
  return request.post(`${config.system_api.forceExit}`, params);
}

export function downloadOnlineUsers(params) {
  return request.download(`${config.system_api.downloadOnlineUsers}`, params, "blob").then(res => {
    const event = document.createEvent("MouseEvents");
    const html = document.createElement("a");
    html.href = window.URL.createObjectURL(res.data);
    html.download = "登录用户.xlsx";
    event.initEvent("click", true, true);
    html.dispatchEvent(event);
  });
}
