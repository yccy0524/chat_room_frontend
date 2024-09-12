import { RegisterUser } from "../pages/Register";
import { UpdatePassword } from "../pages/UpdatePassword";
import { UpdateUserInfoType } from "../pages/UpdateUserInfo";
import instance from "./axios";

export default class UserService {
  static login(username: string, password: string) {
    return instance.post("/user/login", {
      username,
      password,
    });
  }

  static register(
    data: Omit<RegisterUser, "confirmPassword">
  ) {
    return instance.post("/user/register", data);
  }

  static updatePassword(
    data: Omit<UpdatePassword, "confirmPassword">
  ) {
    return instance.post("/user/updatePassword", data);
  }

  static getUserInfo() {
    return instance.get("/user/getUserInfo");
  }

  static updateUserInfo(data: UpdateUserInfoType) {
    return instance.post("/user/updateUserInfo", data);
  }
}
