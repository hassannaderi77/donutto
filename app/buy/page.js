"use client";

import Buys from "@/components/buys/Buys";
import { useStore } from "@/context/StoreContext";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function page() {

  const router = useRouter();

  const { buy, setBuy, setCount } = useStore();

  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState({
    name: "",
    phone: "",
    pay: false,
  });

  const total = buy.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const ispay = () => {
    setLoading(true); // شروع لودینگ
    setTimeout(() => {
      setOrder((prev) => ({ ...prev, pay: true }));
      setLoading(false); // پایان لودینگ
      toast.success("پرداخت اعتباری با موفقیت انجام شد");
    }, 2000); // ۲ ثانیه
  };

  const addOrder = async (e) => {
    e.preventDefault();

    if (!order.pay) {
      toast.error("ابتدا اعتباری پرداخت کنید");
      return;
    }

    try {
      const res = await fetch("/api/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setOrder({ name: "", phone: "", pay: false });
        setBuy([]); // total خودکار صفر می‌شود
        setCount(0);
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("خطا در ارتباط با سرور");
      console.log(error);
    }

  };
  console.log("buy:", buy, "total:", total);
  return (
    <>
      <Toaster />
      <div className="flex md:flex-row flex-col max-w-49/50 m-auto mt-10 justify-around">
        <div className="flex md:w-[70%] flex-col gap-y-3">
          {buy.map((b) => b.quantity > 0 && <Buys key={b._id} {...b} />)}
        </div>
        <div className="md:w-[40%] text-center">
          {total > 0 && (
            <>
              <div className="mt-10 md:mt-auto">مجموع خرید شما: {total.toLocaleString("fa-IR")} تومان</div>
              <form className="w-full h-[400px] m-auto flex flex-col items-center">
                <input
                  className="border border-gray-400 rounded-xl block m-auto h-[50px] w-[90%] pr-3"
                  type="text"
                  placeholder="نام "
                  value={order.name}
                  onChange={(e) => setOrder({ ...order, name: e.target.value })}
                />
                <input
                  className="border border-gray-400 rounded-xl block m-auto h-[50px] w-[90%] pr-3"
                  type="text"
                  placeholder="شماره تلفن"
                  value={order.phone}
                  onChange={(e) =>
                    setOrder({ ...order, phone: e.target.value })
                  }
                />
                <div
                  className={
                    order.pay
                      ? "flex items-center justify-center mb-3 md:w-[20%] p-1 h-[50px] cursor-pointer rounded-xl bg-green-500 text-white text-xs pointer-events-none"
                      : "flex items-center justify-center mb-3 md:w-[20%] p-1 h-[50px] cursor-pointer rounded-xl text-gray-800 border-gray-800 border text-xs"
                  }
                  onClick={ispay}
                >
                   {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "پرداخت اعتباری"}
                </div>
                <button
                  onClick={addOrder}
                  className="bg-gray-800 mb-3 w-[80%] h-[50px] block m-auto mt-10 cursor-pointer rounded-xl text-gray-50 text-xs"
                >
                  ثبت سفارش
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
