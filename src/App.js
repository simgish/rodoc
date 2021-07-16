import './App.css';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import { useState, useEffect } from 'react';
import db from './firebase.config';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
      <Router>
        <div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/entries">Entries</Link>
            </li>
            <li>
              <Link to="/entry">Add Entry</Link>
            </li>
          </ul>

          {/* <hr /> */}

          <Switch>
            <Route exact path="/">
              {/* <Home /> */}
              <EntryList entries={entries} />
            </Route>
            <Route path="/entry">
              <EntryForm addNewEntry={addNewEntry} addNewCategory={addCategory} categories={categories} />
            </Route>
            <Route path="/entries">
              <EntryList entries={entries} />
            </Route>
          </Switch>
        </div>
      </Router>
      {/* <EntryForm addNewEntry={addNewEntry} addNewCategory={addCategory} categories={categories}/>
      <EntryList entries={entries} /> */}
    </div>
  );
}

export default App;
