import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { deleteSession } from "@/lib/session";

const SESSION_COOKIE_NAME = "session_id";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const sessionId = cookieStore.get(
      SESSION_COOKIE_NAME
    )?.value;

    if (sessionId) {
      await deleteSession(sessionId);
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}