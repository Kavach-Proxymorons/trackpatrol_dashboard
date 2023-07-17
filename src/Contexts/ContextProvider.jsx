import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast'
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
        const response = await fetch(`${baseUrl}auth/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token}`,
            }
        });

        const res = await response.json();
        console.log(res.message);

        if (!res.success) {
            logout();
            return;
        }

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

        const toastId = toast.loading('Loading...');
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
            logout();
            toast.error(res.message, { id: toastId, });
            return;
        }

        toast.success(res.message, { id: toastId, });

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

/*
toast.custom((t) => (
  <div
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
            alt=""
          />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            Emilia Gates
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Sure! 8:30pm works great!
          </p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-gray-200">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Close
      </button>
    </div>
  </div>
))

*/


