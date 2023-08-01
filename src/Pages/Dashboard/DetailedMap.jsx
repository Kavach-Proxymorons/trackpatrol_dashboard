import { Map } from "../../Components";
import { useEffect, useState } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import { IoIosArrowBack, IoIosCar } from "react-icons/io";
import { BiLogoChrome } from "react-icons/bi";

export default function DetailedMap() {
  return (
    <div className={`w-auto h-[790px] relative`}>
      <input
        className="h-12 px-3 sticky top-0 z-50 w-full border-b-3"
        placeholder="🔍 Search a personnel by id..."
      /> 
      <div className="absolute top-12 z-50 bg-background w-[280px] rounded-br-xl">
        <IoIosArrowBack
          size={25}
          className="mx-4 mt-4 h-8 w-8 hover:bg-[#efefefb3] rounded"
        />
        <div className="flex flex-col justify-center items-start p-4 gap-y-4">
          <div className="w-full border-2 rounded-md p-4">
            <span className="flex items-center justify-start gap-x-2 font-semibold mb-2">
              <IoIosCar size={30} /> BB-8891776
            </span>
            <p className="text-sm">
              <span className="text-base font-semibold"> Total: </span> 500
              Personnel in range
            </p>
            <p className="text-sm">4 Km radius covered</p>
          </div>

          <div className="w-full border-2 rounded-md p-4">
            <span className="flex items-center justify-start gap-x-2 font-semibold mb-2">
              <div className="h-5 w-5 bg-[#5030E5] rounded-full"></div> RFID
              Signal Update
            </span>
            <p className="text-sm">
              <span className="text-base font-semibold"> Total: </span> 240
              Personnel Update
            </p>
          </div>

          <div className="w-full border-2 rounded-md p-4">
            <span className="flex items-center justify-start gap-x-2 font-semibold mb-2">
              <div className="h-5 w-5 bg-[#4ACE52] rounded-full"></div> GPS
              Signal Update
            </span>
            <p className="text-sm">
              <span className="text-base font-semibold"> Total: </span> 240
              Personnel Update
            </p>
          </div>

          <div className="w-full border-2 rounded-md p-4">
            <span className="flex items-center justify-start gap-x-2 font-semibold mb-2">
              <div className="h-5 w-5 bg-[#FE8235] rounded-full"></div> Issues
              Tracking
            </span>
            <p className="text-sm">
              <span className="text-base font-semibold"> Total: </span> 240
              Personnel Update
            </p>
          </div>
        </div>
      </div>
      <Map />
    </div>
  );
}