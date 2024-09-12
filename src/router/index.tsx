/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-09-02 13:43:56
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-09-03 13:56:27
 * @Description:
 */
/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-09-02 13:43:56
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-09-02 18:09:28
 * @Description:
 */
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UpdatePassword from "../pages/UpdatePassword";
import Index from "../pages/Index";
import UpdateUserInfo from "../pages/UpdateUserInfo";
import Menu from "../pages/Index/components/Menu";
import Group from "../pages/Index/components/Group";
import Friendship from "../pages/Index/components/Friendship";
import Chat from "../pages/Index/components/Chat";
import Collection from "../pages/Index/components/Collection";
import Notification from "../pages/Index/components/Notification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "update_info",
        element: <UpdateUserInfo />,
      },
      {
        path: "/",
        element: <Menu></Menu>,
        children: [
          {
            path: "/",
            element: <Friendship></Friendship>,
          },
          {
            path: "/group",
            element: <Group></Group>,
          },
          {
            path: "chat",
            element: <Chat></Chat>,
          },
          {
            path: "collection",
            element: <Collection></Collection>,
          },
          {
            path: "notification",
            element: <Notification></Notification>,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "update_password",
    element: <UpdatePassword />,
  },
]);

export default router;
