import { useEffect } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import { DutyCard, OngoingDutyCard } from "../../Components";

export default function Dashboard() {
    const { duties, getDuties } = useStateContext();
    useEffect(() => {
        document.title = "Dashboard | Bandobast";
        getDuties();
    }, []);

    return (
        <>
            <div className="px-8 pt-8 bg-background">
                <h2 className="text-4xl text-primary font-semibold mb-6">
                    Ongoing Bandobast
                </h2>
                {duties.map((duty) => {
                    return <OngoingDutyCard key={duty._id} duty={duty} />;
                })}
                {/* <OngoingDutyCard /> */}
                <h2 className="text-4xl text-primary font-semibold mt-12">
                    Upcoming Bandobast
                </h2>
                <div className="w-auto bg-slate-100 rounded-lg p-3 mt-6 drop-shadow-md">
                    <DutyCard />
                </div>
            </div>
        </>
    );
}
