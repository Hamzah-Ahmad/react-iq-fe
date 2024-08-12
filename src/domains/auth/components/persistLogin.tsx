import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "../hooks/useAuth";
import Spinner from "shared/components/ui/spinner";
import { notifyError } from "shared/lib/utils";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        notifyError(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
