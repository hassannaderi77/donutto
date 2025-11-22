"use client"
import { useEffect, useState } from "react";
import { IoIosContact } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../loading/Loading";


export default function CommentComponent() {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/comment")
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments)
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`/api/admin/comment/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setComments(comments.filter((i) => i._id !== id));
      } else {
        toast.error(data.message || "خطایی رخ داد ❌");
      }
    } catch (error) {
      console.error("خطا در حذف نظر:", error);
      toast.error("خطایی رخ داد ❌");
    }
  };

  if(loading) {
    return <Loading />
  }

  return (
    <div className="m-10">
      <Toaster position="top-right" />
      <div className="flex md:flex-row flex-col flex-wrap gap-5">
        {comments.map((com) => (
          <div
            key={com._id}
            className="md:h-[150px] md:w-[40%] border rounded-xl flex flex-col p-5 gap-2 justify-start border-gray-300"
          >
            <div className="flex gap-2 items-center">
              <IoIosContact />
              <h1>{com.name}</h1>
            </div>
            <p className="text-gray-400 text-xs">{com.phone}</p>
            <p className="text-gray-400 text-xs">{com.comment}</p>
            <div
              onClick={() => deleteHandler(com._id)}
              className="border rounded-sm cursor-pointer border-gray-400 w-[35px] h-[35px] flex items-center justify-center mt-auto"
            >
              <FaTrashAlt size={25} className="text-gray-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

