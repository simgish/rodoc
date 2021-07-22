import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { UserContext } from '../providers/UserProvider';
import Login from './Login';

const Dashboard = ({ entries }) => {


  return (
    <div className="entry-list-container">
      <ul>
      <Login />
      </ul>
    </div>
  )
}

export default Dashboard;