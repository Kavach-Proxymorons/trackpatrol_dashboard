import { createContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const baseurl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage("token", "");
    const [user, setUser] = useLocalStorage("user", {});

    const login = async (username, password) => {

        const tid = toast.loading("Loading...");

        const response = await fetch(`${baseurl}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const json = await response.json();
        if (json.status != 200) {
            toast.error(json.message, { id: tid });
            return;
        }

        setUser(json.data.user);
        setToken(json.data.token);
        toast.success(json.message, { id: tid });
        navigate("../", { replace: true });
    }

    const logout = () => {
        setToken("");
        toast.success("Logged out successfully");
        navigate("/login");
    }

    const authenticate = async () => {

        const tid = toast.loading("Loading...");

        const response = await fetch(`${baseurl}auth`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        const json = await response.json();
        if (json.status != 200) {
            setToken("");
            toast.error(json.message, { id: tid });
            return;
        }

        setToken(json.data.token);
        setUser(json.data.user);
        toast.success(json.message, { id: tid });
    }

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            authenticate
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;
