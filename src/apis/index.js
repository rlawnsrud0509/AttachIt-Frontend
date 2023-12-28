import axios from "axios";

export const instance = axios.create({
  baseURL: "http://attachit.kro.kr/api/",
});

export const Authorization = (ContentType) => {
  const access = localStorage.getItem("access-token");
  const refresh = localStorage.getItem("refresh-token");
  return ContentType
    ? {
        headers: {
          Authorization: `Bearer ${access}`,
          "Authorization-refresh": `Bearer ${refresh}`,
          "Content-Type": ContentType,
        },
      }
    : {
        headers: {
          Authorization: `Bearer ${access}`,
          "Authorization-refresh": `Bearer ${refresh}`,
        },
      };
};
