import { useEffect, useState, useContext } from "react";
import DataTable from "../../../Components/ui-components/personnelAssignmentTable";
import { headers } from "../../../Components/ui-components/personnelAssignmentTable/skeletons/personnel";
import { useStateContext } from "../../../Contexts/ContextProvider";
import toast from "react-hot-toast";
import AuthContext from "../../../Contexts/AuthContext";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../../../Components/ui-components/alert-dialog";
import { Button } from "../../../Components/ui-components/button";

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
    const [addPersonnelRespData, setAddPersonnelRespData] = useState({}); // key: is  value is array of personnel id
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

        // console.log(allAssignedPersonnelId);

        // sort available personnel such that all who are assigned are placed a the beginning of the array
        const assignedPersonnel = allPersonnel.filter((personnel) =>
            allAssignedPersonnelId.includes(personnel._id)
        );
        const notAssignedPersonnel = allPersonnel.filter(
            (personnel) => !allAssignedPersonnelId.includes(personnel._id)
        );

        // fetch available personnels
        const response3 = await fetch(`${baseUrl}admin/shift/${shift_id}/availablePersonnel`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const res3 = await response3.json();

        const availablePersonnel = [
            ...assignedPersonnel,
            ...res3
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
            <h1 className="scroll-m-20 text-xl font-medium tracking-tight transition-colors first:mt-0">
                Assigned Personnel
            </h1>
            {/* {
{
    "sid_added": [
      "401"
    ],
    "sid_not_added": [],
    "sid_not_added_because_clashing_shifts": [
      {
        "sid": "401",
        "clashing_shift_name": "shift 1",
        "clashing_shift_duty": "64d24eac8c423c29c9a2715e"
      }
    ]
  
} */}
            {addPersonnelRespData && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline">Show Dialog</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Personnel already asigned to other duty.
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <div>
                                    {addPersonnelRespData?.sid_not_added?.map(
                                        (sid) => {
                                            return (
                                                <div>
                                                    sid: {sid} not added -
                                                    personnel dosen't exist
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                                <div className="">
                                    {addPersonnelRespData?.sid_not_added_because_clashing_shifts?.map(
                                        (obj) => {
                                            return (
                                                <div key={obj.sid}>
                                                    sid: {obj.sid} not added -
                                                    personnel already assigned
                                                    to shift{" "}
                                                    {obj.clashing_shift_name}{" "}
                                                    with duty{" "}
                                                    {obj.clashing_shift_duty},
                                                    link:{" "}
                                                    <a
                                                        href={`/dashboard/${obj.clashing_shift_duty}`}
                                                    >
                                                        link
                                                    </a>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            <DataTable
                columns={headers}
                path={"hardware"}
                data={assignedAndAvailablePersonnel}
                fetchData={getAssignedAndAvailablePersonnel}
                assignedPersonnelsId={assignedPersonnelsId}
                setAddPersonnelRespData={setAddPersonnelRespData}
                shift_id={shift_id}
            />
        </>
    );
}
