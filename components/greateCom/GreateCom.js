"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function GreateCom() {
  const [comments, setComments] = useState({
    name: "",
    phone: "",
    comment: "",
  });

  const addComment = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comments),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setComments({ name: "", phone: "", comment: ""});
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("خطا در ارتباط با سرور");
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />

      <form className="w-full h-[400px] rounded-xl shadow-2xl m-auto mt-7 flex flex-col items-center justify-around">
        <h1 className="text-xl font-bold m-3">
          ثبت نام کنید و نظر خود را ثبت کنید
        </h1>

        <input
          className="border border-gray-400 rounded-xl block m-auto h-[50px] w-[90%] pr-3"
          type="text"
          placeholder="نام "
          value={comments.name}
          onChange={(e) => setComments({ ...comments, name: e.target.value })}
        />

        <input
          className="border border-gray-400 rounded-xl block m-auto h-[50px] w-[90%] pr-3"
          type="text"
          placeholder="شماره تلفن"
          value={comments.phone}
          onChange={(e) => setComments({ ...comments, phone: e.target.value })}
        />

        <textarea
          className="border min-h-32 border-gray-400 rounded-xl block m-auto w-[90%] pr-3"
          type="text"
          placeholder="اینجا بنویسید"
          value={comments.comment}
          onChange={(e) =>
            setComments({ ...comments, comment: e.target.value })
          }
        />

        <button
          onClick={addComment}
          className="bg-gray-800 mb-3 w-[80%] h-[50px] block m-auto mt-10 cursor-pointer rounded-xl text-gray-50 text-xs"
        >
          ثبت نظر
        </button>
      </form>
    </div>
  );
}
