import { FaBuilding, FaUser } from "react-icons/fa";

export default function TitlePersonal() {
  return (
    <div className="h-40 w-80 flex flex-col justify-between items-start p-3 bg-white drop-shadow rounded-xl">
      <div className="flex items-center justify-between gap-x-4">
        <div className="bg-[#DD81120d] rounded-lg p-2">
          <div className="p-2 bg-[#DD8112] rounded-full flex justify-center items-center ">
            <FaBuilding size={25} color="#fff" />
          </div>
        </div>
        <span className="bg-[#DD81120d] rounded-lg p-3">
          PM Narendra Modi's arrival for the speech
        </span>
      </div>

      <div className="flex items-center justify-between gap-x-4">
        <div className="bg-[#DD81120d] rounded-lg p-2">
          <div className="p-2 bg-[#DD8112] rounded-full flex justify-center items-center">
            <FaUser size={25} color="#fff" />
          </div>
        </div>
        <span className="bg-[#DD81120d] rounded-lg p-3">
          2000 police personnels
        </span>
      </div>
    </div>
  );
}
