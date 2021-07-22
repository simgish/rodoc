import React, { useState, useEffect, createContext } from "react";
import { Redirect } from 'react-router-dom';
import { auth } from '../firebase.config';

export const UserContext = createContext(null);

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        const { displayName, email } = user;
        setUser({
          displayName,
          email,
        });
      } else {
        console.log(user);
        setUser(null);
        setRedirect('/dashboard');
      }
    });
  }, []);

  if (redirect) {
    // return <Redirect to='/dashboard' />;
  }

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export default UserProvider;