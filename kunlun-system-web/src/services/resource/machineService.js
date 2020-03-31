import * as request from '../../utils/request';
import config from '../../config/config';

export function getMachineList(params) {
  return request.get(`${config.system_api.getMachineList}`, params);
}

export function downloadTemplate(params) {
  return request.download(`${config.system_api.downloadTemplate}`, params, "template").then((res) => {
    console.log(res);
    const event = document.createEvent("MouseEvents");
    const element = document.createElement("a");
    element.href = URL.createObjectURL(res.data);
    element.download = "模板文件.xlsx";
    event.initEvent("click", true, true);
    element.dispatchEvent(event);
  });
}

export function addMenu(params) {
  return request.post(`${config.system_api.addMenu}`, params);
}

export function deleteMenu(params) {
  return request.post(`${config.system_api.deleteMenu}`, params);
}

export function getMenuIconList(params) {
  return request.get(`${config.system_api.getIconList}`, params);
}
