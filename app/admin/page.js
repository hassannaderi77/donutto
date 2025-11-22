"use client";

import Link from "next/link";

export default function Admin() {

  return (
    <>
      
        
          <Link
            className="border text-gray-600 border-gray-300 rounded-xl flex justify-center cursor-pointer items-center md:w-2xl h-10 md:h-[60px] m-auto mt-3"
            href="/admin/add"
          >
            اضافه کردن محصول
          </Link>
          <Link
            className="border text-gray-600 border-gray-300 rounded-xl flex justify-center cursor-pointer items-center md:w-2xl h-10 md:h-[60px] m-auto mt-3"
            href="/admin/edit"
          >
            تغییرات در محصول
          </Link>
          <Link
            className="border text-gray-600 border-gray-300 rounded-xl flex justify-center cursor-pointer items-center md:w-2xl h-10 md:h-[60px] m-auto mt-3"
            href="/admin/delete"
          >
            
            پاک کردن محصول
          </Link>
          <Link
            className="border text-gray-600 border-gray-300 rounded-xl flex justify-center cursor-pointer items-center md:w-2xl h-10 md:h-[60px] m-auto mt-3"
            href="/admin/order"
          >
            مشاهده سفارشات
          </Link>
          <Link
            className="border text-gray-600 border-gray-300 rounded-xl flex justify-center cursor-pointer items-center md:w-2xl h-10 md:h-[60px] m-auto mt-3"
            href="/admin/comments"
          >
            لیست نظرات
          </Link>
       
    
    </>
  );
}
