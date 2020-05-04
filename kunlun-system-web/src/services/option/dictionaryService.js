import * as request from '../../utils/request';
import config from '../../config/config';

export function getAllDictionaryItem(params) {
  return request.get(`${config.system_api.getAllDictionaryItem}`, params);
}

export function getAllDictionaryValue(params) {
  return request.get(`${config.system_api.getAllDictionaryValue}`, params);
}

export function addDictionaryItem(params) {
  return request.post(`${config.system_api.addDictionaryItem}`, params);
}

export function addDictionaryValue(params) {
  return request.post(`${config.system_api.addDictionaryValue}`, params);
}
