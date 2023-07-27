import { useState } from "react";
import Input from "../Components/Input";
import Label from "../Components/Label";
import { Button } from "../Components/Button";
import { DatePicker } from "../Components/DatePicker";
import { useStateContext } from "../Contexts/ContextProvider";
import {IoIosArrowBack} from 'react-icons/io'
import { Link } from "react-router-dom";

export default function RegisterPersonnel() {
  const [dob, setDob] = useState(new Date());
  const {screenSize} = useState(window.innerWidth);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(window.innerWidth/ 420);
  };

  return (
    <>
      <div>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-start pr-4 py-2 bg-[#F4F6FA] shadow-md mt-6 mx-8"
        >
          <IoIosArrowBack size={25} color="#222" />
          <span className="text-2xl text-neutral-700 font-semibold">Back</span>
        </Link>
        <h1 className="text-4xl font-semibold text-center mt-16">
          Register Personnel
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={`grid grid-cols-${Math.max(1,Math.min(3, Math.floor(window.innerWidth / 470)))} gap-8 justify-items-center mx-20 my-16`}>
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
        <div className="flex items-center justify-center">
          <Button type="submit" className="px-12">
            Create
          </Button>
        </div>
      </form>
    </>
  );
}
