import './App.css';
import TopNav from './components/TopNav';
import LogInOut from './components/LogInOut';
import Dashboard from './components/Dashboard';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import EntryEditForm from './components/EntryEditForm';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserProvider from './providers/UserProvider';

const App = () => {
  const [categories, setCategories] = useState(['Bedtime', 'Schedule', 'Schoolwork']);

  const addCategory = (category) => {
    setCategories(categories.concat(category));
  }

  return (
    <UserProvider>
      <div className="App">
        <Router>
          <div className="app-header">
            <header>
              <h1>RoDoc</h1>
            </header>
            {/* <LogInOut /> */}
          </div>
          <div>
            <TopNav />

            {/* <hr /> */}

            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/entry">
                <EntryForm addNewCategory={addCategory} categories={categories} />
              </Route>
              <Route path="/entries">
                <EntryList />
              </Route>
              <Route path="/edit-entry/:entryId">
                <EntryEditForm categories={categories} />
              </Route>
            </Switch>
          </div>
          <div className="loginoutbutton">
            <LogInOut />
            </div>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
