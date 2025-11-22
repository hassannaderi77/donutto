import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    // گرفتن token از cookie
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    // Verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({ valid: true, user: decoded }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}