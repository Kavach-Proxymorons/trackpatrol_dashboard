import { useContext } from "react";
import { Profile } from ".";
import AuthContext from "../Contexts/AuthContext";

export default function Navbar() {
    const { token, user } = useContext(AuthContext);
    return (
        <>
            {token && (
                <div className="sticky top-0 z-50 border-b-3 bg-background">
                    <div className="h-[78px] flex justify-between items-center ml-8">
                        <p className="text-xl text-neutral-900">
                            Hello <span className="font-medium">{user.name}</span>, Welcome back!
                        </p>
                        <Profile />
                    </div>
                </div>
            )}
        </>
    );
}
