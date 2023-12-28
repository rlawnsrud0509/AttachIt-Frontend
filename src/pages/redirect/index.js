import React, { useEffect } from "react";
import { useUserLoginMutation } from "../../services/auth/mutate";

const Redirect = () => {
  const code = new URLSearchParams(window?.location.search).get("code");
  const { userLoginMutate } = useUserLoginMutation(code);

  useEffect(() => {
    userLoginMutate();
  }, []);

  return <div></div>;
};

export default Redirect;
