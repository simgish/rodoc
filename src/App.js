import './App.css';
import EntryForm from './components/EntryForm';
import { useState, useEffect } from 'react';
import entryService from './services/EntryService';

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    entryService.getAll().then(entries => {
      console.log(entries.data);
      setEntries(entries.data);
    })
  }, [])

  return (
    <div className="App">
      <header>
        <h1>RoDoc</h1>
      </header>
      <EntryForm />
      {entries.map(entry => {
        return (<li key={entry.id}>{entry.title}</li>)
      })}
    </div>
  );
}

export default App;
