import { useEffect } from "react";
import DataTable from "../Components/ui-components/dataTable";
import { headers } from "../Components/ui-components/dataTable/skeletons/hardware";
import { useStateContext } from "../Contexts/ContextProvider";
import toast from "react-hot-toast";

export default function Hardware() {
  const { hardwares, getHardwares } = useStateContext();
  useEffect(() => {
    document.title = "Hardware's List | Bandobast";
    getHardwares();
  }, []);
  return (
    <>
      <div className="mx-12">
        <h1 className="text-4xl font-semibold text-start mt-8">
          Hardware's List
        </h1>
        <DataTable columns={headers} path={"hardware"} data={hardwares} fetchData={getHardwares} />
      </div>
    </>
  );
}
