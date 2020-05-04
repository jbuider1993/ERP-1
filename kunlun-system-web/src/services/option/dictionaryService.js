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

export function deleteDictionaryItem(params) {
  return request.get(`${config.system_api.deleteDictionaryItem}`, params);
}

export function deleteDictionaryValue(params) {
  return request.get(`${config.system_api.deleteDictionaryValue}`, params);
}

export function updateDictionaryItem(params) {
  return request.post(`${config.system_api.updateDictionaryItem}`, params);
}

export function updateDictionaryValue(params) {
  return request.post(`${config.system_api.updateDictionaryValue}`, params);
}
