import { NextApiRequest, NextApiResponse } from "next";

// http path 상에서 접근하지 못하도록 막는 역할?

export default function withHandler(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void,
) {
  console.log("handler Call");
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
