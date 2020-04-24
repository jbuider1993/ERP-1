import * as request from '../../utils/request';
import config from '../../config/config';

export function getAllProcess(params) {
  return request.get(`${config.system_api.getAllProcess}`, params);
}

export function addUser(params) {
  return request.post(`${config.system_api.addUser}`, params);
}

export function updateUser(params) {
  return request.post(`${config.system_api.updateUser}`, params);
}

export function submitProcess(params) {
  return request.post(`${config.system_api.submitProcess}`, params);
}

export function auditProcess(params) {
  return request.post(`${config.system_api.auditProcess}`, params);
}

export function getCurrentProcessNode(params) {
  return request.get(`${config.system_api.getCurrentProcessNode}`, params);
}
