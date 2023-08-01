import { useEffect, useState } from "react";
import Input from "../ui-components/input";
import Label from "../ui-components/label";
import { Button } from "../ui-components/button";
import { DatePickerWithRange } from "../ui-components/datePickerwithRange";
import { useStateContext } from "../../Contexts/ContextProvider";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function CreateBandobast() {
  const { duty, setDuty, postDuty } = useStateContext();
  const [date, setDate] = useState({});

  const handleChange = (e) => {
    setDuty((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    document.title = "Create Bandobast | Bandobast";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDate({});
    postDuty();
  };

  return (
    <div>
      <div>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-start pr-4 py-2 bg-[#F4F6FA] shadow mt-6 mx-8"
        >
          <IoIosArrowBack size={25} color="#222" />
          <span className="text-2xl text-neutral-700 font-semibold">Back</span>
        </Link>
        <h1 className="text-4xl font-semibold text-center mt-16">
          Create Bandobast
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 justify-items-center gap-x-24 gap-y-6 mt-12">
          <div className="justify-self-end">
            <Label htmlFor="title">Bandobast Title</Label>
            <Input
              type="text"
              placeholder="Title"
              name="title"
              value={duty.title}
              onChange={handleChange}
            />
          </div>

          <div className="justify-self-start">
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              placeholder="Description"
              name="description"
              value={duty.description}
              onChange={handleChange}
            />
          </div>

          <div className="justify-self-end">
            <Label htmlFor="venue">Venue</Label>
            <Input
              type="text"
              placeholder="Venue"
              name="venue"
              value={duty.venue}
              onChange={handleChange}
            />
          </div>

          <div className="justify-self-start">
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              placeholder="Location"
              name="location"
              value={duty.location}
              onChange={handleChange}
            />
          </div>
          <div className="justify-self-end">
            <Label htmlFor="Date">Duration</Label>
            <DatePickerWithRange
              duty={duty}
              setDuty={setDuty}
              date={date}
              setDate={setDate}
            />
          </div>

          <div className="justify-self-start">
            <Label htmlFor="note">Note</Label>
            <Input
              type="text"
              placeholder="Note"
              name="note"
              value={duty.note}
              onChange={handleChange}
            />
            <p className="mt-2 font-medium text-base text-slate-400 text-right">
              Optional
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button type="submit" className="px-12">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
