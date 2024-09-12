/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-09-02 17:14:41
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-09-02 17:31:36
 * @Description:
 */
import { UserOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import "./index.css";

export default function Layout() {
  return (
    <div id="index-container">
      <div className="header">
        <h1>聊天室</h1>
        <UserOutlined className="icon" />
      </div>

      <div className="body">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
