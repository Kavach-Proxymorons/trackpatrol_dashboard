import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useStateContext } from "./Contexts/ContextProvider";

import {
    Login,
    Bandobast,
    Dashboard,
    Admin,
    Hardware,
    Personnel,
    Setting,
    Monitor,
    DetailedMap,
    Logout,
    PrintReport
} from "./Pages";

import { Navbar, Sidebar } from "./Components";
import { T } from "./Components/ui-components/toaster";
import { PersonnelForm, HardwareForm, BandobastForm, AdminForm } from "./Components/forms";
import "./App.css";
import AuthContext from "./Contexts/AuthContext";

function App() {
    const { isLoggedIn } = useContext(AuthContext);
    const { activeMenu } = useStateContext();
    return (
        <div className="">
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: "",
                    duration: 6000,
                    style: {
                        background: "#fff",
                        color: "#000"
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: "green",
                            secondary: "black"
                        }
                    }
                }}
            />

            <div className="h-screen bg-background">
                {/* {isLoggedIn && <Sidebar />}
                <div
                    className={`${
                        isLoggedIn ? (activeMenu ? "ml-52" : "ml-[84px]") : ""
                    } `}
                >
                    <Navbar /> */}
                <div className="">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" exact element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/dashboard/:id" element={<Monitor />} />
                        <Route
                            path="/dashboard/:id/:shift_id/monitor/details"
                            element={<DetailedMap />}
                        />
                        <Route path="/personnel" element={<Personnel />} />
                        <Route
                            path="/personnel/register"
                            element={<PersonnelForm />}
                        />
                        <Route path="/hardware" element={<Hardware />} />
                        <Route
                            path="/hardware/register"
                            element={<HardwareForm />}
                        />
                        <Route
                            path="/bandobast/register"
                            element={<BandobastForm />}
                        />
                        <Route path="/admin" element={<Admin />} />
                        {/* <Route path='admin/register' element={<AdminForm /> } /> */}
                        <Route path="/setting" element={<Setting />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/print/:id" element={<PrintReport />} />
                        <Route path="*" element={<>ERROR 404</>} />
                    </Routes>
                </div>
                {/* </div> */}
            </div>
            <T />
        </div>
    );
}

export default App;
