import { useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Dashboard() {
    const { user, token } = useStateContext();

    return <>
        <div className="h-screen" >
            
        </div>
    </>;
}