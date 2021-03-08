import * as request from '../../utils/request';
import config from '../../config/config';

export function getAllRole(params) {
  return request.get(`${config.system_api.getRoleList}`, params);
}

export function addRole(params) {
  return request.post(`${config.system_api.addRole}`, params);
}

export function updateRole(params) {
  return request.post(`${config.system_api.updateRole}`, params);
}

export function updateMenuLimit(params) {
  return request.post(`${config.system_api.updateMenuLimit}`, params);
}

export function updateAllotUser(params) {
  return request.post(`${config.system_api.updateAllotUser}`, params);
}

export function batchDeleteRole(params) {
  return request.post(`${config.system_api.batchDeleteRole}`, params);
}

export function getMenuList(params) {
  return request.get(`${config.system_api.getMenuList}`, params);
}

export function getRoleById(params) {
  return request.get(`${config.system_api.getRoleById}`, params);
}
