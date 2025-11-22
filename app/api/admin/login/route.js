import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const admin = {
  name: "hassannaderi",
  phone: "09120039760",
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone } = body;

    // مقایسه اطلاعات ورودی با اطلاعات ادمین
    const isValid =
      name === admin.name && phone === admin.phone;

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "اطلاعات اشتباه است" },
        { status: 401 }
      );
    }

    // ساخت توکن با زمان انقضای 2 ساعت
    const token = jwt.sign(
      { role: "admin", name },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // ذخیره توکن در Cookie
    const response = NextResponse.json(
      { success: true, message: "ورود موفق" },
      { status: 200 }
    );

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 2 * 60 * 60, // 2 ساعت
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطا در سرور" },
      { status: 500 }
    );
  }
}