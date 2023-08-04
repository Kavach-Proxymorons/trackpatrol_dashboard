import { useEffect } from "react";
import DataTable from "../Components/ui-components/dataTable";
import { headers } from "../Components/ui-components/dataTable/skeletons/hardware";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Hardware() {
    const { hardwares, setHardwares, getHardwares } = useStateContext();

    useEffect(() => {
        document.title = "Hardware's List | Bandobast";
        getHardwares();
    }, []);
    return (
        <>
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
        </>
    );
}
