import { useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Dashboard() {
    const { user, token } = useStateContext();
    console.log('Dashboard: ', user);

    return <>
        <div className="h-screen" >
            
        </div>
    </>;
}