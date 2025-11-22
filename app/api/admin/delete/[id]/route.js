import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  // unwrap کردن params
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id || id.length !== 24) {
    return NextResponse.json({ message: "ای دی محصول معتبر نیست." }, { status: 400 });
  }

  try {
    await connectDB();

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "محصول پیدا نشد." }, { status: 404 });
    }

    return NextResponse.json({ message: "محصول با موفقیت حذف شد ✅" }, { status: 200 });
  } catch (error) {
    console.error("خطا در حذف محصول:", error);
    return NextResponse.json({ message: "خطا در حذف محصول ❌" }, { status: 500 });
  }
}