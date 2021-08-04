import { useState, useEffect, useContext } from 'react';
import db from './firebase.config';

const EntriesService = (user) => {
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState(['Bedtime', 'Schedule', 'Schoolwork']);

  useEffect(() => {
    db.collection(`users/${user.uid}/entries`)
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // console.log('entries: ', data);
        setEntries(data);
      });

    console.log(user);

  }, [user]);

}

export default EntriesService;