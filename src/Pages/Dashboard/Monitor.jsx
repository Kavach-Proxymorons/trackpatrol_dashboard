import { TitlePersonal, LocationTime } from "../../Components";
import { Map } from "../../Components";
import { LuCalendar } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
// import { Info } from "lucide-react";
import { IoIosInformationCircle } from "react-icons/io";

export default function Monitor() {
  return (
    <>
      <div className="mx-12 my-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-start pr-4 py-2 bg-[#F4F6FA] shadow-md"
        >
          <IoIosArrowBack size={25} color="#222" />
          <span className="text-2xl text-neutral-700 font-semibold">Back</span>
        </Link>
        <div className="flex justify-start gap-x-6 mt-6">
          <div className="flex flex-col justify-between gap-y-6">
            <div className="bg-[#F4F6FA] px-2 py-3 rounded-md shadow-md">
              <div className="flex gap-x-2 ml-2">
                <LuCalendar size={24} color="#000" />
                <span className="text-lg font-semibold">
                  BANDOBAST SCHEDULE
                </span>
              </div>
              <div className="flex flex-col justify-center items-start bg-white mt-2 rounded text-sm pl-2 py-3">
                <p>
                  <span className="text-[#7B7D92]">Start Time: </span>October
                  24, 2023, 8:00 AM
                </p>
                <p>
                  <span className="text-[#7B7D92] pr-2">End Time: </span>October
                  24, 2023, 8:00 AM
                </p>
              </div>
            </div>
            <Link to='/dashboard/monitor/details' className="w-[20rem] h-[12rem] shadow-md overflow-hidden rounded-xl flex flex-col justify-between bg-[#F4F6FA] p-0">
              <div className="flex gap-x-2 items-center py-2 px-3">
                <IoIosInformationCircle size={25} color="#000" />
                <span className="text-lg font-semibold">
                  BANDOBAST INFO
                </span>
              </div>
              <Map />
            </Link>
          </div>
          <div className="flex flex-col w-[51rem] bg-[#F4F6FA] p-6 rounded-md gap-y-4 shadow-md">
            <h1 className="text-3xl font-semibold">
              Title: Lorem, ipsum dolor.
            </h1>
            <p className="text-base text-[#3C3C3C]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              facilis quasi, maiores laboriosam nesciunt voluptates sunt
              asperiores voluptatem, excepturi iste modi nemo tempore odio ipsa.
            </p>
            <div className="flex gap-x-3">
              <TitlePersonal />
              <LocationTime />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
