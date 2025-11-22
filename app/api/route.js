import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";
import User from "@/models/User";

export async function GET() {
  
  try {
    // اتصال به دیتابیس
    await connectDB();

    // گرفتن همه محصولات
    const products = await Product.find().sort({ _id: -1 }); // آخرین محصول اول
    

    // پاسخ موفقیت با JSON
    return NextResponse.json(
      { products },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ GET products error:", error);

    // پاسخ خطا
    return NextResponse.json(
      { message: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, phone, comment } = body;

    // ایجاد نظر جدید
    
    if(!name || !phone || !comment) return


    const newComment = await User.create({
      name,
      phone,
      comment,
    });

    return NextResponse.json({ message: "ثبت نام با موفقیت ثبت شد", comment: newComment }, { status: 201 });
  } catch (err) {
    console.log("❌ Error:", err);
    return NextResponse.json({ message: "خطا در ایجاد ثبت نظر" }, { status: 500 });
  }
}














