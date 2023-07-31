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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui-components/select";

export default function PersonnelRegisterForm() {
  const [dob, setDob] = useState(new Date());
  const { setRegisterPersonnel, postPersonnel, screenSize } = useStateContext();
  const [gridSize, setGridSize] = useState(3);

  useEffect(() => {
    setGridSize(Math.max(1, Math.min(3, Math.floor(window.innerWidth / 470))));
  }, [screenSize]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.dob = dob;

    console.log(data);
    setRegisterPersonnel(data);
    postPersonnel();
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
        <div
          className={`grid  ${
            gridSize === 3 ? "grid-cols-3" : `grid-cols-${gridSize}`
          }  justify-items-center place-content-center gap-y-6 mt-12`}
        >
          <div>
            <Label>Member Id</Label>
            <Input type="text" placeholder="Member Id" name="sid" />
          </div>

          <div>
            <Label>Member Name</Label>
            <Input type="text" placeholder="Member Name" name="official_name" />
          </div>

          <div>
            <Label>Password</Label>
            <Input type="text" placeholder="Password" name="password" />
          </div>

          <div>
            <Label>Blood Group</Label>
            <Input type="text" placeholder="Blood Group" name="blood_group" />
          </div>

          <div>
            <Label>Date of Birth</Label>
            <DatePicker date={dob} setDate={setDob} />
          </div>

          <div>
            <Label>Gender</Label>
            <Select required name="gender">
              <SelectTrigger className="h-10 w-96 px-3 rounded-md border border-input bg-background text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    className="text-lg text-muted-foreground"
                    value="idle"
                  >
                    Male
                  </SelectItem>
                  <SelectItem
                    className="text-lg text-muted-foreground"
                    value="busy"
                  >
                    Female
                  </SelectItem>
                  <SelectItem
                    className="text-lg text-muted-foreground"
                    value="broken"
                  >
                    Others
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Designation</Label>
            <Input type="text" placeholder="Designation" name="designation" />
          </div>

          <div>
            <Label>Identification Mark</Label>
            <Input
              type="text"
              placeholder="Identification Mark"
              name="identification_mark"
            />
          </div>

          <div>
            <Label>Posted At</Label>
            <Input type="text" placeholder="Posted At" name="posted_at" />
          </div>

          {/* <div>
            <Label>Picture</Label>
            <Input type="file" name="photograph" className="pt-1 rounded" />
          </div> */}

          <div>
            <Label>Picture</Label>
            <Input type="url" placeholder="Add image URL" name="photograph" />
          </div>
          <div className="">
            <Label>Address</Label>
            <Input
              type="text"
              placeholder="Address"
              name="address"
              className=""
            />
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
