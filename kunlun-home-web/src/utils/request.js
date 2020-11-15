import axios from 'axios';
import { message } from 'antd';

axios.defaults.timeout = 300000;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export function get(url, data) {
  if (url) {
    let getUrl = "";
    if (data) {
      Object.keys(data).forEach((item) => {
        if (data[item]) {
          getUrl += item + "=" + data[item] + "&";
        }
      });
    } else {
      getUrl = url;
    }
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
          if (error.response.status == "400" || error.response.status == "404") {
            message.error("客户端请求错误！");
          } else if (error.response.status == "500") {
            message.error("服务器内部错误！");
          }
        } else {
          message.error("请求失败！");
        }
        console.log("Get Request " + error);
        return reject(error);
      });
    });
    return response;
  } else {
    console.log("Get Request Params:  [url] ===> " + url + " [data] ===> " + data);
    message.error("请求格式不正确！");
    return null;
  }
}

export function post(url, data) {
  if (url && data) {
    const params = {
      method: "post",
      url: url,
      data: data
    };

    const instance = axios.create();
    instance.interceptors.request.use(config => {
      config.headers["Authorization"] = window._TOKEN_ || "";
      config.timeout = 300000;
      return config;
    });

    instance.post(params).then(res => {
      return res
    }).catch(error => {
      if (error.response.status == "400" || error.response.status == "404") {
        message.error("客户端请求错误！");
      } else if (error.response.status == "500") {
        message.error("服务器内部错误！");
      }
      console.log("Post Request " + error);
      return error;
    })
  } else {
    console.log("Post Request Params:  [url] ===> " + url + " [data] ===> " + data);
    message.error("请求格式不正确！");
    return null;
  }
}
