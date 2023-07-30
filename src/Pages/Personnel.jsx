import DataTable from "../Components/ui-components/dataTable";
import { headers} from "../Components/ui-components/dataTable/skeletons/personnel";

// later this data will be fetched from the database
const data = [
  {
    id: "m5gr84i9",
    amount: 316,
    sid: "2011025",
    name: "ken99",
    designation: "Officer",
    posted_at: "PM Service",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    sid: "2011024",
    designation: "Officer",
    name: "Abe45",
    posted_at: "PM Service",
  },
  {
    id: "derv1ws0",
    amount: 837,
    sid: "2011024",
    designation: "Officer",
    name: "Monserrat44",
    posted_at: "PM Service",
  },
  {
    id: "5kma53ae",
    amount: 874,
    sid: "2011024",
    designation: "Officer",
    name: "Silas22",
    posted_at: "PM Service",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    sid: "2011024",
    designation: "Officer",
    name: "carmella_ortiz",
    posted_at: "PM Service",
  },
];

export default function Personnel() {
  return (
    <>
      <div className="mx-12">
        <h1 className="text-4xl font-semibold text-start mt-8">
          Personnel's List
        </h1>
        <DataTable columns={headers} path={'personnel'} data={data} />
      </div>
    </>
  );
}
