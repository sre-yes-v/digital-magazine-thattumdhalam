// src/app/api/magazine/page/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/r2";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session_id");

    if (!sessionCookie?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await getSession(sessionCookie.value);
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const issue = searchParams.get("issue");
    const pagesParam = searchParams.get("pages"); // e.g. "1,2,3,4,5"

    if (!issue || !pagesParam) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const pageNumbers = pagesParam
      .split(",")
      .map((p) => Number.parseInt(p.trim(), 10))
      .filter((n) => Number.isInteger(n) && n > 0);

    if (pageNumbers.length === 0) {
      return NextResponse.json({ error: "Invalid pages" }, { status: 400 });
    }

    // Cap batch size to prevent abuse
    const capped = pageNumbers.slice(0, 20);

    const urls = await Promise.all(
      capped.map(async (pageNumber) => {
        const objectKey = `magazine/page_${pageNumber}.png`;
        const command = new GetObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME!,
          Key: objectKey,
        });
        const signedUrl = await getSignedUrl(s3Client, command, {
          expiresIn: 1800, // 30 min instead of 5, so prefetched pages don't expire mid-session
        });
        return { page: pageNumber, url: signedUrl };
      })
    );

    return NextResponse.json({ pages: urls });
  } catch (error) {
    console.error("Magazine page signing error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}