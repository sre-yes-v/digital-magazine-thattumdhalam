import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import { razorpay } from "@/lib/razorpay";
import { getCurrentUser } from "@/lib/auth";
import { createOrder } from "@/lib/order";

const MAGAZINE_ID = "latest";
const MAGAZINE_PRICE_RUPEES = 100;
const MAGAZINE_PRICE_PAISE = MAGAZINE_PRICE_RUPEES * 100;

export async function POST() {
  try {
    console.log("1. Getting current user...");

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }

    console.log("2. User found:", user.id);

    console.log("3. Creating Razorpay order...");

    const razorpayOrder = await razorpay.orders.create({
      amount: MAGAZINE_PRICE_PAISE,
      currency: "INR",
      receipt: `magazine_${user.id}_${Date.now()}`,
    });

    console.log("4. Razorpay order created:", razorpayOrder);

    console.log("5. Saving order to MongoDB...");

    const order = await createOrder({
      userId: new ObjectId(user.id),
      magazineId: MAGAZINE_ID,
      amount: MAGAZINE_PRICE_PAISE,
      currency: "INR",
      razorpayOrderId: razorpayOrder.id,
      status: "created",
      createdAt: new Date(),
    });

    console.log("6. MongoDB order created:", order._id);

    return NextResponse.json({
      success: true,
      order: {
        id: order._id!.toString(),
        razorpayOrderId: razorpayOrder.id,
        amount: MAGAZINE_PRICE_PAISE,
        currency: "INR",
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
    } catch (error: unknown) {
    console.error("========== RAZORPAY ORDER ERROR ==========");
    console.error("Error:", error);

    if (error instanceof Error) {
      console.error("Message:", error.message);
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error
    ) {
      console.error("Status:", error.status);
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "error" in error &&
      typeof error.error === "object" &&
      error.error !== null
    ) {
      if ("description" in error.error) {
        console.error("Error description:", error.error.description);
      }

      if ("code" in error.error) {
        console.error("Error code:", error.error.code);
      }
    }

    console.error("Full error JSON:", JSON.stringify(error, null, 2));
    console.error("==========================================");

    let message = "Unable to create payment order";

    if (error instanceof Error) {
      message = error.message;
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "error" in error &&
      typeof error.error === "object" &&
      error.error !== null &&
      "description" in error.error &&
      typeof error.error.description === "string"
    ) {
      message = error.error.description;
    }

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}