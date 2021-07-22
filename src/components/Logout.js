import './Login.css';
import { auth } from '../firebase.config';
import { UserContext } from '../providers/UserProvider';
import { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

const Logout = () => {
  const user = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      console.log(user);
      // return;
      //   setRedirect('/dashboard');
    }
  }, [user])

  if (redirect) {
    // return <Redirect to={redirect} />;
  }
  
  const handleLogout = async () => {
    await auth.signOut();
    // history.push("/dashboard");
    return <Redirect to='/dashboard' />;
  }

  

  return (
    <div className="login-buttons">
      <button className="login-provider-button" onClick={handleLogout}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default Logout;