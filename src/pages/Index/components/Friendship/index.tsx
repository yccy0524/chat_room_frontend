/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-09-02 18:06:18
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-09-03 15:48:19
 * @Description:
 */
import {
  Badge,
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  message,
} from "antd";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./index.css";
import { ColumnsType } from "antd/es/table";
import { useForm } from "antd/es/form/Form";
import FriendshipService from "../../../../api/friendship";
import AddFriendModal from "../AddFriendModal";

interface SearchFriend {
  name: string;
}

interface FriendshipSearchResult {
  id: number;
  username: string;
  nickname: string;
  headePic: string;
  email: string;
}

export default function Friendship() {
  const [friendshipResult, setFriendshipResult] = useState<
    Array<FriendshipSearchResult>
  >([]);

  const [addFriendModalOpen, setAddFriendModalOpen] =
    useState(false);

  const columns: ColumnsType<FriendshipSearchResult> =
    useMemo(
      () => [
        {
          title: "昵称",
          dataIndex: "nickname",
        },
        {
          title: "头像",
          dataIndex: "headePic",
          render: (_, record) => (
            <div>
              <img src={record.headePic} />
            </div>
          ),
        },
        {
          title: "邮箱",
          dataIndex: "email",
        },
        {
          title: "操作",
          render: (_, record) => (
            <div>
              <a href="#">聊天</a>
            </div>
          ),
        },
      ],
      []
    );

  const searchFriend = async (values: SearchFriend) => {
    console.log("values", values);
    try {
      const res = await FriendshipService.getFriendList(
        values.name
      );
      setFriendshipResult(res.data);
    } catch (error) {}
  };

  const [form] = useForm();

  useEffect(() => {
    searchFriend({
      name: form.getFieldValue("name"),
    });
  }, []);

  return (
    <div id="friendship-container">
      <div className="friendship-form">
        <Form
          form={form}
          onFinish={searchFriend}
          name="search"
          layout="inline"
          colon={false}
        >
          <Form.Item label="名称" name="name">
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>

          <Form.Item label=" ">
            <Button
              type="primary"
              style={{ background: "green" }}
              onClick={() => setAddFriendModalOpen(true)}
            >
              添加好友
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="friendship-table">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={friendshipResult}
          style={{ width: "1000px" }}
        />
      </div>

      <AddFriendModal
        isOpen={addFriendModalOpen}
        handleClose={() => {
          setAddFriendModalOpen(false);
        }}
      />
    </div>
  );
}
