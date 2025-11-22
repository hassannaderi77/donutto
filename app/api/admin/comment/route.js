import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    // اتصال به دیتابیس
    await connectDB();

    // گرفتن همه محصولات
    const comments = await User.find().sort({ _id: -1 }); // آخرین محصول اول

    // پاسخ موفقیت با JSON
    return NextResponse.json(
      { comments },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ GET comment error:", error);

    // پاسخ خطا
    return NextResponse.json(
      { message: "خطا در دریافت نظرات" },
      { status: 500 }
    );
  }
}