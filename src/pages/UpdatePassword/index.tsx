/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-09-02 14:06:32
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-09-02 17:12:42
 * @Description:
 */
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import "./index.css";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmailService from "../../api/email";
import UserService from "../../api/user";

export interface UpdatePassword {
  email: string;
  captcha: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default function UpdatePassword() {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = async (values: UpdatePassword) => {
    await UserService.updatePassword({
      username: values.username,
      email: values.email,
      password: values.password,
      captcha: values.captcha,
    });
    message.success("修改成功");
    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }, 1000);
  };

  const sendCaptcha = async function () {
    console.log("send captcha");
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

  return (
    <div id="updatePassword-container">
      <h1>聊天室</h1>
      <Form
        form={form}
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: "请输入用户名!" },
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

        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: "请输入密码!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            { required: true, message: "请输入确认密码!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...layout1} label=" ">
          <Button
            className="btn"
            type="primary"
            htmlType="submit"
          >
            修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
