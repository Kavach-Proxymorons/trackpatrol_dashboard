import { useState, useEffect, useContext } from "react";
import Input from "../ui-components/input";
import Label from "../ui-components/label";
import { Button } from "../ui-components/button";
import { DatePicker } from "../ui-components/datePicker";
import { useStateContext } from "../../Contexts/ContextProvider";
import AuthContext from "../../Contexts/AuthContext";
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
    SelectValue
} from "../ui-components/select";
import { Sidebar, Navbar } from "../";

export default function PersonnelRegisterForm() {
    const [dob, setDob] = useState(new Date());
    const [gender, setGender] = useState("");
    const {
        registerPersonnel,
        setRegisterPersonnel,
        postPersonnel,
        screenSize,
        activeMenu
    } = useStateContext();
    const { isLoggedIn } = useContext(AuthContext);
    const [gridSize, setGridSize] = useState(3);

    useEffect(() => {
        setGridSize(
            Math.max(1, Math.min(3, Math.floor(window.innerWidth / 470)))
        );
        setRegisterPersonnel((prev) => (prev = { ...prev, dob }));
    }, [screenSize, dob]);

    const handleChange = (e) => {
        setRegisterPersonnel(
            (prev) => (prev = { ...prev, [e.target.name]: e.target.value })
        );
        console.log(registerPersonnel);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(registerPersonnel);
        postPersonnel();
    };

    const handleSelect = (e) => {
        setRegisterPersonnel((prev) => (prev = { ...prev, gender: e }));
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
                    <Link
                        to="/personnel"
                        className="inline-flex items-center justify-start pr-4 py-2 bg-[#F4F6FA] shadow mt-6 mx-8"
                    >
                        <IoIosArrowBack size={25} color="#222" />
                        <span className="text-2xl text-neutral-700 font-semibold">
                            Back
                        </span>
                    </Link>
                    <h1 className="text-4xl font-semibold text-center mt-16">
                        Register Personnel
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div
                        className={`grid  ${
                            gridSize === 3
                                ? "grid-cols-3"
                                : `grid-cols-${gridSize}`
                        }  justify-items-center place-content-center gap-x-32 gap-y-6 mt-12`}
                    >
                        <div>
                            <Label>Member Id</Label>
                            <Input
                                type="text"
                                placeholder="Member Id"
                                name="sid"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Member Name</Label>
                            <Input
                                type="text"
                                placeholder="Member Name"
                                name="official_name"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                type="text"
                                placeholder="Password"
                                name="temp_password"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Blood Group</Label>
                            <Input
                                type="text"
                                placeholder="Blood Group"
                                name="blood_group"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Date of Birth</Label>
                            <DatePicker date={dob} setDate={setDob} />
                        </div>

                        <div>
                            <Label>Gender</Label>
                            <Select
                                name="gender"
                                onValueChange={handleSelect}
                                className="border-2 border-slate-100 bg-slate-50 hover:bg-secondary"
                                required
                            >
                                <SelectTrigger className="h-10 w-96 px-3 rounded-md text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem
                                            className="text-lg text-muted-foreground"
                                            value="Male"
                                        >
                                            Male
                                        </SelectItem>
                                        <SelectItem
                                            className="text-lg text-muted-foreground"
                                            value="Female"
                                        >
                                            Female
                                        </SelectItem>
                                        <SelectItem
                                            className="text-lg text-muted-foreground"
                                            value="Others"
                                        >
                                            Others
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Designation</Label>
                            <Input
                                type="text"
                                placeholder="Designation"
                                name="designation"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Identification Mark</Label>
                            <Input
                                type="text"
                                placeholder="Identification Mark"
                                name="identification_mark"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Posted At</Label>
                            <Input
                                type="text"
                                placeholder="Posted At"
                                name="posted_at"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        {/* <div>
            <Label>Picture</Label>
            <Input type="file" name="photograph" className="pt-1 rounded" />
          </div> */}

                        <div>
                            <Label>Picture</Label>
                            <Input
                                type="url"
                                placeholder="Add image URL"
                                name="photograph"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <Label>Address</Label>
                            <Input
                                type="text"
                                placeholder="Address"
                                name="address"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center mt-8">
                        <Button type="submit" className="px-12">
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
