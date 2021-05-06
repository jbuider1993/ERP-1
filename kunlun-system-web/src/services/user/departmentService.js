import * as request from '../../utils/request';
import config from '../../config/config';

export function getAllDepartment(params) {
  return request.get(`${config.system_api.getAllDepartment}`, params);
}

export function addDepartment(params) {
  return request.post(`${config.system_api.addDepartment}`, params);
}

export function updateDepartment(params) {
  return request.post(`${config.system_api.updateDepartment}`, params);
}

export function deleteDepartment(params) {
  return request.post(`${config.system_api.deleteDepartment}`, params);
}
