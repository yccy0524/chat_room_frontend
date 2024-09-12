/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-09-02 14:02:28
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-09-02 16:15:54
 * @Description:
 */
import { Button, Form, Input, message } from "antd";
import "./index.css";
import { useForm } from "antd/es/form/Form";
import EmailService from "../../api/email";
import UserService from "../../api/user";
import { useNavigate } from "react-router-dom";

export interface RegisterUser {
  username: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  email: string;
  captcha: string;
}

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export default function Register() {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = async (values: RegisterUser) => {
    await UserService.register({
      nickname: values.nickname,
      username: values.username,
      password: values.password,
      email: values.email,
      captcha: values.captcha,
    });
    message.success("注册成功");
    navigate("/login");
  };

  const sendEmail = async () => {
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
    <div id="register-container">
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
          label="昵称"
          name="nickname"
          rules={[
            { required: true, message: "请输入昵称!" },
          ]}
        >
          <Input />
        </Form.Item>

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
          <Button type="primary" onClick={sendEmail}>
            发送验证码
          </Button>
        </div>

        <Form.Item {...layout2}>
          <div className="links">
            已有账号？去<a href="/login">登录</a>
          </div>
        </Form.Item>

        <Form.Item {...layout1} label=" ">
          <Button
            className="btn"
            type="primary"
            htmlType="submit"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
