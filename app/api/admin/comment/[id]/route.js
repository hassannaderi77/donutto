import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function DELETE(req, { params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id || id.length !== 24) {
    return NextResponse.json(
      { message: "ای دی نظر معتبر نیست." },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "نظر پیدا نشد." }, { status: 404 });
    }

    return NextResponse.json({ message: "نظر با موفقیت حذف شد ✅" }, { status: 200 });
  } catch (error) {
    console.error("خطا در حذف نظر:", error);
    return NextResponse.json({ message: "خطا در حذف نظر ❌" }, { status: 500 });
  }
}