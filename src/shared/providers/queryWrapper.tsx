import { useMemo } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useLocation, useNavigate } from "react-router-dom";

function createQueryClientWithContext({
  redirectToLogin,
}: {
  redirectToLogin: any;
}) {
  function globalErrorHandler(error: any, isQuery = false) {
    // The onError callback is being deprecated. Hence, in order to display toasts on error for queries, we are using the approach below. The alert should ONLY run for queries as we are passing onError for mutations wherver we are using them.

    if ([401, 403].includes(error?.response?.status)) {
      redirectToLogin();
    } else if (isQuery) {
      let message = "";
      if (typeof error === "string") {
        message = error;
      } else {
        // console.log("err: ", error?.response?.data?.message);
        message = error?.response?.data?.message?.[0];
      }
      alert(message || "Something went wrong");
    }
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: async (error) => {
        globalErrorHandler(error, true);
      },
    }),
    mutationCache: new MutationCache({
      onError: async (error) => {
        globalErrorHandler(error);
      },
    }),
  });

  return queryClient;
}

export function useCustomQueryClient(): any {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectToLogin = () =>
    navigate("/login", { state: { from: location }, replace: true });

  const queryClient = useMemo(
    () => createQueryClientWithContext({ redirectToLogin }),
    // eslint-disable-next-line
    []
  );

  return queryClient;
}

function CustomQueryClientProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const queryClient = useCustomQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default CustomQueryClientProvider;
