import DataTable from "../Components/ui-components/dataTable";
import { headers } from "../Components/ui-components/dataTable/skeletons/hardware";

const data = [
  {
    _id: "64ac934f0a1b0e81592ef533",
    sid: "456745",
    secret: "123456789",
    name: "uhf rfid unit 1",
    description: "uhf rfid unit 1",
    type: "uhf rfid",
    status: "idle",
    __v: 0,
  },
  {
    _id: "64ac934f0a1b0e81592ef533",
    sid: "324354",
    secret: "123456789",
    name: "uhf rfid unit 1",
    description: "uhf rfid unit 1",
    type: "uhf rfid",
    status: "idle",
    __v: 0,
  },
  {
    _id: "64ac934f0a1b0e81592ef533",
    sid: "324563",
    secret: "123456789",
    name: "uhf rfid unit 1",
    description: "uhf rfid unit 1",
    type: "uhf rfid",
    status: "idle",
    __v: 0,
  },
  {
    _id: "64ac934f0a1b0e81592ef533",
    sid: "876475",
    secret: "123456789",
    name: "uhf rfid unit 1",
    description: "uhf rfid unit 1",
    type: "uhf rfid",
    status: "idle",
    __v: 0,
  },
  {
    _id: "64ac934f0a1b0e81592ef533",
    sid: "324562",
    secret: "123456789",
    name: "uhf rfid unit 1",
    description: "uhf rfid unit 1",
    type: "uhf rfid",
    status: "idle",
    __v: 0,
  },
];

export default function Hardware() {
  return (
    <>
      <div className="mx-12">
        <h1 className="text-4xl font-semibold text-start mt-8">
          Hardware's List
        </h1>
        <DataTable columns={headers} path={"hardware"} data={data} />
      </div>
    </>
  );
}
