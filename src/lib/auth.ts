import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

import { getSession } from "./session";
import { findUserById } from "./users";

const SESSION_COOKIE_NAME = "session_id";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    return null;
  }

  const session = await getSession(sessionId);

  if (!session) {
    return null;
  }

  const user = await findUserById(session.userId.toString());

  if (!user) {
    return null;
  }

  return {
    id: user._id!.toString(),
    phone: user.phone,
  };
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return user;
}