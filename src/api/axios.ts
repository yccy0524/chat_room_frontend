/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-09-02 14:17:23
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-09-02 17:43:06
 * @Description:
 */
import { message } from "antd";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("request>>>>>>", config);
  config.headers["Authorization"] =
    token && `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 400) {
      return Promise.resolve(response.data);
    } else {
      message.error(response.data.msg);
      return Promise.reject(response.data);
    }
  },
  (err) => {
    if (err.response?.data?.msg) {
      message.error(err.response.data.msg);
    }
    return Promise.reject(err);
  }
);

export default instance;
