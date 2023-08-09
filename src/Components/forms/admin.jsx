// import { useState, useEffect, useContext } from "react";
// import Input from "../ui-components/input";
// import Label from "../ui-components/label";
// import { Button } from "../ui-components/button";
// import { DatePicker } from "../ui-components/datePicker";
// import { useStateContext } from "../../Contexts/ContextProvider";
// import AuthContext from "../../Contexts/AuthContext";
// import { IoIosArrowBack } from "react-icons/io";
// import { Link } from "react-router-dom";
// import DataTable from "../ui-components/dataTable";
// import { set } from "date-fns";
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue
// } from "../ui-components/select";
// import { Sidebar, Navbar } from "../";
// import { name } from "file-loader";
// import { MdPassword } from "react-icons/md";

// export default function PersonnelRegisterForm() {
//     const [registerAdmin, setRegisterAdmin] = useState({});
//     const { isLoggedIn, token } = useContext(AuthContext);
//     const { activeMenu } = useStateContext();


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(registerPersonnel);
//         postPersonnel();
//     };

    

//     return (
//         <>
//             {isLoggedIn && <Sidebar />}
//             <div
//                 className={`${
//                     isLoggedIn ? (activeMenu ? "ml-52" : "ml-[84px]") : ""
//                 } `}
//             >
//                 <Navbar />
//                 <div>
//                     <Link
//                         to="/personnel"
//                         className="inline-flex items-center justify-start pr-4 py-2 bg-[#F4F6FA] shadow mt-6 mx-8"
//                     >
//                         <IoIosArrowBack size={25} color="#222" />
//                         <span className="text-2xl text-neutral-700 font-semibold">
//                             Back
//                         </span>
//                     </Link>
//                     <h1 className="text-4xl font-semibold text-center mt-16">
//                         Register Admin
//                     </h1>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div
//                         className={`grid grid-cols-2 justify-items-center place-content-center gap-x-32 gap-y-6 mt-12`}
//                     >
//                         <div>
//                             <Label>Member Id</Label>
//                             <Input
//                                 type="text"
//                                 placeholder="Username"
//                                 name="username"
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <Label>Member Id</Label>
//                             <Input
//                                 type="text"
//                                 placeholder="Name"
//                                 name="name"
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <Label>Member Name</Label>
//                             <Input
//                                 type="text"
//                                 placeholder="Password"
//                                 name="password"
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <Label>Password</Label>
//                             <Input
//                                 type="text"
//                                 placeholder="Police Station"
//                                 name="police_station"
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <Label>Blood Group</Label>
//                             <Input
//                                 type="text"
//                                 placeholder="Role"
//                                 name="role"
//                                 required
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-center mt-8">
//                         <Button type="submit" className="px-12">
//                             Create
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// }

// // username
// // name
// // password
// // police_station
// // role
