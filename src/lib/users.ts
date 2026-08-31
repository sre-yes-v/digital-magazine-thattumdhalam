/* src/lib/users.ts */

import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";

export interface User {
  _id?: ObjectId;
  phone: string;
  passwordHash: string;
  createdAt: Date;
}

const USERS_COLLECTION = "users";

async function getUsersCollection() {
  const databaseName = process.env.MONGODB_DB;

  if (!databaseName) {
    throw new Error("MONGODB_DB is not defined");
  }

  const client = await clientPromise;

  return client
    .db(databaseName)
    .collection<User>(USERS_COLLECTION);
}

export async function findUserByPhone(phone: string) {
  const users = await getUsersCollection();

  return users.findOne({ phone });
}

export async function findUserById(userId: string) {
  const users = await getUsersCollection();

  if (!ObjectId.isValid(userId)) {
    return null;
  }

  return users.findOne({
    _id: new ObjectId(userId),
  });
}

export async function createUser(
  phone: string,
  passwordHash: string
) {
  const users = await getUsersCollection();

  const user: User = {
    phone,
    passwordHash,
    createdAt: new Date(),
  };

  const result = await users.insertOne(user);

  return {
    ...user,
    _id: result.insertedId,
  };
}