import {useEffect} from 'react';
import { useStateContext } from "../Contexts/ContextProvider";
import toast from 'react-hot-toast';
export default function Logout() {
    const {logout} = useStateContext();

    useEffect(() => {
        logout();
    },[]);

    return (
        <div>
            <h1>Logout</h1>
        </div>
    );

}