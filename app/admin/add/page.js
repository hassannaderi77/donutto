"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Addpage() {
  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    price: "",
    url: "",
  });

  const addProducthandler = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/api/admin/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setFormData({ name: "", detail: "", price: "", url: "", gender: "" });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("خطا در ارتباط با سرور");
      console.log(error);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <form className="md:w-[450px] md:h-[600px] rounded-xl shadow-2xl m-auto mt-7 flex flex-col">
        <h1 className="text-xl font-bold m-3">
          اطلاعات محصول جدید را وارد کنید
        </h1>

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
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          defaultValue="title"
        >
          <option value="title" hidden disabled>
            title
          </option>
          <option
            className="text-gray-700 bg-white hover:bg-gray-200 cursor-pointer"
            value="Donuts"
          >
            Donuts
          </option>
          <option
            className="text-gray-700 bg-white hover:bg-gray-200 cursor-pointer"
            value="BiteBox"
          >
            Bite Box
          </option>
          <option
            className="text-gray-700 bg-white hover:bg-gray-200 cursor-pointer"
            value="Coffee"
          >
            Coffee & Warm Drinks
          </option>
          <option
            className="text-gray-700 bg-white hover:bg-gray-200 cursor-pointer"
            value="Tea"
          >
            Tea & Herbal
          </option>
          <option
            className="text-gray-700 bg-white hover:bg-gray-200 cursor-pointer"
            value="Refreshers"
          >
            Refreshers
          </option>
          <option
            className="text-gray-700 bg-white hover:bg-gray-200 cursor-pointer"
            value="Cold"
          >
            Cold Drinks & Shakes
          </option>
          <option
            className="text-gray-700 bg-white hover:bg-gray-200 cursor-pointer"
            value="Gift"
          >
            Gift Box
          </option>
          <option
            className="text-gray-700 bg-white hover:bg-gray-200 cursor-pointer"
            value="Sandwich"
          >
            Donutoo Sandwich
          </option>
        </select>

        <button
          onClick={addProducthandler}
          className="bg-gray-800 w-[80%] h-[50px] block m-auto mt-10 cursor-pointer rounded-xl text-gray-50 text-xs"
        >
          ایجاد محصول
        </button>
      </form>
    </>
  );
}
