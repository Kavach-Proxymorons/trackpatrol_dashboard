// we going to use the useContext hook to create a context
// from this file we going to manage all the state of our app
// make needed function to pass on the context to the children




import React, { createContext,useContext, useState} from 'react';
const StateContext = createContext();

const StateProvider = ({ children }) => {
    const [state, setState] = useState(false); // dummy state

    return (
        <StateContext.Provider value={{ state, setState }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);


