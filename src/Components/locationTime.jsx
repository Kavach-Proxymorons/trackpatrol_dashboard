import { FaLocationDot } from "react-icons/fa6";
import { BiSolidTimeFive } from "react-icons/bi";

export default function LocationTime() {
  return (
    <div className="h-40 w-80 flex flex-col justify-between items-start p-3 bg-white drop-shadow rounded-xl">
    <div className="flex items-center justify-between gap-x-4 ">
      <div className="bg-[rgba(13,119,211,0.05)] rounded-lg p-2">
        <div className="p-2 bg-[#0D76D3] rounded-full flex justify-center items-center">
          <FaLocationDot size={25} color="#fff" />
        </div>
      </div>
      <span className="bg-[rgba(13,119,211,0.05)] rounded-lg p-3">
        Pune city's Cantonment area, Maharashtra
      </span>
    </div>

    <div className="flex items-center justify-between gap-x-4">
      <div className="bg-[rgba(13,119,211,0.05)] rounded-lg p-2">
        <div className="p-2 bg-[#0D76D3] rounded-full flex justify-center items-center">
          <BiSolidTimeFive size={25} color="#fff" />
        </div>
      </div>
      <span className="bg-[rgba(13,119,211,0.05)] rounded-lg p-3">
        7 AM - 4 PM
      </span>
    </div>
  </div>
  );
}
