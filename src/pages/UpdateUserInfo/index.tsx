/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-09-02 17:23:36
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-09-02 17:51:31
 * @Description:
 */
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import UserService from "../../api/user";
import EmailService from "../../api/email";

export interface UpdateUserInfoType {
  headPic: string;
  nickname: string;
  email: string;
  captcha: string;
}

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default function UpdateInfo() {
  const [form] = useForm();
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const res = await UserService.getUserInfo();
      const info = res.data;
      form.setFieldsValue({
        email: info.email,
        headPic: info.headPic,
        nickname: info.nickname,
      });
    } catch (error) {}
  };

  const onFinish = async (values: UpdateUserInfoType) => {
    try {
      await UserService.updateUserInfo(values);
      message.success("更新成功");
    } catch (error) {}
  };

  const sendCaptcha = async () => {
    const email = form.getFieldValue("email");
    if (!email) {
      message.error("请输入邮箱");
      return;
    }
    try {
      await EmailService.sendCaptcha(email);
      message.success("发送成功");
    } catch (error) {}
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div id="updateInfo-container">
      <Form
        form={form}
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >
        <Form.Item
          label="头像"
          name="headPic"
          rules={[
            { required: true, message: "请输入头像!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="昵称"
          name="nickname"
          rules={[
            { required: true, message: "请输入昵称!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入邮箱!" },
            {
              type: "email",
              message: "请输入合法邮箱地址!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="captcha-wrapper">
          <Form.Item
            label="验证码"
            name="captcha"
            rules={[
              { required: true, message: "请输入验证码!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" onClick={sendCaptcha}>
            发送验证码
          </Button>
        </div>

        <Form.Item {...layout1} label=" ">
          <Button
            className="btn"
            type="primary"
            htmlType="submit"
          >
            修改密码
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
