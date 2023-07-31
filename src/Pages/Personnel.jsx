import { useEffect, useState } from "react";

import { useStateContext } from "../Contexts/ContextProvider";
import DataTable from "../Components/ui-components/dataTable";
import { headers } from "../Components/ui-components/dataTable/skeletons/personnel";

export default function Personnel() {
  const { personnels, getPersonnels } = useStateContext();

  useEffect(() => {
    document.title = "Personnel's List | Bandobast";
    getPersonnels();
  }, []);

  return (
    <>
      <div className="mx-12">
        <h1 className="text-4xl font-semibold text-start mt-4">
          Personnel's List
        </h1>
        <DataTable
          columns={headers}
          path={"personnel"}
          data={personnels}
          fetchData={getPersonnels}
        />
      </div>
    </>
  );
}
