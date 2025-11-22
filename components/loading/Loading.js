import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="text-[50px] bold text-gray-500">
      <AiOutlineLoading3Quarters className="animate-spin" />
    </div>
  );
}
