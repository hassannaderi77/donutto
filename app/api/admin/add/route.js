import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, detail, price, url, gender } = body;

    // ایجاد محصول جدید
    
    if(!gender || url == "") return


    const newProduct = await Product.create({
      name,
      detail,
      price,
      url,
      category: gender,
    });

    return NextResponse.json({ message: "محصول با موفقیت ثبت شد", product: newProduct }, { status: 201 });
  } catch (err) {
    console.log("❌ Error:", err);
    return NextResponse.json({ message: "خطا در ایجاد محصول" }, { status: 500 });
  }
}