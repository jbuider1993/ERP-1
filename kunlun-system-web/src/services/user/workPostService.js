import * as request from '../../utils/request';
import config from '../../config/config';

export function getAllWorkPost(params) {
  return request.get(`${config.system_api.getAllWorkPost}`, params);
}

export function addWorkPost(params) {
  return request.post(`${config.system_api.addWorkPost}`, params);
}

export function updateWorkPost(params) {
  return request.post(`${config.system_api.updateWorkPost}`, params);
}

export function deleteWorkPost(params) {
  return request.post(`${config.system_api.deleteWorkPost}`, params);
}
