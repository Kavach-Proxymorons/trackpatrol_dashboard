import React, { useEffect } from "react";
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
} from "./Pages";

import { Navbar, Sidebar } from "./Components";
import { PersonnelForm, HardwareForm, BandobastForm } from "./Components/forms";
import "./App.css";

function App() {
  const { user, auth, activeMenu } = useStateContext();
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
            color: "#000",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className="h-screen">
        <Sidebar />
        <div className={`${activeMenu ? "ml-60" : "ml-[84px]"}`}>
          <Navbar />
          <div className="">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/monitor" element={<Monitor />} />
              <Route path="/dashboard/monitor/details" element={<DetailedMap />} />
              <Route path="/personnel" element={<Personnel />} />
              <Route path="/personnel/register" element={<PersonnelForm />} />
              <Route path="/hardware" element={<Hardware />} />
              <Route path="/hardware/register" element={<HardwareForm />} />
              <Route path="/bandobast/register" element={<BandobastForm />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/setting" element={<Setting />} />
              {/* <Route path='/logout' element={<Login />} /> */}
              <Route path="*" element={<>ERROR 404</>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
