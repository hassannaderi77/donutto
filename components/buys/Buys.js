import Image from "next/image";
import { IoAdd } from "react-icons/io5";
import { IoMdRemove } from "react-icons/io";
import { useStore } from "@/context/StoreContext";
import { FaTrashAlt } from "react-icons/fa";

export default function Buys(b) {

 const { buy, setCount, setBuy} = useStore();

 const addHandler = () => {
    setCount((prev) => prev + 1);

    setBuy((prevBuy) => {
    const existingItem = prevBuy.find((item) => item._id === b._id);
    if (existingItem) {
      return prevBuy.map((item) =>
        item._id === b._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prevBuy, { ...b, quantity: 1 }];
    }
  });
 }

 const removeHandler = () => {
    setCount((prev) => prev - 1);

    setBuy((prevBuy) => {
      const existingItem = prevBuy.find((item) => item._id === b._id);
      if (existingItem) {
        return prevBuy.map((item) =>
          item._id === b._id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return [...prevBuy, { ...b, quantity: 1 }];
      }
    });
  };

  return (
   <div className="bg-white md:w-[750px] md:h-40 flex flex-col md:flex-row items-center justify-around rounded-xl border border-gray-200">
         <div>
           <Image
             src={`${b.url}`}
             alt=""
             width={100}
             height={100}
             className="rounded-xl m-1"
           />
         </div>
         <div className="flex flex-col gap-5">
           <div>
             <h1 className="font-bold p-1">{b.name}</h1>
             <p className="text-xs text-neutral-500 p-1">
               {b.detail}
             </p>
           </div>
   
           <div className="flex mb-1 items-center justify-between">
             <h1 className="font-bold mr-1 md:ml-3">{b.price} تومان</h1>
             <div className="m-1 border rounded-sm cursor-pointer border-gray-400 md:w-[35px] md:h-[35px] flex items-center justify-center">
               <IoAdd onClick={addHandler} size={25} className="text-gray-500" />
             </div>
             <div className="m-1 border rounded-sm border-gray-400 w-[25px] md:w-[35px] md:h-[35px] flex items-center justify-center">
               {buy.find(item => item._id === b._id)?.quantity || 0}
             </div>
             {buy.find((item) => item._id === b._id)?.quantity > 0 && (
                         <div
                           onClick={removeHandler}
                           className="m-1 border rounded-sm cursor-pointer border-gray-400 md:w-[35px] md:h-[35px] flex items-center justify-center"
                         >
                           {buy.find((item) => item._id === b._id)?.quantity == 1 ? (
                             <FaTrashAlt size={25} className="text-gray-500" />
                           ) : (
                             <IoMdRemove size={25} className="text-gray-500" />
                           )}
                         </div>
                       )}
             
           </div>
         </div>
       </div>
  )
}
