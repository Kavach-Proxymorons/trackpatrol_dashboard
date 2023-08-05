import { TitlePersonal, LocationTime } from "../../../Components";
import { Map } from "../../../Components";
import { LuCalendar } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Input from "../../../Components/ui-components/input";
import Label from "../../../Components/ui-components/label";
import { Button } from "../../../Components/ui-components/button";
import { IoIosInformationCircle } from "react-icons/io";
import HardwareList from "./hardwarelist";
import PersonnelList from "./personnelList";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { useEffect, useState } from "react";
import { DatePickerWithRange } from "../../../Components/ui-components/datePickerwithRange";
import { useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "../../../Components/ui-components/card";

import { DatePicker } from "../../../Components/ui-components/datePicker";
import { AlarmCheck, BadgeInfo } from "lucide-react";

export default function Monitor() {
    const [date, setDate] = useState({});
    const { id } = useParams();
    const { registerShift, setRegisterShift, duty, getDutyById, postShift } =
        useStateContext();

    // Initialize shiftToggle with default values for each shift ID
    const initialShiftToggle = {};
    if (duty && duty.shifts) {
        for (const shift of duty.shifts) {
            initialShiftToggle[shift._id] = false; // Initialize with a default value (true in this case)
        }
    }
    const [shiftToggle, setShiftToggle] = useState(initialShiftToggle);

    const handleSubmit = (e) => {
        e.preventDefault();
        setRegisterShift((prev) => {
            return {
                ...prev,
                duty: id
            };
        });
        postShift(registerShift);
        setDate({});
    };

    useEffect(() => {
        document.title = "Monitor | Bandobast";
        getDutyById(id);
    }, []);

    return (
        <div className="mx-8 my-6">
            <Link
                to="/dashboard"
                className="flex items-center justify-start pr-4 py-2 bg-[#F4F6FA] w-32 shadow"
            >
                <IoIosArrowBack size={25} color="#222" />
                <span className="text-2xl text-neutral-700 font-semibold">
                    Back
                </span>
            </Link>
            <div className="flex justify-start gap-x-6 mt-6">
                <div className="flex flex-col justify-start gap-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                                <div className="w-10">
                                    <LuCalendar size={24} color="#000" />
                                </div>
                                BANDOBAST SCHEDULE
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4 shadow">
                            <p>
                                <span className="text-[#7B7D92]">
                                    Start Time:{" "}
                                </span>
                                October 24, 2023, 8:00 AM
                            </p>
                            <p>
                                <span className="text-[#7B7D92] pr-2">
                                    End Time:{" "}
                                </span>
                                October 24, 2023, 8:00 AM
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                                <div className="w-10">
                                    <BadgeInfo size={24} color="#000" />
                                </div>
                                BANDOBAST INFO
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="pb-4 w-full h-[10rem] p-0">
                            <Map />
                        </CardContent>
                    </Card>
                </div>

                <Card className="w-[34rem] shadow">
                    <CardHeader>
                        <CardTitle className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0">
                            Title: Lorem, ipsum dolor.
                        </CardTitle>
                        <CardDescription className="text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam facilis quasi, maiores laboriosam
                            nesciunt voluptates sunt.
                        </CardDescription>
                        <CardContent className="flex gap-x-3 px-0 pt-6 pb-0">
                            <TitlePersonal />
                            <LocationTime />
                        </CardContent>
                    </CardHeader>
                </Card>

                <Card className="w-[23.5rem] shadow">
                    <CardHeader>
                        <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                            Add shift
                        </CardTitle>
                        <CardDescription className="text-base">
                            Add shift to the Bandobast Duty.
                        </CardDescription>
                        <CardContent className="flex gap-x-3 px-0 py-0 pt-4">
                            <form
                                className="flex flex-col gap-y-2"
                                onSubmit={handleSubmit}
                            >
                                <div className="w-auto">
                                    <Label>Shift Name</Label>
                                    <Input
                                        type="text"
                                        name="shift_name"
                                        value={registerShift.shift_name}
                                        onChange={(e) =>
                                            setRegisterShift((prev) => ({
                                                ...prev,
                                                shift_name: e.target.value
                                            }))
                                        }
                                        placeholder="Shift Name"
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <Label>Start Time</Label>
                                    <div className="flex gap-x-2 justify-between">
                                        <DatePicker
                                            type="date"
                                            className="w-40"
                                        />
                                        <div className="relative time">
                                            <Input
                                                type="time"
                                                className="w-40 text-muted-foreground"
                                                value="00:00"
                                            />
                                            <AlarmCheck className="absolute right-2 top-2 text-muted-foreground" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Label>End Time</Label>
                                    <div className="flex gap-x-2 w-full">
                                        <DatePicker
                                            type="date"
                                            className="w-40"
                                        />
                                        <div className="relative time">
                                            <Input
                                                type="time"
                                                className="w-40 text-muted-foreground"
                                                value="00:00"
                                            />
                                            <AlarmCheck className="absolute right-2 top-2 text-muted-foreground" />
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-32 self-center mt-4"
                                >
                                    Create
                                </Button>
                            </form>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>

            {/* loop over duty.shifts array */}
            {duty &&
                duty.shifts &&
                duty.shifts.map((shift) => {
                    return (
                        <div
                            className="border-3 mt-6 cursor-pointeryyyyyy"
                            key={shift._id}
                        >
                            {/* below div contains the hardware list and personnel list for every shift */}
                            <div
                                onClick={() => {
                                    setShiftToggle((prevShiftToggle) => ({
                                        ...prevShiftToggle,
                                        [shift._id]: !prevShiftToggle[shift._id] // Toggle the value
                                    }));
                                }}
                            >
                                <h1 className="text-3xl mt-8 font-semibold">
                                    {shift.shift_name}
                                </h1>
                            </div>
                            {shiftToggle[shift._id] && (
                                <div>
                                    <h1>{shift.start_time}</h1>
                                    <h1>{shift.end_time}</h1>
                                    {shift.hardwares_attached && (
                                        <HardwareList
                                            shift_id={shift._id}
                                            data={shift.hardwares_attached}
                                        />
                                    )}
                                    {shift.personnel_assigned && (
                                        <PersonnelList
                                            shift_id={shift._id}
                                            data={shift.personnel_assigned}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
        </div>
    );
}

// to="/dashboard/monitor/details"
