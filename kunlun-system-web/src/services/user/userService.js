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
