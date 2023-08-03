import { useStateContext } from "../Contexts/ContextProvider";
import { Profile } from ".";

export default function Navbar() {
  const { isLogged, activeMenu, name } = useStateContext();
  return (
    <>
      {isLogged && (
        <div className="sticky top-0 z-50 border-b-3 bg-background">
            <div className="h-[78px] flex justify-between items-center ml-8">
              <p className="text-xl text-neutral-900">
                Hello <span className="font-medium">Admin</span>, Welcome back!
              </p>
              <Profile />
            </div>
        </div>
      )}
    </>
  );
}
