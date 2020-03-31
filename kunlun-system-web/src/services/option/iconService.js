import * as request from '../../utils/request';
import config from '../../config/config';

export function getIconList(params) {
  return request.get(`${config.system_api.getIconList}`, params);
}

export function addIcon(params) {
  return request.post(`${config.system_api.addIcon}`, params);
}

export function getIconInfo(params) {
  return request.post(`${config.system_api.getIconInfo}`, params);
}

export function fetchIcons(params) {
  return request.get(`${config.system_api.fetchIcons}`, params);
}
