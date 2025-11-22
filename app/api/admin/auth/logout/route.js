import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 0, // حذف کوکی
  });

  return res;
}
