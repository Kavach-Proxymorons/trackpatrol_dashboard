import { useState } from "react";
import Input from "../Components/Input";
import Label from "../Components/Label";
import { Button } from "../Components/Button";
import { useForm } from "react-hook-form";
import { DatePickerWithRange } from "../Components/DatePickerwithRange";
import { useStateContext } from "../Contexts/ContextProvider";

export default function CreateBandobast() {
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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center w-auto gap-6 mt-12">
        <div>
          <Label htmlFor="title">Bandobast Title</Label>
          <Input type="text" placeholder="Title" name="title" />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input type="text" placeholder="Description" name="description" />
        </div>

        <div>
          <Label htmlFor="venue">Venue</Label>
          <Input type="text" placeholder="Venue" name="venue" />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input type="text" placeholder="Location" name="location" />
        </div>
        <DatePickerWithRange date={date} setDate={setDate} />

        <div>
          <Label htmlFor="note">Note</Label>
          <Input type="text" placeholder="Note" name="note" />
          <p className="mt-2 font-medium text-base text-gray-500">Optional</p>
        </div>
        <Button type="submit" className="px-8">
          Create
        </Button>
      </div>
    </form>
  );
}
