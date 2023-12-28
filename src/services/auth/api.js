import { Authorization, instance } from "../../apis";

export const userLogin = async (code) => {
  const { data } = await instance.post(`auth?code=${code}`);
  return data;
};

export const userLogout = async () => {
  const { data } = await instance.post("auth/signout", Authorization());
  return data;
};

export const getUserdata = async () => {
  const { data } = await instance.get("user", Authorization());
  return data;
};
