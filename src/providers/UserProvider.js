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
        const { uid, displayName, email } = user;
        setUser({
          uid,
          displayName,
          email,
        });
      } else {
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