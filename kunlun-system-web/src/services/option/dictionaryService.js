import * as request from '../../utils/request';
import config from '../../config/config';

export function getAllDictionary(params) {
  return request.get(`${config.system_api.getAllDictionary}`, params);
}

export function getAllDictionarySub(params) {
  return request.get(`${config.system_api.getAllDictionarySub}`, params);
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
