import { useMutation } from "react-query";
import { userLogin } from "./api";
import { useNavigate } from "react-router-dom";

export const useUserLoginMutation = (code) => {
  const navigate = useNavigate();

  const { mutate: userLoginMutate, ...restMutation } = useMutation({
    mutationFn: () => userLogin(code),
    onSuccess: (res) => {
      localStorage.setItem("access-token", res.data.accessToken);
      localStorage.setItem("refresh-token", res.data.refreshToken);

      navigate("/");
    },
  });

  return { userLoginMutate, ...restMutation };
};
