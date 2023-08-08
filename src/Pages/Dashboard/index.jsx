import { useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { DutyCard, OngoingDutyCard } from "../../Components";
import {Separator} from '../../Components/ui-components/separator';
import useFetch from "../../hooks/useFetch";
import { ScrollArea } from "../../Components/ui-components/scroll-area";
import { Navbar, Sidebar } from "../../Components";
import AuthContext from "../../Contexts/AuthContext";
import { useStateContext } from "../../Contexts/ContextProvider";
const tid = "dashboard_duites_toast";

export default function Dashboard() {
    const { isLoggedIn } = useContext(AuthContext);
    const { activeMenu } = useStateContext();

    const { response, loading, error } = useFetch("/api/v1/admin/duty/", tid);
    useEffect(() => {
        if (loading) toast.loading("Loading duty...", { id: tid });
        if (response) toast.success(response.message, { id: tid });
        if (error) toast.error(error.message, { id: tid });
    }, [loading, error, response]);

    useEffect(() => {
        document.title = "Dashboard | Bandobast";
    }, []);

    return (
        <>
            {isLoggedIn && <Sidebar />}
            <div
                className={`${
                    isLoggedIn ? (activeMenu ? "ml-52" : "ml-[84px]") : ""
                } `}
            >
                <Navbar />
                <ScrollArea className="h-[calc(100vh-6rem)]">
                    <div className="px-8 pt-8 bg-background">
                        <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors">
                            Ongoing Bandobast
                        </h2>
                        <div className="grid 2xl:grid-cols-5 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-start content-start my-4">
                            {response?.data?.duty.map((duty) => {
                                const today = new Date().getTime();
                                if (
                                    new Date(duty.start_time).getTime() <
                                        today &&
                                    new Date(duty.end_time).getTime() > today
                                )
                                    return (
                                        <DutyCard key={duty._id} duty={duty} />
                                    );
                            })}
                        </div>
                        <Separator className='my-8' />
                        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
                            Upcoming Bandobast
                        </h2>
                        <div className="grid 2xl:grid-cols-5 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-start content-start my-4">
                            {response?.data?.duty.map((duty) => {
                                const today = new Date().getTime();
                                if (new Date(duty.start_time).getTime() > today)
                                    return (
                                        <DutyCard key={duty._id} duty={duty} />
                                    );
                            })}
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </>
    );
}
