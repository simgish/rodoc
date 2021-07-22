import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserContext } from '../providers/UserProvider';
import { useState, useEffect, useContext } from 'react';

const TopNav = () => {
  const user = useContext(UserContext);

  if (user) {
    return (
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
    );
  } else {
    return <ul></ul>;
  }
}

export default TopNav;