import { useEffect, useState, useContext } from "react";

import { useStateContext } from "../../Contexts/ContextProvider";
import DataTable from "../../Components/ui-components/dataTable";
import AuthContext from "../../Contexts/AuthContext";
import { Sidebar, Navbar } from "../../Components";
import useFetch from "../../hooks/useFetch";
import { header } from "./adminList";

const tid = "something";
export default function Admin() {
    const baseUrl =
        process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL;
    const { personnels, getPersonnels, activeMenu } = useStateContext();
    const { isLoggedIn } = useContext(AuthContext);
    const { token } = useContext(AuthContext);
    const [adminData, setAdminData] = useState([]);

    const handleFetch = async () => {
        const response = await fetch(`${baseUrl}auth/allUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const res = await response.json();
        console.log(res.data);
        setAdminData(res.data);
    };

    useEffect(() => {
        handleFetch();
    }, []);

    useEffect(() => {
        document.title = "Admin | Bandobast";
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
                        Admin Panel
                    </h1>
                    <DataTable
                        columns={header}
                        path={"admin"}
                        data={adminData}
                        fetchData={getPersonnels}
                    />
                </div>
            </div>
        </>
    );
}
