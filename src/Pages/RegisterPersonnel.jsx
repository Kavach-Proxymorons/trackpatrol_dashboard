import { Data } from "@react-google-maps/api";
// import '../Components/personnelRegForm';
import DataTable from "../Components/ui-components/DataTable";

export default function RegisterPersonnel() {
  return (
    <>
      <div className="mx-12">
        <h1 className="text-4xl font-semibold text-start mt-16">
          Personnel's List
        </h1>
        <DataTable />
      </div>
    </>
  );
}
