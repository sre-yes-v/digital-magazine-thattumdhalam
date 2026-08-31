import crypto from "crypto";
import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";

const SESSION_DURATION = 20 * 24 * 60 * 60 * 1000;
const SESSIONS_COLLECTION = "sessions";

export interface Session {
  _id?: ObjectId;
  sessionIdHash: string;
  userId: ObjectId;
  createdAt: Date;
  expiresAt: Date;
}

function hashSessionId(sessionId: string) {
  return crypto
    .createHash("sha256")
    .update(sessionId)
    .digest("hex");
}

async function getSessionsCollection() {
  const databaseName = process.env.MONGODB_DB;

  if (!databaseName) {
    throw new Error("MONGODB_DB is not defined");
  }

  const client = await clientPromise;

  return client
    .db(databaseName)
    .collection<Session>(SESSIONS_COLLECTION);
}

export async function createSession(userId: ObjectId) {
  const sessions = await getSessionsCollection();

  // Generate a cryptographically secure random session ID
  const sessionId = crypto.randomBytes(32).toString("hex");

  const now = new Date();

  const expiresAt = new Date(
    now.getTime() + SESSION_DURATION
  );

  const session: Session = {
    sessionIdHash: hashSessionId(sessionId),
    userId,
    createdAt: now,
    expiresAt,
  };

  await sessions.insertOne(session);

  return {
    sessionId,
    expiresAt,
  };
}

export async function getSession(sessionId: string) {
  const sessions = await getSessionsCollection();

  const sessionIdHash = hashSessionId(sessionId);

  const session = await sessions.findOne({
    sessionIdHash,
  });

  if (!session) {
    return null;
  }

  // Session expired
  if (session.expiresAt.getTime() <= Date.now()) {
    await sessions.deleteOne({
      _id: session._id,
    });

    return null;
  }

  return session;
}

export async function deleteSession(sessionId: string) {
  const sessions = await getSessionsCollection();

  const sessionIdHash = hashSessionId(sessionId);

  await sessions.deleteOne({
    sessionIdHash,
  });
}