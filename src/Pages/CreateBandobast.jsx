import Input from "../Components/Input";
import Label from "../Components/Label";
import {Button} from '../Components/Button';
import { DatePickerWithRange } from "../Components/DatePickerwithRange";

export default function CreateBandobast() {
  return (
    <div className="flex flex-col justify-center items-center w-auto gap-6 mt-12">
      <div>
        <Label htmlFor="title">Bandobast Title</Label>
        <Input type="text" id="text" placeholder="Title" />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" placeholder="Description" />
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

      <div>
        <Label htmlFor="note">Note</Label>
        <Input type="text" id="note" placeholder="Note" />
        <p className="mt-2 font-medium text-base text-gray-500">Optional</p>
      </div>
      <Button className='px-8'>Create</Button>
    </div>
  );
}
