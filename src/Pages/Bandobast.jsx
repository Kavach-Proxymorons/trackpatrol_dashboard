import { useEffect, useContext } from "react";
import { Sidebar, Navbar } from "../Components";
import { useStateContext } from "../Contexts/ContextProvider";
import AuthContext from "../Contexts/AuthContext";

export default function Bandobast() {
    const { activeMenu } = useStateContext();
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        document.title = "Hardware's List | Bandobast";
    }, []);
    return (
        <>
            {isLoggedIn && <Sidebar />}
            <div
                className={`${
                    isLoggedIn ? (activeMenu ? "ml-52" : "ml-[84px]") : ""
                } `}
            >
                <Navbar />
                <div className="mx-12">
                    <h1 className="text-4xl font-semibold text-start mt-4">
                        Dashboard
                    </h1>
                </div>
            </div>
        </>
    );
}
