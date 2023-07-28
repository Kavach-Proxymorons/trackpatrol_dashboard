import { useStateContext } from "../Contexts/ContextProvider";
import { Profile } from "../Components";

export default function Navbar() {
  const { isLogged, activeMenu, name } = useStateContext();
  return (
    <>
      {isLogged && (
        <div className="w-full">
          <div className="h-[83px] flex justify-between items-center ml-8">
            <p className="text-xl text-neutral-900">
              Hello <span className="font-medium">Admin</span>, Welcome back!
            </p>
            <Profile />
          </div>
          <div className="bg-[#DBDBDB] h-[2px] drop-shadow-md"></div>
        </div>
      )}
    </>
  );
}
