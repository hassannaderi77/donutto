import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function PATCH(req, context) {
  try {
    await connectDB();

    // ⚡ unwrap کردن params
    const { id } = await context.params; // ✅ اینجا باید await داشته باشه

    const body = await req.json();
    const { name, detail, price, url, category } = body;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json({ message: "محصول پیدا نشد." }, { status: 404 });
    }

    existingProduct.name = name || existingProduct.name;
    existingProduct.detail = detail || existingProduct.detail;
    existingProduct.price = price || existingProduct.price;
    existingProduct.url = url || existingProduct.url;
    existingProduct.category = category || existingProduct.category;

    await existingProduct.save();

    return NextResponse.json(
      { message: "محصول با موفقیت ویرایش شد.", product: existingProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ خطا در ویرایش:", error);
    return NextResponse.json({ message: "خطا در ویرایش محصول." }, { status: 500 });
  }
}