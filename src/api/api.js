/*
 * @Author: lichunfeng
 * @Date: 2020-06-22 17:12:42
 * @LastEditors: lichunfeng duuuuufu@gmail.com
 * @LastEditTime: 2024-06-04 14:21:26
 * @Description:
 */

import service from "./request";
import config from "../config";

export function getButtons() {
  return service({
    url: "/web/land/version/download",
    method: "get",
  });
}

export function upDownLoad(data) {
  return service({
    url: "/web/land/button/click",
    method: "put",
    data,
  });
}

export function getButtonStatus(params) {
  return service({
    url: "/web/land/button/status",
    method: "get",
    params,
  });
}

export function getChApk(params) {
  return service({
    url: "/web/land/version/chApk",
    method: "get",
    params,
  });
}

export function getClipApp(params) {
  return service({
    url: "/web/land/version/WebClip/download",
    method: "get",
    params,
    responseType: "blob",
  });
}

export function getContactAndCustomer() {
  return service({
    url: "/web/land/contactAndCustomer",
    method: "get",
  });
}

// 数据中心埋点上报
export function eventTrancking(data) {
  return service({
    baseURL: config.dataReportingUrl,
    url: "/web/dataReport",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

// 本地联调服务探活
export async function toLocalServer() {
  const deviceId = localStorage.getItem("deviceId") || "";
  const resp = await service({
    url: `${config.localServerUrl}/__land?trace_id=${deviceId}`,
    method: "get",
  });
  // eslint-disable-next-line no-console
  console.log("toLocalServer resp:", resp);
  return resp;
}
