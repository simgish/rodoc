import './App.css';
// import Login from './components/Login';
// import Logout from './components/Logout';
import LogInOut from './components/LogInOut';
import Dashboard from './components/Dashboard';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import EntryEditForm from './components/EntryEditForm';
import { useState, useEffect, useContext } from 'react';
import db from './firebase.config';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserProvider, { UserContext } from './providers/UserProvider';

function App() {
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState(['Bedtime', 'Schedule', 'Schoolwork']);
  const user = useContext(UserContext);

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

  const editEntry = (entryId, entry) => {
    db.collection("entries")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEntries(data);
      });
  }

  const addCategory = (category) => {
    setCategories(categories.concat(category));
  }

  return (
    <UserProvider>
      <div className="App">
        <header>
          <h1>RoDoc</h1>
        </header>
        <Router>
          <div>
            <ul className="nav-links">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/entries">Entries</Link>
              </li>
              <li>
                <Link to="/entry">Add Entry</Link>
              </li>
            </ul>

            {/* <hr /> */}

            {/* <div>
              login: 
              {showLogin()}
            </div>
            <div>
              logout:
              {showLogout()}
            </div> */}
            <LogInOut />

            <Switch>
              <Route exact path="/">
                <Dashboard entries={entries} />
              </Route>
              <Route path="/entry">
                <EntryForm addNewEntry={addNewEntry} addNewCategory={addCategory} categories={categories} />
              </Route>
              <Route path="/entries">
                <EntryList entries={entries} />
              </Route>
              <Route path="/edit-entry/:entryId">
                <EntryEditForm editEntry={editEntry} categories={categories} entries={entries} />
              </Route>
            </Switch>
          </div>
        </Router>
        {/* <EntryForm addNewEntry={addNewEntry} addNewCategory={addCategory} categories={categories}/>
      <EntryList entries={entries} /> */}
      </div>
    </UserProvider>
  );
}

export default App;
