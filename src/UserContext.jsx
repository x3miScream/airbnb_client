import {createContext, useState, useEffect} from 'react'

const UserContext = createContext({});

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if(!user)
        {
            try{
                fetch(
                    'http://localhost:4000/profile',
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                )
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                    setReady(true);
                });
            }
            catch(exception)
            {
                console.log(exception);
            }
        }
        else
        {
            setReady(true);
        }
    }, []);

    return(
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
};

export {UserContext, UserContextProvider};