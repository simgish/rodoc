import { useState, useEffect, createContext } from "react";
import { Redirect } from 'react-router-dom';
import { auth } from '../firebase.config';
import db from '../firebase.config';

export const UserContext = createContext(null);

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [entries, setEntries] = useState([]);
  
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
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

  useEffect(() => {
    if (!user) return;
    db.collection(`users/${user.uid}/entries`)
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEntries(data);
      });

  }, [user]);

  if (redirect) {
    // return <Redirect to='/dashboard' />;
  }

  const value = {user, entries, setEntries};
  

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export default UserProvider;