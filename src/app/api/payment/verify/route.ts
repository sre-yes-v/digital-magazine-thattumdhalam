import { NextResponse } from "next/server";
import crypto from "crypto";

import { getCurrentUser } from "@/lib/auth";
import {
  findOrderByRazorpayOrderId,
  markOrderAsPaid,
} from "@/lib/order";

export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // 1. Check logged-in user
    // --------------------------------------------------

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

    // --------------------------------------------------
    // 2. Read Razorpay response
    // --------------------------------------------------

    const body = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing payment verification details",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 3. Find our MongoDB order
    // --------------------------------------------------

    const order = await findOrderByRazorpayOrderId(
      razorpay_order_id
    );

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // 4. Make sure this order belongs to this user
    // --------------------------------------------------

    if (order.userId.toString() !== user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized payment",
        },
        { status: 403 }
      );
    }

    // --------------------------------------------------
    // 5. Already paid?
    // --------------------------------------------------

    if (order.status === "paid") {
      return NextResponse.json({
        success: true,
        message: "Payment already verified",
      });
    }

    // --------------------------------------------------
    // 6. Verify Razorpay signature
    // --------------------------------------------------

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      throw new Error(
        "RAZORPAY_KEY_SECRET is not defined"
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    const expectedBuffer = Buffer.from(
      generatedSignature,
      "utf8"
    );

    const receivedBuffer = Buffer.from(
      razorpay_signature,
      "utf8"
    );

    const isValidSignature =
      expectedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(
        expectedBuffer,
        receivedBuffer
      );

    if (!isValidSignature) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment signature",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 7. Verify payment with Razorpay
    // --------------------------------------------------

    const payment = await import("@/lib/razorpay").then(
      ({ razorpay }) =>
        razorpay.payments.fetch(razorpay_payment_id)
    );

    // Make sure payment belongs to our order
    if (payment.order_id !== razorpay_order_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment does not belong to this order",
        },
        { status: 400 }
      );
    }

    // Make sure amount matches
    if (payment.amount !== order.amount) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment amount mismatch",
        },
        { status: 400 }
      );
    }

    // Make sure currency matches
    if (payment.currency !== order.currency) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment currency mismatch",
        },
        { status: 400 }
      );
    }

    // Only give access to captured payments
    if (payment.status !== "captured") {
      return NextResponse.json(
        {
          success: false,
          message: "Payment has not been captured",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 8. Mark MongoDB order as paid
    // --------------------------------------------------

    const updatedOrder = await markOrderAsPaid(
      razorpay_order_id,
      razorpay_payment_id
    );

    if (!updatedOrder) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to update payment",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 9. Success
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      payment: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      },
    });
  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Payment verification failed",
      },
      { status: 500 }
    );
  }
}