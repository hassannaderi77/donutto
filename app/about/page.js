import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { SlSocialDribbble } from "react-icons/sl";

export default function page() {
  return (
    <div className="mt-10 gap-2 md:h-[30vh] flex md:flex-row flex-col flex-wrap items-center justify-around">
      <div className="md:h-[100px] md:w-[40%] border rounded-xl flex flex-col p-5 gap-2 justify-start border-gray-300">
        <div className="flex gap-2 items-center">
          <FaLocationDot />
          <h1 className="">آدرس</h1>
        </div>
        <p className="text-gray-400 text-xs">شیخ بهایی جنوبی. خیابان آیینه وند. مجتمع آ اس پ. پلاک 20</p>
      </div>
      <div className="w-full md:h-[100px] md:w-[40%] border rounded-xl flex flex-col p-5 gap-2 justify-start border-gray-300">
        <div className="flex gap-2 items-center">
          <IoCall />
          <h1 className="">شماره تماس</h1>
        </div>
        <p className="text-gray-400 text-xs">09120039760</p>
      </div>
      <div className="w-full md:h-[100px] md:w-[40%] border rounded-xl flex flex-col p-5 gap-2 justify-start border-gray-300">
        <div className="flex gap-2 items-center">
          <AiOutlineClockCircle />
          <h1 className="">ساعت کاری</h1>
        </div>
        <p className="text-gray-400 text-xs">امروز از 8:30 تا 22:30</p>
      </div>
      <div className="md:h-[100px] w-full md:w-[40%] border rounded-xl flex flex-col p-5 gap-2 justify-start border-gray-300">
        <div className="flex gap-2 items-center">
          <SlSocialDribbble />
          <h1 className="">شبکه های اجتماعی</h1>
        </div>
        <p className="text-gray-400 text-xs">donutto.cafe</p>
      </div>
    </div>
  )
}