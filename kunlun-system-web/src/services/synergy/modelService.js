import * as request from '../../utils/request';
import config from '../../config/config';

export function getAllModel(params) {
  return request.get(`${config.system_api.getModelList}`, params);
}

export function addUser(params) {
  return request.post(`${config.system_api.addUser}`, params);
}

export function updateUser(params) {
  return request.post(`${config.system_api.updateUser}`, params);
}

export function deployModel(params) {
  return request.post(`${config.system_api.deployModel}`, params);
}

export function batchDeleteModel(params) {
  return request.post(`${config.system_api.batchDeleteModel}`, params);
}

export function getModelNodeList(params) {
  let url = config.system_api.getModelNodeList;
  url = url.replace("XXX", params.modelId);
  return request.get(url, params);
}
