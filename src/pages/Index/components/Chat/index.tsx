/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-09-02 18:08:19
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-09-07 14:32:04
 * @Description:
 */

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./index.css";

interface Message {
  type: "text" | "image";
  content: string;
}

interface JoinRoomPayload {
  chatroomId: number;
  uid: number;
}

interface SendMessagePayload {
  sendUid: number;
  chatroomId: number;
  message: Message;
}

type Reply =
  | {
      type: "sendMessage";
      uid: number;
      message: Message;
    }
  | {
      type: "joinRoom";
      uid: number;
    };

interface Chatroom {
  id: number;
  name: string;
  createTime: Date;
}

export default function Chat() {
  const [messageList, setMessageList] = useState<Message[]>(
    []
  );
  const [chatroomList, setChatroomList] = useState<
    Chatroom[]
  >([]);
  const socketRef = useRef<Socket>();

  const sendMessage = (value: string) => {
    const payload2: SendMessagePayload = {
      sendUid: 5,
      chatroomId: 1,
      message: {
        type: "text",
        content: value,
      },
    };
    socketRef.current?.emit("sendMessage", payload2);
  };

  // 聊天室列表
  const queryChatroomList = async () => {};

  useEffect(() => {
    const socket = (socketRef.current = io(
      "http://localhost:3000"
    ));

    socket.on("connect", () => {
      const payload: JoinRoomPayload = {
        chatroomId: 1,
        uid: 5,
      };

      socket.emit("joinRoom", payload);

      socket.on("message", (reply: Reply) => {
        if (reply.type === "joinRoom") {
          setMessageList((messageList) => [
            ...messageList,
            {
              type: "text",
              content: "用户 " + reply.uid + "加入聊天室",
            },
          ]);
        } else {
          setMessageList((messageList) => [
            ...messageList,
            reply.message,
          ]);
        }
      });
    });
  }, []);
  return (
    <div id="chat-container">
      <div className="chat-room-list">
        <div className="chat-room-item">技术交流群</div>
        <div className="chat-room-item selected">
          技术交流群
        </div>
        <div className="chat-room-item">技术交流群</div>
        <div className="chat-room-item">技术交流群</div>
      </div>
      <div className="message-list">
        <div className="message-item">
          <div className="message-sender">
            <img src="http://localhost:9000/chat-room/dong.png" />
            <span className="sender-nickname">
              神说要有光
            </span>
          </div>
          <div className="message-content">你好</div>
        </div>
        <div className="message-item">
          <div className="message-sender">
            <img src="http://localhost:9000/chat-room/dong.png" />
            <span className="sender-nickname">
              神说要有光
            </span>
          </div>
          <div className="message-content">你好</div>
        </div>
        <div className="message-item from-me">
          <div className="message-sender">
            <img src="http://localhost:9000/chat-room/dong.png" />
            <span className="sender-nickname">
              神说要有光
            </span>
          </div>
          <div className="message-content">你好</div>
        </div>
      </div>
    </div>
  );
}
