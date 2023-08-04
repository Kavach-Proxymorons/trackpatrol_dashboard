import { useEffect, useState } from "react";
import DataTable from "../../../Components/ui-components/personnelAssignmentTable";
import { headers } from "../../../Components/ui-components/personnelAssignmentTable/skeletons/personnel";
import { useStateContext } from "../../../Contexts/ContextProvider";

export default function PersonnelList(props) {
  const { hardwares, getHardwares, assignedAndAvailablePersonnel, getAssignedAndAvailablePersonnel, assignedPersonnelsId  } = useStateContext(); // to remove
  const { data, shift_id } = props; // assigned hardware array from shift

  useEffect(() => {
    document.title = "Hardware's List | Bandobast";
    getAssignedAndAvailablePersonnel(shift_id);
    console.log(assignedPersonnelsId);
  }, []);

  return (
    <>
      <h1 className="text-3xl mt-8 font-semibold">Assigned Personnel</h1>
      <DataTable
            columns={headers}
            path={"hardware"}
            data={assignedAndAvailablePersonnel}
            fetchData={getAssignedAndAvailablePersonnel}
            assignedPersonnelsId={assignedPersonnelsId}
            shift_id={shift_id}
          />
    </>
  );
}
