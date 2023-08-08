import { useEffect,useContext } from "react";
import DataTable from "../Components/ui-components/dataTable";
import { headers } from "../Components/ui-components/dataTable/skeletons/hardware";
import {Sidebar, Navbar} from '../Components';
import { useStateContext } from "../Contexts/ContextProvider";
import AuthContext from "../Contexts/AuthContext";

export default function Hardware() {
    const { hardwares, getHardwares, activeMenu } =
        useStateContext();
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        document.title = "Hardware's List | Bandobast";
        getHardwares();
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
                        Hardware's List
                    </h1>
                    <DataTable
                        columns={headers}
                        path={"hardware"}
                        data={hardwares}
                        fetchData={getHardwares}
                    />
                </div>
            </div>
        </>
    );
}
