"use client";

import { useStore } from "@/context/StoreContext";
import Image from "next/image";
import { IoMdRemove } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

export default function Cart(i) {
  const { buy, setBuy, setCount } = useStore();

  const countHandler = () => {
    setCount((prev) => prev + 1);

    setBuy((prevBuy) => {
      const existingItem = prevBuy.find((item) => item._id === i._id);
      if (existingItem) {
        return prevBuy.map((item) =>
          item._id === i._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevBuy, { ...i, quantity: 1 }];
      }
    });
  };

  const removeHandler = () => {
    setCount((prev) => prev - 1);

    setBuy((prevBuy) => {
      const existingItem = prevBuy.find((item) => item._id === i._id);
      if (existingItem) {
        return prevBuy.map((item) =>
          item._id === i._id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return [...prevBuy, { ...i, quantity: 1 }];
      }
    });
  };

  return (
    <div className="bg-white md:w-[450px] md:h-40 h-[300px] flex flex-col md:flex-row items-center justify-around rounded-xl border border-gray-200">
      <div>
        <Image
          src={`${i.url}`}
          alt=""
          width={100}
          height={100}
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col md:gap-5">
        <div>
          <h1 className="p-1 font-bold">{i.name}</h1>
          <p className="text-xs p-1 md:w-[180px] text-neutral-500">{i.detail}</p>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="m-1 font-bold">
            {Number(i.price).toLocaleString("fa-IR")} تومان
          </h1>
          <div
            onClick={countHandler}
            className="m-1 border rounded-sm cursor-pointer border-gray-400 w-[35px] h-[35px] flex items-center justify-center"
          >
            <IoAdd size={25} className="text-gray-500" />
          </div>
          <div className="m-1 border rounded-sm cursor-pointer border-gray-400 w-[35px] h-[35px] flex items-center justify-center text-gray-500">
            {buy.find((item) => item._id === i._id)?.quantity || 0}
          </div>
          {buy.find((item) => item._id === i._id)?.quantity > 0 && (
            <div
              onClick={removeHandler}
              className="m-1 border rounded-sm cursor-pointer border-gray-400 w-[35px] h-[35px] flex items-center justify-center"
            >
              {buy.find((item) => item._id === i._id)?.quantity == 1 ? (
                <FaTrashAlt size={25} className="text-gray-500" />
              ) : (
                <IoMdRemove size={25} className="text-gray-500" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
