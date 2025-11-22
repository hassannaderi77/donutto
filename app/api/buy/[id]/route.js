import connectDB from "@/utils/connectDB";
import Order from "@/models/Order";
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

    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "سفارش پیدا نشد." }, { status: 404 });
    }

    return NextResponse.json({ message: "سفارش با موفقیت ثبت شد ✅" }, { status: 200 });
  } catch (error) {
    console.error("خطا در ثبت سفارش:", error);
    return NextResponse.json({ message: "خطا در ثبت سفارش ❌" }, { status: 500 });
  }
}