import * as request from '../../utils/request';
import config from '../../config/config';

export function getUserCount(params) {
  return request.get(`${config.base_api.getUserCount}`, params);
}

export function getMessages(params) {
  return request.get(`${config.registry_api.getMessages}`, params);
}

export function getRedisInfos(params) {
  return request.get(`${config.base_api.getRedisInfos}`, params);
}

export function queryServiceInvokes(params) {
  return request.get(`${config.base_api.queryServiceInvokes}`, params);
}

export function statisticOnlineByYear(params) {
  return request.get(`${config.base_api.statisticOnlineByYear}`, params);
}
