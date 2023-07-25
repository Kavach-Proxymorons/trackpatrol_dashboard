import { useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import {DutyCard, Map} from '../Components';

export default function Dashboard() {
    const { user, token } = useStateContext();

    return <>
        <div className="px-16 pt-8" >
            <h2 className="text-5xl text-neutral-800 font-semibold mb-6">Ongoing Bandobast</h2>
            <Map />
            <h2 className="text-5xl text-neutral-800 font-semibold mt-12">Upcoming Bandobast</h2>
            <div className="w-auto bg-slate-100 rounded-lg p-8 mt-6 drop-shadow-md">
                <DutyCard />
            </div>
        </div>
    </>;
}   