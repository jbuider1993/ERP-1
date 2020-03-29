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
