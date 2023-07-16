import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const StateContext = createContext();



export const ContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const baseUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;

    const [userName, setUserName] = useState();
    const [name, setName] = useState();
    const [isLogged, setIsLogged] = useState(false);
    const [token, setToken] = useState('');
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [activeMenu, setActiveMenu] = useState(window.innerWidth >= 1000 ? true : false);

    useEffect(() => {
        auth();        
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setToken((prev) => prev = '');
        setName((prev) => prev = '');
        setUserName((prev) => prev = '');
        setIsLogged((prev) => prev = false);
        setActiveMenu(() => { return false; });
        navigate('/login');
    };

    const validateToken = async (Token) => {
        console.log('ye trigger nhi honna tha');
        const response = await fetch(`${baseUrl}auth/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token}`,
            }
        });

        const res = await response.json();
        console.log(res.message);

        if (!res.success) logout();

        const userInfo = {
            name: res.data.name,
            username: res.data.username,
            isLogged: true,
            token: Token,
        };

        setName(() => { return userInfo.name; });
        setUserName(() => { return userInfo.username; });
        setIsLogged(() => { return userInfo.isLogged; });
        setToken(() => { return userInfo.token; });

        if (location.pathname === '/login') navigate('/');
    };


    const auth = () => {
        const Token = localStorage.getItem('token');
        if (Token === null || Token.length === 0) logout();
        else validateToken(Token);
    };


    const login = async (username, password) => {
        logout();

        const response = await fetch(`${baseUrl}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const res = await response.json();
        console.log(res.message);

        if (!res.success) {
            return;
        }

        const userInfo = res.data.user;
        const userdata = {
            token: res.data.token,
            name: userInfo.name,
            username: userInfo.username,
            isLogged: true,
        };


        localStorage.setItem('token', userdata.token);
        setName(() => { return userdata.name; });
        setUserName(() => { return userdata.username; });
        setIsLogged(() => { return userdata.isLogged; });
        setToken(() => { return userdata.token; });
        setActiveMenu(window.innerWidth >= 1000 ? true : false);
        navigate('/');
    };

    return (
        <StateContext.Provider value={{
            name, setName, userName, setName, isLogged, setIsLogged, token, setToken,
            screenSize, setScreenSize, activeMenu, setActiveMenu,
            validateToken, login, logout, auth
        }}>
            {children}
        </StateContext.Provider>

    );
};

export const useStateContext = () => useContext(StateContext);


