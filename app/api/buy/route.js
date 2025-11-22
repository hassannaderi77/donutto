import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, phone, pay} = body;

    // ایجاد محصول جدید
    
    if(!pay) return


    const newOrder = await Order.create({
      name,
      phone,
      pay,
    });

    return NextResponse.json({ message: "سفارش با موفقیت ثبت شد", order: newOrder }, { status: 201 });
  } catch (err) {
    console.log("❌ Error:", err);
    return NextResponse.json({ message: "خطا در ثبت سفارش" }, { status: 500 });
  }
}


export async function GET() {
  try {
    // اتصال به دیتابیس
    await connectDB();

    // گرفتن همه محصولات
    const order = await Order.find().sort({ _id: -1 }); // آخرین محصول اول

    // پاسخ موفقیت با JSON
    return NextResponse.json(
      { order },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ GET orders error:", error);

    // پاسخ خطا
    return NextResponse.json(
      { message: "خطا در دریافت سفارشات" },
      { status: 500 }
    );
  }
}