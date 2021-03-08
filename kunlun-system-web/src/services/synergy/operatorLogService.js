import * as request from '../../utils/request';
import config from '../../config/config';

export function getLogList(params) {
  return request.get(`${config.system_api.getLogList}`, params);
}

export function downloadOperateLog(params) {
  return request.download(`${config.system_api.exportOperateLog}`, params, "blob").then(res => {
    const event = document.createEvent("MouseEvents");
    const html = document.createElement("a");
    html.href = window.URL.createObjectURL(res.data);
    html.download = "操作日志.xlsx";
    event.initEvent("click", true, true);
    html.dispatchEvent(event);
  });
}
