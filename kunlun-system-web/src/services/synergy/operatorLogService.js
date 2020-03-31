import * as request from '../../utils/request';
import config from '../../config/config';

export function getLogList(params) {
  return request.get(`${config.system_api.getLogList}`, params);
}
