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
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PersonnelRegisterForm() {
    const [dob, setDob] = useState(new Date());
    const [registerAdmin, setRegisterAdmin] = useState({});
    const [gender, setGender] = useState("");
    const { screenSize, activeMenu } = useStateContext();
    const { isLoggedIn, token } = useContext(AuthContext);
    const Navigate = useNavigate();

    const baseUrl =
        process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL;

    const handleFetch = async () => {
        const response = await fetch(`${baseUrl}auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(registerAdmin)
        });
        const res = await response.json();
        if (!res.success) {
            // toast.error(res.message);
            return;
        } 

        // toast.success(res.message);
        Navigate('/admin');
        
        console.log(res.message);
    };

    useEffect(() => {
        setRegisterAdmin((prev) => (prev = { ...prev, dob }));
    }, []);

    const handleChange = (e) => {
        setRegisterAdmin(
            (prev) => (prev = { ...prev, [e.target.name]: e.target.value })
        );
        console.log(registerAdmin);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleFetch();
        
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
                        to="/admin"
                        className="inline-flex items-center justify-start pr-4 py-2 bg-[#F4F6FA] shadow mt-6 mx-8"
                    >
                        <IoIosArrowBack size={25} color="#222" />
                        <span className="text-2xl text-neutral-700 font-semibold">
                            Back
                        </span>
                    </Link>
                    <h1 className="text-4xl font-semibold text-center mt-16">
                        Register Admin
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div
                        className={`grid grid-cols-2 justify-items-center place-content-center gap-x-32 gap-y-6 mt-12`}
                    >
                        <div>
                            <Label>Username</Label>
                            <Input
                                type="text"
                                placeholder="Username"
                                name="username"
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
                            <Label>password</Label>
                            <Input
                                type="text"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Police Station</Label>
                            <Input
                                type="text"
                                placeholder="Police Station"
                                name="police_station"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Role</Label>
                            <Input
                                type="text"
                                placeholder="Role"
                                name="role"
                                required
                                onChange={handleChange}
                            />
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
