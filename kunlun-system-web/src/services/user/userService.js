import * as request from '../../utils/request';
import config from '../../config/config';

export function getAllUser(params) {
  return request.get(`${config.system_api.getUserList}`, params);
}

export function addUser(params) {
  return request.post(`${config.system_api.addUser}`, params);
}

export function updateUser(params) {
  return request.post(`${config.system_api.updateUser}`, params);
}

export function batchDeleteUser(params) {
  return request.post(`${config.system_api.batchDeleteUser}`, params);
}

export function downloadUsers(params) {
  return request.download(`${config.system_api.downloadUsers}`, params, "blob").then(res => {
    const event = document.createEvent("MouseEvents");
    const html = document.createElement("a");
    html.href = window.URL.createObjectURL(res.data);
    html.download = "人员用户.xlsx";
    event.initEvent("click", true, true);
    html.dispatchEvent(event);
  });
}
