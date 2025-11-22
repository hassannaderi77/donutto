"use client";

import { useStore } from "@/context/StoreContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";

export default function page() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const loginAdmin = async (e) => {
    e.preventDefault();
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const data = await res.json();

  if (data.success) {
    // موفقیت = ادمین لاگین شد
    router.push("/admin");   
  } else {
    toast.error(data.message);
  }
};

  return (
    <>
      <Toaster />
      <form className="md:w-[450px] md:h-[600px] rounded-xl shadow-2xl m-auto mt-7 flex-col justify-center">
        <div className="flex items-center justify-around">
          <Link href="/" className="cursor-pointer">
            <FaArrowRight size={20} className="text-gray-600" />
          </Link>
          <Image
            src="https://saas-behtarino.hs3.ir/media/business_icons/photo-2018-12-25-10-42-12-2417.jpg"
            alt=""
            width={70}
            height={70}
          />
          <div className="w-[5%]"></div>
        </div>
        <div className="flex-col h-[50%] mt-20">
          <h1 className="text-xl font-bold m-3">ورود به حساب کاربری ادمین</h1>

          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="text-sm border border-gray-400 rounded-xl block m-auto h-[50px] w-[90%] pr-3"
            type="text"
            placeholder="نام : مثال زیر را وارد کنید"
          />
          <p className="text-gray-500 text-xs p-5"> مثال : hassannaderi</p>

          <input
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="text-sm border border-gray-400 rounded-xl block m-auto h-[50px] w-[90%] pr-3"
            type="text"
            placeholder="شماره موبایل : مثال زیر را وارد کنید"
          />
          <p className="text-gray-500 text-xs p-5"> مثال : 09120039760</p>
        </div>
        <button
          onClick={loginAdmin}
          className="bg-gray-800 w-[80%] h-[50px] block m-auto md:mt-10 cursor-pointer rounded-xl text-gray-50 text-xs"
        >
          وارد شوید
        </button>
      </form>
    </>
  );
}
