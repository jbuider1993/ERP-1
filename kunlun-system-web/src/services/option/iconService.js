import * as request from '../../utils/request';
import config from '../../config/config';

export function getIconList(params) {
  return request.get(`${config.system_api.getIconList}`, params);
}

export function addIcon(params) {
  return request.post(`${config.system_api.addIcon}`, params);
}

export function getIconInfo(params) {
  return request.post(`${config.system_api.getIconInfo}`, params);
}

export function fetchIcons(params) {
  return request.get(`${config.system_api.fetchIcons}`, params);
}

export function onExportIcons(params) {
  return request.download(`${config.system_api.onExportIcons}`, params, "blob").then(res => {
    const event = document.createEvent("MouseEvents");
    const html = document.createElement("a");
    html.href = window.URL.createObjectURL(res.data);
    html.download = "系统图标.xlsx";
    event.initEvent("click", true, true);
    html.dispatchEvent(event);
  });
}
