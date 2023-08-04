import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidTimeFive } from "react-icons/bi";
import { FaBuilding } from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

export default function DutyCard() {
    return (
        <div className="p-4 bg-white rounded-md drop-shadow-sm ">
            <div className="flex justify-between  items-center ">
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 drop-shadow-lg ">
                    <div className="col-span-2 flex gap-x-3 ">
                        <div className="bg-[#DD81120d] rounded-lg p-2">
                            <div className="p-2 bg-[#DD8112] rounded-full flex justify-center items-center">
                                <FaBuilding size={20} color="#fff" />
                            </div>
                        </div>
                        <span className="bg-[#DD81120d] rounded-lg p-3 text-primary">
                            BB-889178 : PM Narendra Modi's arrival for the
                            speech
                        </span>
                    </div>

                    <div className="flex items-center gap-x-3">
                        <div className="bg-[rgba(13,119,211,0.05)] rounded-lg p-2">
                            <div className="p-2 bg-[#0D76D3] rounded-full flex justify-center items-center">
                                <FaLocationDot size={20} color="#fff" />
                            </div>
                        </div>
                        <span className="bg-[rgba(13,119,211,0.05)] rounded-lg p-3">
                            Pune city's Cantonment area, Maharashtra
                        </span>
                    </div>

                    <div className="flex items-center  gap-x-3">
                        <div className="bg-[rgba(13,119,211,0.05)] rounded-lg p-2">
                            <div className="p-2 bg-[#0D76D3] rounded-full flex justify-center items-center">
                                <BiSolidTimeFive size={20} color="#fff" />
                            </div>
                        </div>
                        <span className="bg-[rgba(13,119,211,0.05)] rounded-lg p-3">
                            2nd November, 2023
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-x-6 mr-20 drop-shadow-lg">
                    <Link
                        to="/create/bandobast"
                        className="flex items-center gap-x-2 bg-[#006ED3] rounded-md py-1 px-3 "
                    >
                        <span className="text-white">Edit</span>
                        <AiTwotoneEdit size={25} color="#fff" />
                    </Link>
                    <div className="flex items-center gap-x-2 bg-[#D46A43] rounded-md py-1 px-3">
                        <span className="text-white">Delete</span>
                        <AiFillDelete size={25} color="#fff" />
                    </div>
                </div>
            </div>
        </div>
    );
}
