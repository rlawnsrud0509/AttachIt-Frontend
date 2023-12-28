import axios from "axios";

export const instance = axios.create({
  baseURL: "http://attachit.kro.kr/api/",
});

export const Authorization = () => {
  const access = localStorage.getItem("access-token");
  const refresh = localStorage.getItem("refresh-token");

  return {
    headers: {
      Authorization: `Bearer ${access}`,
      "Authorization-refresh": `Bearer ${refresh}`,
    },
  };
};
