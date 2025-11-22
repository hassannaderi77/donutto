"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Loading from "../loading/Loading";

export default function EditComponent() {

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

  if(loading) {
    return <Loading />
  }

  return (
    <>
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
                  <Link href={`/admin/edit/${i._id}`}>
                    <FaEdit size={25} className="text-gray-500" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      ;
    </>
  );
}
