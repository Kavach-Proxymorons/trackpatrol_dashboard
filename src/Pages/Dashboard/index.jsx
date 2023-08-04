import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { DutyCard, OngoingDutyCard } from "../../Components";
import useFetch from "../../hooks/useFetch";

const tid = 'dashboard_duites_toast';

export default function Dashboard() {
    const { response, loading, error } = useFetch('/api/v1/admin/duty/');
    useEffect(() => {
        if (loading) toast.loading("Loading duties...", { id: tid });
        if (response) toast.success(response.message, { id: tid });
        if (error) toast.error(error.message, { id: tid });
    }, [loading, error, response]);

    return (
        <>
            <div className="px-8 pt-8 bg-background">
                <h2 className="text-4xl text-primary font-semibold mb-6">
                    Ongoing Bandobast
                </h2>
                {response?.data?.duty.map((duty) => {
                    return <OngoingDutyCard key={duty._id} duty={duty} />;
                })}
                <h2 className="text-4xl text-primary font-semibold mt-12">Upcoming Bandobast</h2>
                <div className="w-auto bg-slate-100 rounded-lg p-3 mt-6 drop-shadow-md">
                    <DutyCard />
                </div>
            </div>
        </>
    );
}
