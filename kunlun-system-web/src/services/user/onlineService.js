import * as request from '../../utils/request';
import config from '../../config/config';

export function getAllOnlineUser(params) {
  return request.get(`${config.system_api.getOnlineUserList}`, params);
}

export function forceExit(params) {
  return request.post(`${config.system_api.forceExit}`, params);
}
