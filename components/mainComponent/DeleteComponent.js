"use client";

import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteComponent() {

    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setItem(data.products)
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteHandler = async (id) => {
  try {
    const res = await fetch(`/api/admin/delete/${id}`, {
      method: "DELETE",
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      console.error("Invalid JSON response:", err);
      data = { message: "پاسخ نامعتبر از سرور" };
    }

    if (res.ok) {
      toast.success(data.message);
      setItem(item.filter((i) => i._id !== id));
    } else {
      toast.error(data.message || "خطایی رخ داد ❌");
    }
  } catch (error) {
    console.error("خطا در حذف محصول:", error);
    toast.error("خطایی رخ داد ❌");
  }
};

if(loading) {
    return <Loading />
}

  return (
    <>
      <Toaster position="top-right" />

      <div className="h-auto md:m-15 flex flex-wrap gap-3">
        {item.map((i) => (
          <div
            key={i._id}
            className="bg-white w-[450px] h-40 flex items-center justify-around rounded-xl border border-gray-200"
          >
            <div>
              <Image
                src={`${i.url}`}
                alt=""
                width={100}
                height={100}
                className="rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="font-bold">{i.name}</h1>
                <p className="text-xs w-[180px] text-neutral-500">{i.detail}</p>
              </div>

              <div className="flex items-center justify-between">
                <h1 className="font-bold">
                  {Number(i.price).toLocaleString("fa-IR")} تومان
                </h1>
                <div className="border rounded-sm cursor-pointer border-gray-400 w-[35px] h-[35px] flex items-center justify-center">
                  <FaTrashAlt
                    onClick={() => deleteHandler(i._id)}
                    size={25}
                    className="text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
