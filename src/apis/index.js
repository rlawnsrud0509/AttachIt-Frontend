import axios from "axios";

export const instance = axios.create({
  baseURL: "http://attachit.kro.kr/api/",
});

export const Authorization = () => {
  const access = localStorage.getItem("access-token");
  const refresh = localStorage.getItem("refresh-token");

  return {
    headers: {
      accessToken: `Bearer ${access}`,
      refreshToken: `Bearer ${refresh}`,
    },
  };
};
