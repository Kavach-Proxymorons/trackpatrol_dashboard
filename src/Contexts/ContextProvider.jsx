import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import AuthContext from "./AuthContext";

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

const baseUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;

const toastId = "toastid";

export const ContextProvider = ({ children }) => {

  const { token, authenticate } = useContext(AuthContext);

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [activeMenu, setActiveMenu] = useState(true);
  const [menuWidth, setMenuWidth] = useState(true);

  /********************* DUTY ************************/
  const [registerDuty, setRegisterDuty] = useState(dutyDummyData);
  const [duties, setDuties] = useState([]);
  const [duty, setDuty] = useState([]);

  const postDuty = async () => {

    const tid = toast.loading("Creating duty...");

    const response = await fetch(`${baseUrl}admin/duty/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(registerDuty),
    });

    const json = await response.json();
    if (json.status > 299) {
      if (json.status === 401) return authenticate(tid);
      toast.error(json.message, { id: tid });
      return;
    }

    // fix this
    setRegisterDuty((prev) => (prev = dutyDummyData));
    toast.success(json.message, { id: tid });
  };

  const getDuties = async () => {

    const tid = toast.loading("Loading duties...");

    const response = await fetch(`${baseUrl}admin/duty/?page=1&limit=10000`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const json = await response.json();
    if (json.status > 299) {
      if (json.status === 401) return authenticate(tid);
      toast.error(json.message, { id: tid });
      return;
    }

    setDuties(json.data.duty);
    toast.success(json.message, { id: tid });
  };

  const getDutyById = async (id) => {

    const tid = toast.loading("Loading duty...");

    const response = await fetch(`${baseUrl}admin/duty/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const json = await response.json();
    if (json.status > 299) {
      if (json.status === 401) return authenticate(tid);
      toast.error(json.message, { id: tid });
      return;
    }

    setDuty(json.data);
    toast.success(json.message, { id: tid });
  };

  /********************** Shift ********************************/
  const [shift, setShift] = useState([]);
  const [registerShift, setRegisterShift] = useState({});
  const [assignedAndIdleHardwares, setAssignedAndIdleHardwares] = useState([]);
  const [assignedAndAvailablePersonnel, setAssignedAndAvailablePersonnel] = useState([]);
  const [assignedPersonnelsId, setAssignedPersonnelsId] = useState({}); // key: is  value is array of personnel id

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

  const getAssignedAndAvailablePersonnel = async (shift_id) => {
    toast.loading("Loading...", { id: toastId });

    // fetch all personnel
    const response = await fetch(`${baseUrl}admin/personnel/?page=1&limit=100000`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();

    const allPersonnel = res.data.personnel;

    // fetch assigned personnel
    const response2 = await fetch(`${baseUrl}admin/shift/${shift_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res2 = await response2.json();
    const allAssignedPersonnel = res2.data.personnel_assigned;

    const allAssignedPersonnelId = allAssignedPersonnel.map((assignedPersonnel) => assignedPersonnel.personnel._id);
    setAssignedPersonnelsId({
      [shift_id]: allAssignedPersonnelId,
    })

    console.log(allAssignedPersonnelId);

    // sort available personnel such that all who are assigned are placed a the beginning of the array
    const assignedPersonnel = allPersonnel.filter((personnel) => allAssignedPersonnelId.includes(personnel._id));
    const notAssignedPersonnel = allPersonnel.filter((personnel) => !allAssignedPersonnelId.includes(personnel._id));

    const availablePersonnel = [...assignedPersonnel, ...notAssignedPersonnel];

    setAssignedAndAvailablePersonnel(availablePersonnel);
    toast.success("Personnel list fetched successfully", { id: toastId });
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
        screenSize,
        setScreenSize,

        activeMenu,
        setActiveMenu,
        menuWidth,
        setMenuWidth,

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
        assignedAndAvailablePersonnel,
        getAssignedAndAvailablePersonnel,
        assignedPersonnelsId,


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