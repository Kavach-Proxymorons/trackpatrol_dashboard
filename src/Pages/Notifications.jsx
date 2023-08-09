import { useContext, useEffect, useState } from "react";
import { Navbar, Sidebar } from "../Components";
import { Badge } from "../Components/ui-components/badge";
import { Button } from "../Components/ui-components/button";
import AuthContext from "../Contexts/AuthContext";
import { useStateContext } from "../Contexts/ContextProvider";

import "./Notifications.css";
const tid = "notification_toast";

export default function Notifications() {
    const { token, authenticate } = useContext(AuthContext);
    const { activeMenu } = useStateContext();
    const { isLoggedIn } = useContext(AuthContext);
    const [response, setResponse] = useState(null);
    const [version, setVersion] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const URL = process.env.REACT_APP_BASE_URL + "/api/v1/app/duty/getIssues";
            (async () => {
                try {
                    const response = await fetch(URL, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    const json = await response.json();
                    if (json.status > 299) {
                        if (json.status === 401) return authenticate(tid);
                        if (json.status === 500) throw new Error("Internal server error");
                        throw new Error(json.message);
                    }
                    setResponse((json));

                } catch (err) {
                    console.log(err)
                }
            })();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleAttended = async (id) => {
        const URL = process.env.REACT_APP_BASE_URL + `/api/v1/app/duty/markComplete/${id}`;
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setVersion(v => v + 1);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {isLoggedIn && <Sidebar />}
            <div className={`${isLoggedIn ? (activeMenu ? "ml-52" : "ml-[84px]") : ""} `}>
                <Navbar />

                <div className="">
                    <h1 className="p-4 scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0">
                         Incoming Notifications
                         
                         </h1>
                    {response?.data?.reverse().filter(notification => notification.issue_status === "pending").map((notification) => (
                        <div key={notification._id} className="border m-2 rounded-lg grid grid-cols-4 justify-between items-center px-4">
                            <div>
                                <div>Sid: {notification.issue_creator.sid}</div>
                                <div>Creator: {notification.issue_creator.official_name} ({notification.issue_creator.designation})</div>
                                <div>Category: {notification.issue_category}</div>
                                <div>Created At: {notification.createdAt}</div>
                            </div>
                            <div>Description: {notification.issue_description}</div>
                            <div className="flex gap-x-4">

                                {
                                    notification.severity && notification.severity === "high" ? <Badge variant={"outline"} className={`badgeHigh`}>Severe</Badge>
                                        : notification.severity === "medium" ? <Badge variant={"outline"} className={`badgeMedium`}>Moderate</Badge>
                                            : <Badge variant={"outline"} className={`badgeLow`}>Low</Badge>
                                }

                                {
                                    notification.issue_status === "pending" ?
                                        <Badge variant={"outline"} className={`badgeHigh`}>Pending</Badge>
                                        :
                                        <Badge variant={"outline"} className={`badgeHigh`}>Attended</Badge>
                                }
                            </div>
                            <Button onClick={() => { handleAttended(notification._id) }}>Mark Attended</Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}