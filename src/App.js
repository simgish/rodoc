import './App.css';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import { useState, useEffect } from 'react';
import entryService from './services/EntryService';

function App() {
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState(['Bedtime', 'Schedule', 'Schoolwork']);

  useEffect(() => {
    entryService.getAll().then(entries => {
      console.log(entries.data);
      setEntries(entries.data.data);
    });

  }, [])

  const addNewEntry = (entry) => {
    // console.log(entry);
    setEntries(entries.concat(entry));
  }

  const addCategory = (category) => {
    console.log('category: ', category)
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
