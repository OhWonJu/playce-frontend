import { _GET } from "@lib/server/rootAPI";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useEventQuery = ({
  key,
  endPoint,
  onSuccessFn,
}: {
  key: string;
  endPoint: string;
  onSuccessFn?: (data: any) => void;
}) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [key],
    queryFn: async () => await _GET(endPoint),
    enabled: false,
    // onSuccess: data => onSuccessFn(data.data),
  });

  useEffect(() => {
    onSuccessFn && onSuccessFn(data?.data);
  }, [data]);

  return { isLoading, refetch };
};

export default useEventQuery;
