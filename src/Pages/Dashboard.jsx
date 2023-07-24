import { useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import {Map} from '../Components';

export default function Dashboard() {
    const { user, token } = useStateContext();

    return <>
        <div className="px-16 pt-8" >
            <h2 className="text-5xl text-neutral-800 font-semibold mb-8">Ongoing Bandobast</h2>
            <Map />
            <h2 className="text-5xl text-neutral-800 font-semibold mt-12">Upcoming Bandobast</h2>

        </div>
    </>;
}