import clientPromise from "./mongodb";

export async function createDatabaseIndexes() {
  const databaseName = process.env.MONGODB_DB;

  if (!databaseName) {
    throw new Error("MONGODB_DB is not defined");
  }

  const client = await clientPromise;

  const db = client.db(databaseName);

  // Users
  await db.collection("users").createIndex(
    { phone: 1 },
    { unique: true }
  );

  // Sessions
  await db.collection("sessions").createIndex(
    { sessionIdHash: 1 },
    { unique: true }
  );

  // Automatically remove expired sessions
  await db.collection("sessions").createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
  );
}