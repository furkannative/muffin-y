import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// This endpoint is intentionally disabled to prevent build-time crashes
export async function POST() {
  return NextResponse.json(
    { ok: false, disabled: true, message: "send-welcome-email endpoint disabled" },
    { status: 404 }
  );
}

export async function GET() {
  return NextResponse.json(
    { ok: false, disabled: true, message: "send-welcome-email endpoint disabled" },
    { status: 404 }
  );
}
