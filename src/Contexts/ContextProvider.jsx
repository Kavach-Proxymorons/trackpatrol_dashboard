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
  note: "Note",
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
    window.innerWidth >= 1200 ? true : false
  );

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
    console.log(duty);
    const response = await fetch(`${baseUrl}admin/duty/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(duty),
    });

    const res = await response.json();
    console.log(res);
    if (!res.success) {
      toast.error(res.message, { id: toastId });
      return;
    }

    toast.success(res.message, { id: toastId });
    setDuty(() => {
      return dutyDummyData;
    });
  };

  /********************** HARWDARE ********************************/
  const [hardwares, setHardwares] = useState([]);
  const [RegisterHardware, setRegisterHardware] = useState({
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
    setHardwares(res.data.hardware);
  };

  const postHardware = async () => {
    toast.loading("Loading...", { id: toastId });
    const response = await fetch(`${baseUrl}admin/hardware/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(RegisterHardware),
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

        validateToken,
        login,
        logout,
        auth,

        duty,
        setDuty,
        postDuty,

        hardwares, // hardware apis
        setHardwares,
        RegisterHardware,
        setRegisterHardware,
        postHardware,
        getHardwares,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
