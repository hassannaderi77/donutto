"use client"

import { IoIosContact } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { GrStatusGood } from "react-icons/gr";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../loading/Loading";

export default function OrderComponent() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/buy")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.order)
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`/api/buy/${id}`, {
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
        setOrders(orders.filter((i) => i._id !== id));
      } else {
        toast.error(data.message || "خطایی رخ داد ❌");
      }
    } catch (error) {
      console.error("خطا در حذف سفارش:", error);
      toast.error("خطایی رخ داد ❌");
    }
  };

  if(loading) {
    return <Loading />
  }

  return (
    <>
    <Toaster />
    <div className=" mt-10 flex flex-col md:flex-row flex-wrap items-center justify-center gap-3 ">
      {orders.map((order) => (
        <div
          key={order._id}
          className="md:h-auto md:w-[40%] border rounded-xl flex flex-col p-5 gap-2 items-center justify-start border-gray-300"
        >
          <div className="flex gap-2 items-center">
            <IoIosContact />
            <h1 className="">{order.name}</h1>
          </div>
          <div className="flex gap-2 items-center">
            <IoCall />
            <p className="text-gray-400 text-xs">{order.phone}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-gray-400 text-xs">وضعیت پرداخت :</p>
            {order.pay && <GrStatusGood className="text-green-800" />}
          </div>
          <button
            onClick={() => deleteHandler(order._id)}
            className="text-sm h-6 p-1 text-gray-300 cursor-pointer rounded-xl md:w-[30%] bg-gray-800"
          >
            دریافت شد
          </button>
        </div>
      ))}
    </div>
    </>
  )
}