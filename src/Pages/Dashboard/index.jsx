import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { DutyCard, OngoingDutyCard } from "../../Components";
import useFetch from "../../hooks/useFetch";

const tid = "dashboard_duites_toast";

export default function Dashboard() {
    const { response, loading, error } = useFetch("/api/v1/admin/duty/");
    useEffect(() => {
        if (loading) toast.loading("Loading duties...", { id: tid });
        if (response) toast.success(response.message, { id: tid });
        if (error) toast.error(error.message, { id: tid });
    }, [loading, error, response]);

    useEffect(() => {
        document.title = "Dashboard | Bandobast";
    }, []);

    return (
        <>
            <div className="px-8 pt-8 bg-background">
                <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors">
                    Ongoing Bandobast
                </h2>
                <div className="grid 2xl:grid-cols-5 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-start content-start my-4">
                    {response?.data?.duty.map((duty) => (
                        <DutyCard key={duty._id} duty={duty} />
                    ))}
                </div>
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
                    Upcoming Bandobast
                </h2>
            </div>
        </>
    );
}