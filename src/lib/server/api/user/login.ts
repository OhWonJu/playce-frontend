import { _POST } from "@lib/server/rootAPI";
import { LogInProps } from "src/commonTypes/users";

export async function _LOGIN(data: LogInProps) {
  return await _POST("/api/users/logIn", data);
}