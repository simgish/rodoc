import './App.css';
import EntryForm from './components/EntryForm';
import { useState, useEffect } from 'react';
import entryService from './services/EntryService';

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    entryService.getAll().then(entries => {
      setEntries(entries.data);
    })
  }, [])

  const addNewEntry = (entry) => {
    console.log(entry);
    setEntries(entries.concat(entry));
  }

  return (
    <div className="App">
      <header>
        <h1>RoDoc</h1>
      </header>
      <EntryForm addNewEntry={addNewEntry} />
      {entries.map(entry => {
        console.log(entry.id);
        return (<li key={entry.id}>{entry.title}</li>)
      })}
    </div>
  );
}

export default App;
