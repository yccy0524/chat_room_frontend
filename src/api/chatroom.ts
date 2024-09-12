/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-09-02 16:02:45
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-09-03 15:00:44
 * @Description:
 */
import instance from "./axios";

export default class ChatroomService {
  // 群聊列表
  static getChatroomList(
    pageNum: number,
    pageSize: number,
    roomName?: string
  ) {
    return instance.post("/chatroom/getRoomList", {
      roomName,
      pageNum,
      pageSize,
    });
  }
}
