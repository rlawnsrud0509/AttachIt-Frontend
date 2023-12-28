import { useQuery } from "react-query";
import { getUserdata } from "./api";
import { useNavigate } from "react-router-dom";

export const useGetUserdataQuery = () => {
  const navigate = useNavigate();

  const { data, ...restQuery } = useQuery({
    queryKey: ["getuserdata"],
    queryFn: () => getUserdata(),
    onSuccess: () => navigate(0),
  });

  return { data, ...restQuery };
};
