import clientPromise from "./mongodb";

export async function createOrderIndexes() {
  const databaseName = process.env.MONGODB_DB;

  if (!databaseName) {
    throw new Error("MONGODB_DB is not defined");
  }

  const client = await clientPromise;

  const db = client.db(databaseName);

  await db.collection("orders").createIndex(
    {
      razorpayOrderId: 1,
    },
    {
      unique: true,
    }
  );

  await db.collection("orders").createIndex({
    userId: 1,
    createdAt: -1,
  });

  return {
    success: true,
  };
}