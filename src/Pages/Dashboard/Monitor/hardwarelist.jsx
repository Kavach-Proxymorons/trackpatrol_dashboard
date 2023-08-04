import { useEffect, useState } from "react";
import DataTable from "../../../Components/ui-components/hardwareAllotmentTable";
import { headers } from "../../../Components/ui-components/hardwareAllotmentTable/skeletons/hardware";
import { useStateContext } from "../../../Contexts/ContextProvider";

export default function HardwareList(props) {
  const { hardwares, getHardwares, assignedAndIdleHardwares, getAssignedAndIdleHardwares } = useStateContext(); // to remove
  const { data, shift_id } = props; // assigned hardware array from shift
  const [tableData, setTableData] = useState([]); // for storing hardwares to display in table
  const [toggleRerender, setToggleRerender] = useState(false); // to rerender the table after assigning hardware

  useEffect(() => {
    document.title = "Hardware's List | Bandobast";
    getAssignedAndIdleHardwares(shift_id);
  }, []);

  return (
    <>
      <h1 className="text-3xl mt-8 font-semibold">Attached Hardwares</h1>
      <DataTable
            columns={headers}
            path={"hardware"}
            data={assignedAndIdleHardwares}
            fetchData={getAssignedAndIdleHardwares}
            shift_id={shift_id}
          />
    </>
  );
}