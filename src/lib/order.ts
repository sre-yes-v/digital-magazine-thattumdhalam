import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";

export type OrderStatus =
  | "created"
  | "paid"
  | "failed";

export interface Order {
  _id?: ObjectId;

  userId: ObjectId;

  magazineId: "latest";

  amount: number;

  currency: "INR";

  razorpayOrderId: string;

  razorpayPaymentId?: string;

  status: OrderStatus;

  createdAt: Date;

  paidAt?: Date;
}

const ORDERS_COLLECTION = "orders";

async function getOrdersCollection() {
  const databaseName = process.env.MONGODB_DB;

  if (!databaseName) {
    throw new Error("MONGODB_DB is not defined");
  }

  const client = await clientPromise;

  return client
    .db(databaseName)
    .collection<Order>(ORDERS_COLLECTION);
}

export async function createOrder(
  order: Omit<Order, "_id">
) {
  const orders = await getOrdersCollection();

  const result = await orders.insertOne(order);

  return {
    ...order,
    _id: result.insertedId,
  };
}

export async function findOrderByRazorpayOrderId(
  razorpayOrderId: string
) {
  const orders = await getOrdersCollection();

  return orders.findOne({
    razorpayOrderId,
  });
}

export async function findOrderById(
  orderId: string
) {
  const orders = await getOrdersCollection();

  if (!ObjectId.isValid(orderId)) {
    return null;
  }

  return orders.findOne({
    _id: new ObjectId(orderId),
  });
}

export async function markOrderAsPaid(
  razorpayOrderId: string,
  razorpayPaymentId: string
) {
  const orders = await getOrdersCollection();

  return orders.findOneAndUpdate(
    {
      razorpayOrderId,
    },
    {
      $set: {
        status: "paid",
        razorpayPaymentId,
        paidAt: new Date(),
      },
    },
    {
      returnDocument: "after",
    }
  );
}


export async function hasUserPaidForMagazine(
  userId: string,
  magazineId: "latest"
) {
  const orders = await getOrdersCollection();

  if (!ObjectId.isValid(userId)) {
    return false;
  }

  const order = await orders.findOne({
    userId: new ObjectId(userId),
    magazineId,
    status: "paid",
  });

  return !!order;
}