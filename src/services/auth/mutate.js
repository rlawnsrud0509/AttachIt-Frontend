import { useMutation } from "react-query";
import { userLogin, userLogout } from "./api";
import { useNavigate } from "react-router-dom";

export const useUserLoginMutation = (code) => {
  const navigate = useNavigate();

  const { mutate: userLoginMutate, ...restMutation } = useMutation({
    mutationFn: () => userLogin(code),
    onSuccess: (res) => {
      console.log(res);
      window.localStorage.setItem("access-token", res.accessToken);
      window.localStorage.setItem("refresh-token", res.refreshToken);

      navigate("/");
    },
  });

  return { userLoginMutate, ...restMutation };
};

export const useUserLogoutMutation = () => {
  const navigate = useNavigate();

  const { mutate: userLogoutMutate, ...restMutation } = useMutation({
    mutationFn: () => userLogout(),
    onSuccess: () => {
      window.localStorage.removeItem("access-token");
      window.localStorage.removeItem("refresh-token");

      navigate(0);
    },
  });

  return { userLogoutMutate, ...restMutation };
};
