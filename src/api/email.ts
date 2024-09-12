/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-09-02 16:02:45
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-09-02 16:06:11
 * @Description:
 */
import instance from "./axios";

export default class EmailService {
  static sendCaptcha(email: string) {
    return instance.get("/email/sendCaptcha", {
      params: {
        email,
      },
    });
  }
}
