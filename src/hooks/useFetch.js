import { useContext, useEffect, useState } from "react";
import AuthContext from "../Contexts/AuthContext";

const useFetch = (route) => {
    const { token, authenticate } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        if (route === '') return;
        const controller = new AbortController();
        const URL = process.env.REACT_APP_BASE_URL + route;

        (async () => {
            setLoading(true);
            try {
                const response = await fetch(URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }, { signal: controller.signal });

                const json = await response.json();
                if(json.status > 299) {
                    if(json.status === 401) return authenticate();
                    if(json.status === 500) throw new Error("Internal server error");
                    throw new Error("Invalid request");
                }
                setResponse(json);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();

        return () => {
            controller.abort();
        }

    }, []);

    return { response, loading, error };
}

export default useFetch;
