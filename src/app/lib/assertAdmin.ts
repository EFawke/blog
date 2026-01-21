import type { NextApiRequest } from "next";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

export async function assertAdmin(req: NextApiRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    const err = new Error("Not signed in");
    // @ts-expect-error
    err.statusCode = 401;
    throw err;
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  
  if (user.publicMetadata?.role !== "admin") {
    const err = new Error("Forbidden");
    // @ts-expect-error
    err.statusCode = 403;
    throw err;
  }

  return user;
}
