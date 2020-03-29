import * as request from '../../utils/request';
import config from '../../config/config';

export function getMenuList(params) {
  return request.get(`${config.system_api.getMenuList}`, params);
}

export function addMenu(params) {
  return request.post(`${config.system_api.addMenu}`, params);
}

export function editMenu(params) {
  return request.post(`${config.system_api.editMenu}`, params);
}

export function deleteMenu(params) {
  return request.post(`${config.system_api.deleteMenu}`, params);
}

export function getMenuIconList(params) {
  return request.get(`${config.system_api.getIconList}`, params);
}
