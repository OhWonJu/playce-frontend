import { _GET } from "@lib/server/rootAPI";
import { useQuery } from "@tanstack/react-query";

export const useEventQuery = ({
  key,
  endPoint,
  onSuccessFn = (data: any) => {},
}: {
  key: string;
  endPoint: string;
  onSuccessFn?: (data: any) => void;
}) =>
  useQuery({
    queryKey: [key],
    queryFn: async () => await _GET(endPoint),
    enabled: false,
    onSuccess: data => onSuccessFn(data.data),
  });

export default useEventQuery;
