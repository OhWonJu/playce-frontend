import { _GET } from "@lib/server/rootAPI";

export const _ME = async () => {
  const result = await _GET("api/users/me");
  return result.data;
};
