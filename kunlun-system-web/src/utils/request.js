import axios from 'axios';
import { message, Modal } from 'antd';
import qs from 'qs';
import 'remixicon/fonts/remixicon.css';

axios.defaults.timeout = 300000;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export function get(url, data) {
  if (!window._TOKEN_) return {code: null};

  if (url) {
    let getUrl = "";
    Object.keys(data).forEach((item) => {
      getUrl += item + "=" + data[item] + "&";
    });
    if (getUrl.indexOf("&") > 0) {
      url = url + "?" + getUrl.substr(0, getUrl.length - 1);
    }

    const instance = axios.create();
    instance.interceptors.request.use(config => {
      config.headers["Authorization"] = window._TOKEN_ || "";
      config.timeout = 300000;
      return config;
    });

    let response = new Promise((resolve, reject) => {
      instance.get(url).then(res => {
        return resolve(res.data);
      }).catch(error => {
        if (error.response) {
          const status = error.response.status;
          if (status == "400" || status == "404") {
            if (error.response.data.path && error.response.data.path == "/timeout") {
              Modal.confirm({
                title: '提示',
                okText: "确认",
                cancelText: "取消",
                content: <div><i className="ri-error-warning-line" style={{fontSize: "18px", marginRight: "10px", verticalAlign: "sub"}}></i>离开时间太长，请重新登录！</div>,
                onOk() {
                  window.parent.postMessage({operateType: "timeout"}, "*");
                },
                onCancel() {},
              });
            } else {
              message.error("客户端请求错误！");
            }
          } else if (status == "500") {
            message.error("服务器内部错误！");
          }
        } else {
          message.error("请求失败！");
        }
        return reject(error);
      });
    });
    return response;
  } else {
    message.error("请求格式不正确！");
    return null;
  }
}

export function post(url, data) {
  if (!window._TOKEN_) return {code: null};

  if (url && data) {
    const instance = axios.create();
    instance.interceptors.request.use(config => {
      config.headers["Authorization"] = window._TOKEN_ || "";
      config.timeout = 300000;
      return config;
    });

    let response = new Promise((resolve, reject) => {
      instance.post(url, qs.stringify(data)).then(res => {
        return resolve(res.data);
      }).catch(error => {
        if (error.response) {
          if (error.response.status == "400" || error.response.status == "404") {
            message.error("客户端请求错误！");
          } else if (error.response.status == "500") {
            message.error("服务器内部错误！");
          }
        } else {
          message.error("请求失败！");
        }
        return reject(error);
      });
    });
    return response;
  } else {
    message.error("请求格式不正确！");
    return null;
  }
}

export function download(url, data, type) {
  const obj = {};
  obj["method"] = "get";
  obj["url"] = url;
  obj["params"] = data;
  obj["responseType"] = type ? "blob" : "json";

  if (url && data) {
    const instance = axios.create();
    instance.defaults.headers["Authorization"] = window._TOKEN_ || "";
    let response = new Promise((resolve, reject) => {
      instance.request(obj).then(res => {
        if (res.data instanceof Blob) {
          return resolve(res);
        }
      }).catch(error => {
        if (error.response) {
          if (error.response.status == "400" || error.response.status == "404") {
            message.error("客户端请求错误！");
          } else if (error.response.status == "500") {
            message.error("服务器内部错误！");
          }
        } else {
          message.error("请求失败！");
        }
        return reject(error);
      });
    });
    return response;
  } else {
    message.error("请求格式不正确！");
    return null;
  }
}
