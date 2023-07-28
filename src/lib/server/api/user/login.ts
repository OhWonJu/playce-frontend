import { _POST } from "@lib/server/rootAPI";
import { LogInProps } from "src/commonTypes/users";

export const _LOGIN = async (params: LogInProps) => {
  const result = await _POST("api/auth/login", params);
  return result.data;
};
