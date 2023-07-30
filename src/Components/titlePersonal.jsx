import { FaBuilding, FaUser } from "react-icons/fa";

export default function TitlePersonal() {
  return (
    <div className="w-80 flex flex-col justify-between items-start gap-y-2 p-3 bg-white drop-shadow rounded-xl ">
      <div className="flex items-start justify-between gap-x-2">
        <div className="bg-[#DD81120d] rounded-lg p-2">
          <div className="p-1 bg-[#DD8112] rounded-full flex justify-center items-center ">
            <FaBuilding size={20} color="#fff" />
          </div>
        </div>
        <span className="bg-[#DD81120d] rounded-lg p-2">
          PM Narendra Modi's arrival for the speech
        </span>
      </div>

      <div className="flex items-start justify-between gap-x-2">
        <div className="bg-[#DD81120d] rounded-lg p-2">
          <div className="p-1 bg-[#DD8112] rounded-full flex justify-center items-center">
            <FaUser size={20} color="#fff" />
          </div>
        </div>
        <span className="bg-[#DD81120d] rounded-lg p-2">
          2000 police personnels
        </span>
      </div>
    </div>
  );
}
