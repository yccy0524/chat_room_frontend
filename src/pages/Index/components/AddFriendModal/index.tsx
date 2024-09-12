import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import FriendshipService from "../../../../api/friendship";

interface AddFriendModalProps {
  isOpen: boolean;
  handleClose: Function;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export interface AddFriend {
  username: string;
  reason: string;
}

export default function AddFriendModal(
  props: AddFriendModalProps
) {
  const [form] = useForm<AddFriend>();

  const handleOk = async function () {
    const { username, reason } = form.getFieldsValue();
    try {
      await FriendshipService.addFriend(username, reason);
      message.success("好友申请已发送");
      setTimeout(() => {
        form.resetFields();
        props.handleClose && props.handleClose();
      }, 1000);
    } catch (error) {}
  };

  return (
    <Modal
      title="添加好友"
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => props.handleClose()}
      okText={"发送好友请求"}
      cancelText={"取消"}
    >
      <Form form={form} colon={false} {...layout}>
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
          label="添加理由"
          name="reason"
          rules={[
            { required: true, message: "请输入添加理由!" },
          ]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
