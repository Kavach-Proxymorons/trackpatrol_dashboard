import { useState, useContext } from "react";
import Input from "../ui-components/input";
import Label from "../ui-components/label";
import { Button } from "../ui-components/button";
import { useStateContext } from "../../Contexts/ContextProvider";
import AuthContext from "../../Contexts/AuthContext";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "../ui-components/select";
import toast from "react-hot-toast";
import { set } from "date-fns";
import { Sidebar, Navbar } from "../";

export default function RegisterHardware() {
    const { registerHardware, setRegisterHardware, postHardware, activeMenu } =
        useStateContext();
    const { isLoggedIn } = useContext(AuthContext);

    const handleChange = (e) => {
        setRegisterHardware(
            (prev) => (prev = { ...prev, [e.target.name]: e.target.value })
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postHardware();
    };

    const handleSelect = (e) => {
        setRegisterHardware((prev) => (prev = { ...prev, status: e }));
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
                        to="/hardware"
                        className="inline-flex items-center justify-start pr-4 py-2 bg-[#F4F6FA] shadow mt-6 mx-8"
                    >
                        <IoIosArrowBack size={25} color="#222" />
                        <span className="text-2xl text-neutral-700 font-semibold">
                            Back
                        </span>
                    </Link>
                    <h1 className="text-4xl font-semibold text-center mt-16">
                        Register Hardware
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2  place-content-center gap-x-24 gap-y-6 mt-12">
                        <div>
                            <Label>Hardware Id</Label>
                            <Input
                                type="text"
                                placeholder="Hardware id"
                                name="hardware_id"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Secret</Label>
                            <Input
                                type="text"
                                placeholder="Secret"
                                name="secret"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                placeholder="Name"
                                name="name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                placeholder="Description"
                                name="description"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Type</Label>
                            <Input
                                type="text"
                                placeholder="Type"
                                name="type"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Status</Label>
                            <Select
                                required
                                name="status"
                                onValueChange={handleSelect}
                                className="border-2 border-slate-100 bg-slate-50 hover:bg-secondary"
                            >
                                <SelectTrigger className="h-10 w-96 px-3 rounded-md text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel className="text-lg">
                                            Values
                                        </SelectLabel>
                                        <SelectItem
                                            className="text-lg text-muted-foreground"
                                            value="idle"
                                        >
                                            Idle
                                        </SelectItem>
                                        <SelectItem
                                            className="text-lg text-muted-foreground"
                                            value="busy"
                                        >
                                            Busy
                                        </SelectItem>
                                        <SelectItem
                                            className="text-lg text-muted-foreground"
                                            value="broken"
                                        >
                                            Broken
                                        </SelectItem>
                                        <SelectItem
                                            className="text-lg text-muted-foreground"
                                            value="lost"
                                        >
                                            Lost
                                        </SelectItem>
                                        <SelectItem
                                            className="text-lg text-muted-foreground"
                                            value="Standy"
                                        >
                                            Standby
                                        </SelectItem>
                                        <SelectItem
                                            className="text-lg text-muted-foreground"
                                            value="overheating"
                                        >
                                            Overheating
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <Button type="submit" className="px-12">
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
