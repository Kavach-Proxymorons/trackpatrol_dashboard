import { useState } from "react";
import Input from "../Components/Input";
import Label from "../Components/Label";
import { Button } from "../Components/Button";
import { DatePickerWithRange } from "../Components/DatePickerwithRange";
import { useStateContext } from "../Contexts/ContextProvider";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function RegisterHardware() {
  const { duty, setDuty, postDuty } = useStateContext();
  const [date, setDate] = useState({
    start_time: "",
    end_time: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(typeof date.from);
    const duty = {
      title: e.target.title.value,
      description: e.target.description.value,
      venue: e.target.venue.value,
      location: e.target.location.value,
      start_time: date.from,
      end_time: date.to,
      note: e.target.note.value,
    };
    setDuty(() => duty);
    postDuty();
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
        <div className="grid grid-cols-2 justify-items-center items-center gap-x-12 gap-y-6 mt-16">
          <div className="justify-self-end">
            <Label htmlFor="title">Bandobast Title</Label>
            <Input type="text" placeholder="Title" name="title" />
          </div>

          <div className="justify-self-start">
            <Label htmlFor="description">Description</Label>
            <Input type="text" placeholder="Description" name="description" />
          </div>

          <div className="justify-self-end">
            <Label htmlFor="venue">Venue</Label>
            <Input type="text" placeholder="Venue" name="venue" />
          </div>

          <div className="justify-self-start">
            <Label htmlFor="location">Location</Label>
            <Input type="text" placeholder="Location" name="location" />
          </div>
          <div className="justify-self-end self-start">
            <Label htmlFor="venue">Date of Birth</Label>
            <DatePickerWithRange
              date={date}
              setDate={setDate}
            />
          </div>

          <div className="justify-self-start">
            <Label htmlFor="note">Note</Label>
            <Input type="text" placeholder="Note" name="note" />
            <p className="mt-2 font-medium text-base text-gray-500">Optional</p>
          </div>
          <Button type="submit" className="px-8">
            Create
          </Button>
        </div>
      </form>
    </>
  );
}
