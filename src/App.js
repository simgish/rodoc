import './App.css';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import { useState, useEffect } from 'react';
import entryService from './services/EntryService';
import db from './firebase.config';

function App() {
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState(['Bedtime', 'Schedule', 'Schoolwork']);

  useEffect(() => {
    db.collection("entries")
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

  }, [])

  const addNewEntry = (entry) => {
    setEntries(entries.concat(entry));
  }

  const addCategory = (category) => {
    setCategories(categories.concat(category));
  }

  return (
    <div className="App">
      <header>
        <h1>RoDoc</h1>
      </header>
      <EntryForm addNewEntry={addNewEntry} addNewCategory={addCategory} categories={categories}/>
      <EntryList entries={entries} />
    </div>
  );
}

export default App;
