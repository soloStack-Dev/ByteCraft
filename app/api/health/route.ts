import { NextResponse } from "next/server";
import { getConnection } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { status: "degraded", ready: false, message: "DATABASE_URL not configured" },
      { status: 200 }
    );
  }

  try {
    const conn = await getConnection();
    try {
      await conn.query("SELECT 1");
    } finally {
      conn.release();
    }
    return NextResponse.json({ status: "ok", ready: true });
  } catch (err) {
    return NextResponse.json(
      { status: "error", ready: false, message: (err as Error)?.message },
      { status: 503 }
    );
  }
}
