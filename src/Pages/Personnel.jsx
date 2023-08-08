import { useEffect, useState, useContext } from "react";

import { useStateContext } from "../Contexts/ContextProvider";
import DataTable from "../Components/ui-components/dataTable";
import { headers } from "../Components/ui-components/dataTable/skeletons/personnel";
import AuthContext from "../Contexts/AuthContext";
import { Sidebar, Navbar } from "../Components";

export default function Personnel() {
    const { personnels, getPersonnels, activeMenu } = useStateContext();
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        document.title = "Personnel List | Bandobast";
        getPersonnels();
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
                        Personnel List
                    </h1>
                    <DataTable
                        columns={headers}
                        path={"personnel"}
                        data={personnels}
                        fetchData={getPersonnels}
                    />
                </div>
            </div>
        </>
    );
}
