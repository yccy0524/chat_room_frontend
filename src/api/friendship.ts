/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-09-02 16:02:45
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-09-03 16:37:59
 * @Description:
 */
import instance from "./axios";

export default class FriendshipService {
  // 好友列表
  static getFriendList(name?: string) {
    return instance.get("/friendship/list", {
      params: {
        name,
      },
    });
  }

  // 添加好友申请
  static addFriend(username: string, reason: string) {
    return instance.post("/friendship/add", {
      username,
      reason,
    });
  }

  // 获取好友申请
  static getFriendRequestList() {
    return instance.get("/friendship/getFriendRequestList");
  }

  // 同意添加好友
  static agree(uid: number) {
    return instance.get(
      `/friendship/agree/${uid}`
    );
  }

  // 拒绝添加好友
  static reject(uid: number) {
    return instance.get(
      `/friendship/reject/${uid}`
    );
  }
}
