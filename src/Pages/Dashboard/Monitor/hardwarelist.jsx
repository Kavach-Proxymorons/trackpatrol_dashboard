import { useEffect, useState } from "react";
import DataTable from "../../../Components/ui-components/dataTable";
import { headers } from "../../../Components/ui-components/dataTable/skeletons/hardware";
import { useStateContext } from "../../../Contexts/ContextProvider";

export default function HardwareList() {
    const { hardwares, getHardwares } = useStateContext();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.title = "Hardware's List | Bandobast";
        // getHardwares();
        // console.log(hardwares.hardwares_attached);
    }, []);

    return (
        <div className="mt-6 mr-12 border-2 rounded-md">
            <h2
                className="py-1 px-3 text-2xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-t-md cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                Hardware's List
            </h2>
            {isOpen && (
                <div className="px-6">
                    <DataTable
                        columns={headers}
                        path={"hardware"}
                        data={hardwares}
                        fetchData={getHardwares}
                    />
                </div>
            )}
        </div>
    );
}
