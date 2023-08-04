import { useEffect, useContext } from 'react';
import AuthContext from '../Contexts/AuthContext';

export default function Logout() {

    const { logout } = useContext(AuthContext);

    useEffect(() => {
        logout();
    }, []);

    return (<></>);

}