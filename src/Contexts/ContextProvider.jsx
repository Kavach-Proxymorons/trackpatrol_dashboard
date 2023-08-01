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
  const [menuWidth, setMenuWidth] = useState(activeMenu);


  const [duty, setDuty] = useState(dutyDummyData);

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
    setActiveMenu(() => {
      return false;
    });
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
    logout();

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
  const postDuty = async () => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/duty/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(duty),
    });

    const res = await response.json();
    console.log(res.message);
    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
    setDuty((prev) => (prev = dutyDummyData));
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

        validateToken,
        login,
        logout,
        auth,

        duty,
        setDuty,
        postDuty,

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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
