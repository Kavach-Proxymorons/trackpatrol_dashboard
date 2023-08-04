import { useEffect, useState } from "react"

const useLocalStorage = (key, initial) => {
    const [value, setValue] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(key));
            if (saved) return saved;
        } catch (err) {
            console.error('error reading localstorage');
        }
        if (initial instanceof Function) return initial();
        return initial;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
