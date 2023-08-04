import { set } from "date-fns";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const StateContext = createContext();
const dateNow = new Date();
const dutyDummyData = {
  title: "",
  description: "",
  venue: "",
  location: "",
  start_time: "",
  end_time: "",
  note: "",
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const toastId = toast.loading("Loading...");

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_URL
      : process.env.REACT_APP_PROD_URL;

  const [userName, setUserName] = useState();
  const [name, setName] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [activeMenu, setActiveMenu] = useState(
    window.innerWidth >= 1000 ? true : false
  );
  const [menuWidth, setMenuWidth] = useState(false);

  useEffect(() => {
    auth();
  }, []);

  /********************* AUTH ************************/
  const logout = () => {
    localStorage.removeItem("token");
    setToken((prev) => (prev = ""));
    setName((prev) => (prev = ""));
    setUserName((prev) => (prev = ""));
    setIsLogged((prev) => (prev = false));
    setActiveMenu((prev) => (prev = false));

    toast.success("Logged out successfully", { id: toastId });
    navigate(false);
    navigate("/login");
  };

  const validateToken = async (Token) => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}auth/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    });

    const res = await response.json();
    console.log(res.message);

    if (!res.success) {
      logout();
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });

    const userInfo = {
      name: res.data.name,
      username: res.data.username,
      isLogged: true,
      token: Token,
    };

    setName(userInfo.name);
    setUserName(userInfo.username);
    setIsLogged(userInfo.isLogged);
    setToken(userInfo.token);

    if (location.pathname === "/login") navigate("/");
  };

  const auth = () => {
    const Token = localStorage.getItem("token");
    if (Token === null || Token.length === 0) logout();
    else {
      setToken(Token);
      validateToken(Token);
    }
  };

  const login = async (username, password) => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const res = await response.json();
    console.log(res.message);
    if (!res.success) {
      logout();
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });

    const userInfo = res.data.user;
    const userdata = {
      token: res.data.token,
      name: userInfo.name,
      username: userInfo.username,
      isLogged: true,
    };

    localStorage.setItem("token", userdata.token);
    setName(userdata.name);
    setUserName(userdata.username);
    setIsLogged(userdata.isLogged);
    setToken(userdata.token);
    setActiveMenu(window.innerWidth >= 1000 ? true : false);
    navigate("../", { replace: true });
  };

  /********************* DUTY ************************/
  const [registerDuty, setRegisterDuty] = useState(dutyDummyData);
  const [duties, setDuties] = useState([]);
  const [duty, setDuty] = useState([]);

  const postDuty = async () => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/duty/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(registerDuty),
    });

    const res = await response.json();
    console.log(res.message);
    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
    setRegisterDuty((prev) => (prev = dutyDummyData));
  };

  const getDuties = async () => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/duty/?page=1&limit=10000`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    const res = await response.json();
    console.log(res.message);
    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
    setDuties(res.data.duty);
  };

  const getDutyById = async (id) => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/duty/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGI1N2ZkNmNlNmYyMTc4YjVhNWM5NWQiLCJpYXQiOjE2OTExMTkyMDgsImV4cCI6MTY5MzcxMTIwOH0.f1tZ8kR033p5B3ieiZvy3X8IEQ-2l7qjAjBBP2o3UMI"}`,
      },
    });

    // console.log(token)

    const res = await response.json();
    console.log(res.message);
    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }
    console.log(res.data);

    toast.success(res.message, { id: toastId });
    setDuty(res.data);
  };

  /********************** Shift ********************************/
  const [shift, setShift] = useState([]);
  const [registerShift, setRegisterShift] = useState({});
  const [assignedAndIdleHardwares, setAssignedAndIdleHardwares] = useState([]);

  const postShift = async () => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/shift/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(registerShift),
    });

    const res = await response.json();
    console.log(res.message);
    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
    setRegisterShift({});
  };

  const getShiftById = async (id) => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/shift/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();
    console.log(res.message);
    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
    shift((prev) => (prev = res.data));
  };

  const deleteShift = async (id) => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/shift/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();
    console.log(res.message);

    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
  };

  const postShiftPersonnels = async (id, personnel) => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/shift/${id}/add_personnel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(personnel),
    });

    const res = await response.json();
    console.log(res.message);

    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
  };

  const getAssignedAndIdleHardwares = async (shift_id) => {
    toast.loading("Loading...", { id: toastId });
    
    // fetch all hardwares
    const response = await fetch(`${baseUrl}admin/hardware/?page=1&limit=100000`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();

    // all idle hardwares
    const idleHardwares = res.data.hardware.filter((hardware) => hardware.status === "idle");

    // fetch all hardwares assigned to shift /api/v1/admin/shift/{id}
    const response2 = await fetch(`${baseUrl}admin/shift/${shift_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res2 = await response2.json();

    // all hardwares assigned to shift 
    const assignedHardwares = res2.data.hardwares_attached;

    // assigned and idle hardwares
    const assignedAndIdleHardwares = [...assignedHardwares, ...idleHardwares];

    setAssignedAndIdleHardwares(assignedAndIdleHardwares);

    toast.success(res.message, { id: toastId });

  };
  
  const deleteShiftPersonnels = async (id, personnel) => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(
      `${baseUrl}admin/shift/${id}/remove_personnel`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(personnel),
      }
    );

    const res = await response.json();
    console.log(res.message);

    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
  };

  const postShiftHardwares = async (id, hardware) => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/shift/${id}/add_hardware`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(hardware),
    });

    const res = await response.json();
    console.log(res.message);

    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
  };

  const deleteShiftHardwares = async (id, hardware) => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(
      `${baseUrl}admin/shift/${id}/remove_hardware`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(hardware),
      }
    );

    const res = await response.json();
    console.log(res.message);

    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
  };



  /********************** HARWDARE ********************************/
  const [hardwares, setHardwares] = useState([]);
  const [registerHardware, setRegisterHardware] = useState({
    hardware_id: "",
    secret: "",
    name: "",
    description: "",
    type: "",
    status: "",
  });

  const getHardwares = async () => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(
      `${baseUrl}admin/hardware/?page=1&limit=10000`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const res = await response.json();
    console.log(res.message);
    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
    setHardwares((prev) => {
      prev = res.data.hardware.map((item) => {
        item["sid"] = item["hardware_id"];
        delete item["hardware_id"];
        return item;
      });
      return prev;
    });
  };

  const postHardware = async () => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/hardware/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(registerHardware),
    });

    const res = await response.json();
    console.log(res.message);
    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
    setRegisterHardware({});
  };

  /********************** PERSONNEL ********************************/
  const [personnels, setPersonnels] = useState([]);
  const [registerPersonnel, setRegisterPersonnel] = useState({});

  const postPersonnel = async () => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/personnel/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(registerPersonnel),
    });

    const res = await response.json();
    console.log(res.message);
    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
    setRegisterPersonnel({});
  };

  const getPersonnels = async () => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(
      `${baseUrl}admin/personnel/?page=1&limit=10000`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const res = await response.json();
    console.log(res.message);
    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
    setPersonnels(res.data.personnel);
  };

  const deteletPersonnel = async (id) => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/personnel/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();
    console.log(res.message);
    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
  };

  const updatePersonnel = async (id) => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/personnel/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(registerPersonnel),
    });

    const res = await response.json();
    console.log(res.message);
    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
    setRegisterPersonnel({});
  };

  return (
    <StateContext.Provider
      value={{
        name,
        setName,

        userName,
        setUserName,

        isLogged,
        setIsLogged,

        token,
        setToken,

        screenSize,
        setScreenSize,

        activeMenu,
        setActiveMenu,
        menuWidth,
        setMenuWidth,

        login, // auth apis
        logout,
        auth,
        validateToken,

        registerDuty, // duty apis
        setRegisterDuty,
        duties,
        setDuties,
        duty,
        setDuty,
        getDutyById,
        getDuties,
        postDuty,


        shift, // shift apis
        setShift,
        registerShift,
        setRegisterShift,
        postShift,
        getShiftById,
        deleteShift,
        postShiftPersonnels,
        deleteShiftPersonnels,
        postShiftHardwares,
        deleteShiftHardwares,
        assignedAndIdleHardwares,
        getAssignedAndIdleHardwares,


        hardwares, // hardware apis
        setHardwares,
        registerHardware,
        setRegisterHardware,
        postHardware,
        getHardwares,


        personnels, // personnel apis
        setPersonnels,
        registerPersonnel,
        setRegisterPersonnel,
        postPersonnel,
        getPersonnels,
        deteletPersonnel,
        updatePersonnel,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
