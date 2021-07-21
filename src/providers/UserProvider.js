import { props } from "bluebird";
import { useState, useEffect, useContext } from "react";
import { auth } from '../firebase.config';

export const UserContext = createContext({user:null});

export default () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            console.log(user);
            const { displayName, email } = user;
            setUser({ displayName, email });
        });
    }, []);

    return (
        <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
}
