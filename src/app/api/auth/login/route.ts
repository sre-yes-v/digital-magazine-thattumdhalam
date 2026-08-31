import { NextResponse } from "next/server";
import argon2 from "argon2";
import { findUserByPhone } from "@/lib/users";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const phone =
      typeof body.phone === "string"
        ? body.phone.replace(/\s+/g, "")
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!phone || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number and password are required",
        },
        { status: 400 }
      );
    }

    const user = await findUserByPhone(phone);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid phone number or password",
        },
        { status: 401 }
      );
    }

    const passwordValid = await argon2.verify(
      user.passwordHash,
      password
    );

    if (!passwordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid phone number or password",
        },
        { status: 401 }
      );
    }

    const { sessionId, expiresAt } = await createSession(
      user._id!
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id!.toString(),
        phone: user.phone,
      },
    });

    response.cookies.set({
      name: "session_id",
      value: sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}