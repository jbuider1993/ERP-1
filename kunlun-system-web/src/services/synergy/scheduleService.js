import * as request from '../../utils/request';
import config from '../../config/config';

export function getAllSchedules(params) {
  return request.get(`${config.system_api.getAllSchedules}`, params);
}

export function addSchedule(params) {
  return request.post(`${config.system_api.addSchedule}`, params);
}

export function updateSchedule(params) {
  return request.post(`${config.system_api.updateSchedule}`, params);
}

export function deleteSchedule(params) {
  return request.post(`${config.system_api.deleteSchedule}`, params);
}
