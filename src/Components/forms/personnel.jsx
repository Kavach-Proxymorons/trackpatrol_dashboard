import { useState, useEffect, useContext } from "react";
import Input from "../ui-components/input";
import Label from "../ui-components/label";
import { Button } from "../ui-components/button";
import { DatePicker } from "../ui-components/datePicker";
import { useStateContext } from "../../Contexts/ContextProvider";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import DataTable from "../ui-components/dataTable";
import { set } from "date-fns";

export default function PersonnelRegisterForm() {
    const [gridSize, setGridSize] = useState(3);
  const [dob, setDob] = useState(new Date());
  const { screenSize } = useStateContext();

  useEffect(() => {
    setGridSize(Math.max(1,Math.min(3, Math.floor(window.innerWidth / 470))));
  }, [screenSize]);

  const handleSubmit = (e) => {
  };

  return (
    <>
      <div>
        <Link
          to="/personnel"
          className="inline-flex items-center justify-start pr-4 py-2 bg-[#F4F6FA] shadow mt-6 mx-8"
        >
          <IoIosArrowBack size={25} color="#222" />
          <span className="text-2xl text-neutral-700 font-semibold">Back</span>
        </Link>
        <h1 className="text-4xl font-semibold text-center mt-16">
          Register Personnel
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={`grid grid-cols-${gridSize} justify-items-center gap-y-6 mt-12`}>
          <div>
            <Label htmlFor="sid">Member Id</Label>
            <Input type="text" placeholder="Member Id" name="sid" />
          </div>

          <div>
            <Label htmlFor="name">Member Name</Label>
            <Input type="text" placeholder="Member Name" name="name" />
          </div>

          <div>
            <Label htmlFor="blood_group">Blood Group</Label>
            <Input type="text" placeholder="Blood Group" name="blood_group" />
          </div>

          <div>
            <Label htmlFor="venue">Date of Birth</Label>
            <DatePicker date={dob} setDate={setDob} />
          </div>

          <div>
            <Label htmlFor="designation">Designation</Label>
            <Input type="text" placeholder="Designation" name="designation" />
          </div>

          <div>
            <Label htmlFor="identification_mark">Identification Mark</Label>
            <Input
              type="text"
              placeholder="Identification Mark"
              name="identification_mark"
            />
          </div>

          <div>
            <Label htmlFor="posted_at">Posted At</Label>
            <Input type="text" placeholder="Posted At" name="posted_at" />
          </div>

          <div>
            <Label htmlFor="photograph">Picture</Label>
            <Input type="file" name="photograph" className="pt-1 rounded" />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input type="text" placeholder="Address" name="address" />
            {/* <p className="mt-2 font-medium text-base text-gray-500"></p> */}
          </div>
        </div>
        <div className="flex items-center justify-center mt-8">
          <Button type="submit" className="px-12">
            Create
          </Button>
        </div>
      </form>
    </>
  );
}
