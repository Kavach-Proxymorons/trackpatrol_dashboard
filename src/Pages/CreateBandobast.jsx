import Input from "../Components/Input";
import Label from "../Components/Label";
import { DatePickerWithRange } from "../Components/DatePickerwithRange";

export default function CreateBandobast() {
  return (
    <div className="flex flex-col justify-center items-center w-auto gap-6 mt-12">
      <div>
        <Label htmlFor="title">Bandobast Title</Label>
        <Input type="text" id="text" placeholder="title" />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" placeholder="description" />
      </div>

      <div>
        <Label htmlFor="venue">Venue</Label>
        <Input type="text" id="venue" placeholder="Venue" />
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input type="text" id="location" placeholder="Location" />
      </div>  
      <DatePickerWithRange />   
    </div>
  );
}
