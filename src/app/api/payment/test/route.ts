import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export async function GET() {
  try {
    const payments = await razorpay.payments.all({
      count: 1,
    });

    return NextResponse.json({
      success: true,
      message: "Razorpay connection successful",
      count: payments.count,
    });
  } catch (error) {
    console.error("Razorpay connection error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Razorpay connection failed",
      },
      {
        status: 500,
      }
    );
  }
}