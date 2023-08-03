import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../Assests/logo.png";
import { HiUsers } from "react-icons/hi";
import { HiMiniCpuChip } from "react-icons/hi2";
import { BsFillCarFrontFill } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Sidebar() {
  const {
    screenSize,
    setScreenSize,
    activeMenu,
    setActiveMenu,
    menuWidth,
    setMenuWidth,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(() => {
        return window.innerWidth;
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  useEffect(() => {
    if (
      window.localStorage.getItem("token") === null ||
      window.localStorage.getItem("token") === undefined
    ) {
      setActiveMenu(() => {
        return false;
      });
    } else if (screenSize >= 1000 && menuWidth)
      setActiveMenu(() => {
        return true;
      });
    else
      setActiveMenu(() => {
        return false;
      });
  }, [screenSize, menuWidth]);

  return (
    <>
      <div
        className={`md:overflow-hidden overflow-auto md:hover:overflow-auto fixed ${
          activeMenu ? "w-52" : ""
        } bg-background z-50 h-screen transition-all duration-500 ease-in-out`}
      >
        <div className="flex flex-col justify-between h-screen border-r-3">
          <div className="">
            <div
              className="flex justify-center items-center gap-x-2 py-6 border-b-3"

              onClick={() => {
                setMenuWidth((prev) => (prev = !prev));
              }}
            >
              <img className="w-7" src={logo} alt="logo" />
              {activeMenu && (
                <span className="text-xl font-normal text-primary">
                  TrackPatrol
                </span>
              )}
            </div>
            <div
              className={`flex flex-col px-4 gap-y-1 mt-20 py-3 drop-shadow`}
            >
              <NavLink to="/">
                <BiSolidDashboard size={25} />
                {activeMenu && <span>Dashboard</span>}
              </NavLink>

              <NavLink to="/bandobast/register">
                <BsFillCarFrontFill size={25} />
                {activeMenu && <span>Bandobast</span>}
              </NavLink>
              <NavLink to="/personnel">
                <HiUsers size={25} />
                {activeMenu && <span>Personnel</span>}
              </NavLink>
              <NavLink to="/hardware">
                <HiMiniCpuChip size={25} />
                {activeMenu && <span>Hardware</span>}
              </NavLink>
              <div className="bg-[#DBDBDB] w-full h-[2px] my-2 drop-shadow-none"></div>

              <NavLink to="/admin">
                <MdAdminPanelSettings size={25} />
                {activeMenu && <span>Admin</span>}
              </NavLink>
            </div>
          </div>
          <div className="px-4 mb-4 rounded-md">
            <NavLink className="" to="/setting">
              <AiOutlineSetting size={25} />
              {activeMenu && <span>SETTINGS</span>}
            </NavLink>
            <NavLink to="/logout">
              <IoLogOut size={25} />
              {activeMenu && <span>Logout</span>}
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
