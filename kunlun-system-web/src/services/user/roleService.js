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

export function batchDeleteRole(params) {
  return request.post(`${config.system_api.batchDeleteRole}`, params);
}
