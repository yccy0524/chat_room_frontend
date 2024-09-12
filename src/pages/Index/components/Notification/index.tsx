import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  Tabs,
  TabsProps,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import "./index.css";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import FriendshipService from "../../../../api/friendship";

interface User {
  id: number;
  headePic: string;
  nickname: string;
  email: string;
  username: string;
}

interface FriendRequest {
  id: number;
  fromUid: number;
  toUid: number;
  reason: string;
  createTime: Date;
  fromUser?: User;
  toUser?: User;
  status: number;
}

export default function Notification() {
  const [form] = useForm();
  const [fromMe, setFromMe] = useState<FriendRequest[]>([]);
  const [toMe, setToMe] = useState<FriendRequest[]>([]);

  const getFriendRequestList = async () => {
    try {
      const res =
        await FriendshipService.getFriendRequestList();
      setFromMe(res.data.fromMe);
      setToMe(res.data.toMe);
    } catch (error) {}
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const agree = async (uid: number) => {
    try {
      await FriendshipService.agree(uid);
      getFriendRequestList();
    } catch (error) {}
  };

  const reject = async (uid: number) => {
    try {
      await FriendshipService.reject(uid);
      getFriendRequestList();
    } catch (error) {}
  };

  const toMeColumns: ColumnsType<FriendRequest> = [
    {
      title: "用户",
      key: "user",
      render: (_, record) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={record.fromUser!.headePic}
              width={30}
              height={30}
            />
            {" " +
              record.fromUser!.nickname +
              " 请求加你为好友"}
          </div>
        );
      },
    },

    {
      title: "请求时间",
      render: (_, record) => {
        return new Date(record.createTime).toLocaleString();
      },
    },
    {
      title: "操作",
      render: (_, record) => {
        const map: Record<string, any> = {
          0: "申请中",
          1: "已通过",
          2: "已拒绝",
        };
        if (record.status === 0) {
          return (
            <div>
              <a onClick={() => agree(record.fromUser!.id)}>
                同意
              </a>
              <br />
              <a
                onClick={() => reject(record.fromUser!.id)}
              >
                拒绝
              </a>
            </div>
          );
        } else {
          return <div>{map[record.status]}</div>;
        }
      },
    },
  ];

  const fromMeColumns: ColumnsType<FriendRequest> = [
    {
      title: "用户",
      render: (_, record) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {" 请求添加好友 " + record.toUser?.nickname}
            <img
              src={record.toUser?.headePic}
              width={30}
              height={30}
            />
          </div>
        );
      },
    },

    {
      title: "请求时间",
      render: (_, record) => {
        return new Date(record.createTime).toLocaleString();
      },
    },
    {
      title: "状态",
      render: (_, record) => {
        const map: Record<string, any> = {
          0: "申请中",
          1: "已通过",
          2: "已拒绝",
        };
        return <div>{map[record.status]}</div>;
      },
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "发给我的",
      children: (
        <div style={{ width: 1000 }}>
          <Table
            rowKey="id"
            columns={toMeColumns}
            dataSource={toMe}
            style={{ width: "1000px" }}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "我发出的",
      children: (
        <div style={{ width: 1000 }}>
          <Table
            rowKey="id"
            columns={fromMeColumns}
            dataSource={fromMe}
            style={{ width: "1000px" }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getFriendRequestList();
  }, []);

  return (
    <div id="notification-container">
      <div className="notification-list">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
