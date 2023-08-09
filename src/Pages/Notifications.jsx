import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Navbar, Sidebar } from "../Components";
import { Badge } from "../Components/ui-components/badge";
import { Button } from "../Components/ui-components/button";
import AuthContext from "../Contexts/AuthContext";
import { useStateContext } from "../Contexts/ContextProvider";
import useFetch from "../hooks/useFetch";

import "./Notifications.css";
import { set } from "date-fns";
const tid = "notification_toast";

export default function Notifications() {
    const [version, setVersion] = useState(0);
    const { activeMenu } = useStateContext();
    const [stream, setStream] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);
    const { response, error, loading } = useFetch(
        "/api/v1/app/duty/getIssues",
        tid
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setVersion((v) => v + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, [stream, version]);

    useEffect(() => {
        if (loading) toast.loading("Loading issues...", { id: tid });
        if (response) {
            setStream(() => response.data);
            toast.success(response.message, { id: tid });
        }
        if (error) toast.error(error.message, { id: tid });
    }, [loading, error, response]);

    const handleAttended = async () => {};

    return (
        <>
            {isLoggedIn && <Sidebar />}
            <div
                className={`${
                    isLoggedIn ? (activeMenu ? "ml-52" : "ml-[84px]") : ""
                } `}
            >
                <Navbar />
                <div className="">
                    {stream.map((notification) => (
                        <div
                            key={notification._id}
                            className="border m-2 rounded-lg p-2 grid grid-cols-4 justify-between items-center px-4 "
                        >
                            <div>
                                <div>Sid: {notification.issue_creator.sid}</div>
                                <div>
                                    Creator:{" "}
                                    {notification.issue_creator.official_name} (
                                    {notification.issue_creator.designation})
                                </div>
                                <div>
                                    Category: {notification.issue_category}
                                </div>
                                <div>Created At: {notification.createdAt}</div>
                            </div>
                            {/* <div>Severity: High</div> */}
                            <div>
                                Description: {notification.issue_description}
                            </div>
                            <div className="flex gap-x-4">
                                <Badge
                                    variant={"outline"}
                                    className={`badgeHigh`}
                                >
                                    Severe
                                </Badge>
                                {notification.issue_status === "pending" ? (
                                    <Badge
                                        variant={"outline"}
                                        className={`badgeHigh`}
                                    >
                                        Pending
                                    </Badge>
                                ) : (
                                    <Badge
                                        variant={"outline"}
                                        className={`badgeHigh`}
                                    >
                                        Attended
                                    </Badge>
                                )}
                            </div>

                            <Button onClick={handleAttended}>
                                Mark Attended
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
