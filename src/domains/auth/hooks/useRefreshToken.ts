import { notifyError } from "shared/lib/utils";
import axios from "../../../shared/config/axios";
import { useAuth } from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    //TODO: Debug issue of multiple refresh requests being sent out
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      setAuth((prev) => {
        return {
          ...prev,
          user: response?.data?.user,
          accessToken: response?.data?.accessToken,
        };
      });
      return response?.data?.accessToken;
    } catch (err) {
      notifyError(err);
    }
  };
  return refresh;
};

export default useRefreshToken;
