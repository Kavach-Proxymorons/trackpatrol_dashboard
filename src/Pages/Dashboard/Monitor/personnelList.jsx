import { useEffect, useState, useContext } from "react";
import DataTable from "../../../Components/ui-components/personnelAssignmentTable";
import { headers } from "../../../Components/ui-components/personnelAssignmentTable/skeletons/personnel";
import { useStateContext } from "../../../Contexts/ContextProvider";
import toast from "react-hot-toast";
import AuthContext from "../../../Contexts/AuthContext";

const toastId = "monkey";

const baseUrl =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL;

export default function PersonnelList(props) {
    const { hardwares, getHardwares } = useStateContext(); // to remove
    const { data, shift_id } = props; // assigned hardware array from shift
    const [assignedAndAvailablePersonnel, setAssignedAndAvailablePersonnel] =
        useState([]);
    const [assignedPersonnelsId, setAssignedPersonnelsId] = useState({}); // key: is  value is array of personnel id
    const { token, authenticate } = useContext(AuthContext);

    const getAssignedAndAvailablePersonnel = async (shift_id) => {
        toast.loading("Loading...", { id: toastId });

        // fetch all personnel
        const response = await fetch(
            `${baseUrl}admin/personnel/?page=1&limit=100000`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const res = await response.json();

        const allPersonnel = res.data.personnel;

        // fetch assigned personnel
        const response2 = await fetch(`${baseUrl}admin/shift/${shift_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const res2 = await response2.json();
        const allAssignedPersonnel = res2.data.personnel_assigned;

        const allAssignedPersonnelId = allAssignedPersonnel.map(
            (assignedPersonnel) => assignedPersonnel.personnel._id
        );
        setAssignedPersonnelsId({
            [shift_id]: allAssignedPersonnelId
        });

        console.log(allAssignedPersonnelId);

        // sort available personnel such that all who are assigned are placed a the beginning of the array
        const assignedPersonnel = allPersonnel.filter((personnel) =>
            allAssignedPersonnelId.includes(personnel._id)
        );
        const notAssignedPersonnel = allPersonnel.filter(
            (personnel) => !allAssignedPersonnelId.includes(personnel._id)
        );

        const availablePersonnel = [
            ...assignedPersonnel,
            ...notAssignedPersonnel
        ];

        setAssignedAndAvailablePersonnel(availablePersonnel);
        toast.success("Personnel list fetched successfully", { id: toastId });
    };

    useEffect(() => {
        document.title = "Hardware's List | Bandobast";
        getAssignedAndAvailablePersonnel(shift_id);
        console.log(assignedPersonnelsId);
    }, []);

    return (
        <>
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Assigned Personnel
            </h1>
            <DataTable
                columns={headers}
                path={"hardware"}
                data={assignedAndAvailablePersonnel}
                fetchData={getAssignedAndAvailablePersonnel}
                assignedPersonnelsId={assignedPersonnelsId}
                shift_id={shift_id}
            />
        </>
    );
}
