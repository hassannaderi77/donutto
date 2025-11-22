"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function EditItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    price: "",
    url: "",
    category: "",
  });

  const router = useRouter();
  
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        const found = data.products.find((p) => p._id === id);
        setItem(found);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // وقتی item مقدار گرفت، فرم دیتا رو با اون پر کن
  useEffect(() => {
  if (item) {
    setFormData({
      name: item.name || "",
      detail: item.detail || "",
      price: item.price || "",
      url: item.url || "",
      category: item.category || "", // ← حالا category
    });
  }
}, [item]);

  const editProducthandler = async (event) => {
  event.preventDefault();

  try {
    const res = await fetch(`/api/admin/edit/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("محصول با موفقیت ویرایش شد ✅");
      router.push("/admin/edit"); // 👈 ریدایرکت بعد از موفقیت
    } else {
      toast.error(data.message || "خطایی رخ داد ❌");
    }
  } catch (error) {
    console.error("خطا در ارسال فرم:", error);
    toast.error("خطایی رخ داد ❌");
  }
};

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-gray-500 text-lg">در حال بارگذاری...</h1>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      <form
        onSubmit={editProducthandler}
        className="md:w-[450px] md:h-[600px] rounded-xl shadow-2xl m-auto mt-7 flex flex-col"
      >
        <h1 className="text-xl font-bold m-3">ایجاد تغییرات</h1>

        <input
          className="mt-2 md:mt-auto border border-gray-400 rounded-xl block m-auto h-[50px] w-[90%] pr-3"
          type="text"
          placeholder="نام محصول"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          className="mt-2 md:mt-auto border border-gray-400 rounded-xl block m-auto h-[50px] w-[90%] pr-3"
          type="text"
          placeholder="توضیحات محصول"
          value={formData.detail}
          onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
        />

        <input
          className="mt-2 md:mt-auto border border-gray-400 rounded-xl block m-auto h-[50px] w-[90%] pr-3"
          type="text"
          placeholder="قیمت محصول"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />

        <input
          className="mt-2 md:mt-auto border border-gray-400 rounded-xl block m-auto h-[50px] w-[90%] pr-3"
          type="text"
          placeholder="آدرس عکس محصول"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        />

        <select
          className="mt-2 md:mt-auto border border-gray-400 rounded-xl block m-auto h-[50px] w-[90%] pr-3 text-gray-700"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="Donuts">Donuts</option>
          <option value="BiteBox">Bite Box</option>
          <option value="Coffee">Coffee & Warm Drinks</option>
          <option value="Tea">Tea & Herbal</option>
          <option value="Refreshers">Refreshers</option>
          <option value="Cold">Cold Drinks & Shakes</option>
          <option value="Gift">Gift Box</option>
          <option value="Sandwich">Donutoo Sandwich</option>
        </select>

        <button
          type="submit"
          className="bg-gray-800 w-[80%] h-[50px] block m-auto mt-10 cursor-pointer rounded-xl text-gray-50 text-xs"
        >
          ویرایش محصول
        </button>
      </form>
    </>
  );
}
