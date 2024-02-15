import { getItem, setItem } from "../utils";
import { customAxios } from "./axios";

export const refreshToken = () => {
  const token = getItem("authtoken");

  customAxios
    .post("/auth/refreshToken", { token })
    .then((res) => {
      console.log("Refresh token received: ", res.data.token);
      setItem("authtoken", res.data.token);
    })
    .catch((err) => {
      console.log({ err });
    });
};
