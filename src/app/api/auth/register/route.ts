import { NextResponse } from "next/server";
import argon2 from "argon2";
import {
  createUser,
  findUserByPhone,
} from "@/lib/users";

function normalizePhone(phone: string): string {
  return phone.replace(/\s+/g, "");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const phone =
      typeof body.phone === "string"
        ? normalizePhone(body.phone)
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

    // Indian phone number in international format
    const phoneRegex = /^\+91[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter a valid Indian phone number",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters",
        },
        { status: 400 }
      );
    }

    const existingUser = await findUserByPhone(phone);

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this phone number already exists",
        },
        { status: 409 }
      );
    }

    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    const user = await createUser(
      phone,
      passwordHash
    );

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: {
          id: user._id?.toString(),
          phone: user.phone,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}