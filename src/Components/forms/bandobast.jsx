import { useEffect, useState, useContext } from "react";
import Input from "../ui-components/input";
import Label from "../ui-components/label";
import { Button } from "../ui-components/button";
import { DatePickerWithRange } from "../ui-components/datePickerwithRange";
import { useStateContext } from "../../Contexts/ContextProvider";
import AuthContext from "../../Contexts/AuthContext";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import LocationPicker from "../LocationPicker";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "../ui-components/sheet";
import { Sidebar, Navbar } from "../";

export default function CreateBandobast() {
    const { registerDuty, setRegisterDuty, postDuty, activeMenu } =
        useStateContext();
    const { isLoggedIn } = useContext(AuthContext);
    const [selectedLocation, setSelectedLocation] = useState({
        lat: 28.4739155,
        lng: 77.4885724,
        placeholder: true
    });
    const [date, setDate] = useState({});

    // useEffect(() => {
    //     setRegisterDuty((prev) => ({
    //         ...prev,
    //         location: `${selectedLocation?.lat},${selectedLocation?.lng}`
    //     }));
    //     console.log(selectedLocation);
    // }, [selectedLocation]);

    const handleSelect = (e) => {
        setRegisterDuty((prev) => ({
            ...prev,
            location: `${selectedLocation?.lat},${selectedLocation?.lng}`
        }));
    };

    const handleChange = (e) => {
        setRegisterDuty((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
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
        <>
            {isLoggedIn && <Sidebar />}
            <div
                className={`${
                    isLoggedIn ? (activeMenu ? "ml-52" : "ml-[84px]") : ""
                } `}
            >
                <Navbar />
                <div>
                    <div>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center justify-start pr-4 py-2 bg-[#F4F6FA] shadow mt-6 mx-8"
                        >
                            <IoIosArrowBack size={25} color="#222" />
                            <span className="text-2xl text-neutral-700 font-semibold">
                                Back
                            </span>
                        </Link>
                        <h1 className="text-4xl font-semibold text-center mt-16 text-primary">
                            Create Bandobast
                        </h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 justify-items-center place-content-center gap-x-24 gap-y-6 mt-12">
                            <div className="justify-self-end">
                                <Label htmlFor="title">Bandobast Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    value={registerDuty.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="justify-self-start">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    value={registerDuty.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="justify-self-end">
                                <Label htmlFor="venue">Venue</Label>
                                <Input
                                    type="text"
                                    placeholder="Venue"
                                    name="venue"
                                    value={registerDuty.venue}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="justify-self-start ">
                                <Label htmlFor="location">Location</Label>
                                {/* <Input
                            type="text"
                            placeholder="Location"
                            name="location"
                            value={`${selectedLocation?.lat},${selectedLocation?.lng}`}
                            // value={registerDuty.location}
                            onChange={handleChange}
                        /> */}
                                <Sheet>
                                    <SheetTrigger>
                                        <Input
                                            type="text"
                                            placeholder="Click here to pick a location"
                                            value={
                                                selectedLocation?.placeholder
                                                    ? "Click here to pic a location"
                                                    : `${selectedLocation?.lat},${selectedLocation?.lng}`
                                            }
                                            // value={registerDuty.location}
                                            onChange={handleChange}
                                            name="location"
                                        />
                                    </SheetTrigger>
                                    <SheetContent className="w-[1000px] sm:w-[1000px]">
                                        <SheetHeader className="pb-24">
                                            <SheetTitle>
                                                Select Location
                                            </SheetTitle>
                                            <SheetDescription>
                                                This will be the location of the
                                                duty and will be used to track
                                                the personnel.
                                            </SheetDescription>
                                            <Input
                                                type="text"
                                                placeholder="search here"
                                            />
                                        </SheetHeader>
                                        <LocationPicker
                                            selectedLocation={selectedLocation}
                                            setSelectedLocation={
                                                setSelectedLocation
                                            }
                                        />
                                    </SheetContent>
                                </Sheet>
                            </div>
                            <div className="justify-self-end">
                                <Label htmlFor="Date">Duration</Label>
                                <DatePickerWithRange
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
                                    value={registerDuty.note}
                                    onChange={handleChange}
                                />
                                <p className="mt-2 font-medium text-base text-slate-400 text-right">
                                    Optional
                                </p>
                            </div>
                        </div>
                        {/* <div className="mt-8 flex justify-center">
                    <LocationPicker
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                    />
                </div> */}
                        <div className="mt-8 flex justify-center">
                            <Button type="submit" className="px-12">
                                Create
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
