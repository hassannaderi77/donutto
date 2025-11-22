"use client";

import { IoIosContact } from "react-icons/io";
import { BsCartFill } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  
  const { count, isAuth, setIsAuth } = useStore();
  const router = useRouter();

  const outHandler = async () => {
    await fetch("/api/admin/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setIsAuth(false);
    router.refresh(); // فوراً navbar را آپدیت می‌کند
    router.push("/");
  };

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        setIsAuth(res.status === 200);
      } catch {
        setIsAuth(false);
      }
    }

    checkAuth();
  }, []); // فقط یک بار

  return (
    <>
      <div className="border border-gray-300 rounded-xl md:max-w-49/50 flex flex-wrap md:flex-nowrap justify-between  md:h-[60px] m-auto mt-3">
        <div className="flex items-center mr-3">
          <Image
            src="https://saas-behtarino.hs3.ir/media/business_icons/photo-2018-12-25-10-42-12-2417.jpg"
            alt=""
            width={40}
            height={40}
          />
          <p className="text-gray-500">دوناتو</p>
          <Link href="/" className="mr-7">
            <p className="text-gray-500">خانه</p>
          </Link>

          {isAuth && (
            <Link href="/admin" className="mr-7">
              <p className="text-gray-500">ادمین</p>
            </Link>
          )}
        </div>

        <div className="flex items-center ml-3">
          {isAuth ? (
            <FiLogOut
              onClick={outHandler}
              className="m-3 text-gray-600 cursor-pointer"
              size={23}
            />
          ) : (
            <Link href="/login">
              <IoIosContact
                className="m-3 text-gray-600 cursor-pointer"
                size={23}
              />
            </Link>
          )}

          <Link className="relative" href="/buy">
            {count >= 1 && (
              <div className="animate-pulse absolute bg-red-400 text-white rounded-[50%] text-[12px] w-5 h-5 flex items-center justify-center">
                {count}
              </div>
            )}
            <BsCartFill
              className="m-3 text-gray-600 cursor-pointer"
              size={23}
            />
          </Link>

          <Link href="/about">
            <FaCircleInfo
              className="m-3 text-gray-600 cursor-pointer"
              size={23}
            />
          </Link>
        </div>
      </div>
          
    </>
  );
}
