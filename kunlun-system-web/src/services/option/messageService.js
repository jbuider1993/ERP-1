import * as request from '../../utils/request';
import config from '../../config/config';

export function getAllMessages(params) {
  return request.get(`${config.base_api.getAllMessages}`, params);
}

export function addMessage(params) {
  return request.post(`${config.base_api.addMessage}`, params);
}

export function updateMessage(params) {
  return request.post(`${config.base_api.updateMessage}`, params);
}

export function batchDeleteMessage(params) {
  return request.get(`${config.base_api.batchDeleteMessage}`, params);
}
