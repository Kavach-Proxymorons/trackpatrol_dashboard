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
  start_time: '',
  end_time: '',
  note: "Note",
};

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
    navigate("/login");
  };

  const validateToken = async (Token) => {
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
      return;
    }

    const userInfo = {
      name: res.data.name,
      username: res.data.username,
      isLogged: true,
      token: Token,
    };

    setName(() => {
      return userInfo.name;
    });
    setUserName(() => {
      return userInfo.username;
    });
    setIsLogged(() => {
      return userInfo.isLogged;
    });
    setToken(() => {
      return userInfo.token;
    });

    if (location.pathname === "/login") navigate("/");
  };

  const auth = () => {
    const Token = localStorage.getItem("token");
    if (Token === null || Token.length === 0) logout();
    else validateToken(Token);
  };

  const login = async (username, password) => {
    logout();

    const toastId = toast.loading("Loading...");
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
    setName(() => {
      return userdata.name;
    });
    setUserName(() => {
      return userdata.username;
    });
    setIsLogged(() => {
      return userdata.isLogged;
    });
    setToken(() => {
      return userdata.token;
    });
    setActiveMenu(window.innerWidth >= 1000 ? true : false);
    navigate("/");
  };

  /********************* DUTY ************************/
  const postDuty = async () => {
    const toastId = toast.loading("Loading...");
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
