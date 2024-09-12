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
import ChatroomService from "../../../../api/chatroom";

interface SearchGroup {
  name: string;
}

interface GroupSearchResult {
  id: number;
  name: string;
  createTime: Date;
}

export default function Group() {
  const [groupResult, setGroupResult] = useState<
    Array<GroupSearchResult>
  >([]);

  const columns: ColumnsType<GroupSearchResult> = useMemo(
    () => [
      {
        title: "名称",
        dataIndex: "name",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
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

  const searchGroup = async (values: SearchGroup) => {
    try {
      const res = await ChatroomService.getChatroomList(
        1,
        100,
        values.name || ""
      );

      setGroupResult(
        res.data.map((item: GroupSearchResult) => {
          return {
            ...item,
          };
        })
      );
    } catch (e: any) {}
  };

  const [form] = useForm();

  useEffect(() => {
    searchGroup({
      name: form.getFieldValue("name"),
    });
  }, []);

  return (
    <div id="group-container">
      <div className="group-form">
        <Form
          form={form}
          onFinish={searchGroup}
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
        </Form>
      </div>
      <div className="group-table">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={groupResult}
          style={{ width: "1000px" }}
        />
      </div>
    </div>
  );
}
