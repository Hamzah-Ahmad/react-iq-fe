import { useState, useCallback } from "react";
import {
  useQuery,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";

type QueryFunction<T> = () => Promise<T>;

interface UseLazyQueryResult<T> {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isFetched: boolean;
  fetch: () => void;
}

function useLazyQuery<T>(
  queryFn: QueryFunction<T>,
  queryKey: QueryKey,
  options: Record<string, string> = {}
): UseLazyQueryResult<T> {
  const [enabled, setEnabled] = useState(false);

  const { data, error, isLoading, isFetched, refetch }: UseQueryResult<T> =
    useQuery({
      queryFn,
      queryKey,
      ...options,
      enabled,
    });

  const fetch = useCallback(() => {
    setEnabled(true);
    refetch();
  }, [refetch]);

  return {
    data,
    error,
    isLoading,
    isFetched,
    fetch,
  };
}

export default useLazyQuery;
