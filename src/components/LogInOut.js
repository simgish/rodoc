import './Login.css';
import { signInWithGoogle } from '../firebase.config';
import { UserContext } from '../providers/UserProvider';
import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../firebase.config';

const LogInOut = () => {
  const user = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (user) {
      console.log(user);
      setRedirect('/entries');
    }
  }, [user]);

  // if (redirect) {
  //   return <Redirect to={redirect} />;
  // }

  const handleLogout = async () => {
    await auth.signOut();
    // history.push("/dashboard");
    
    return <Redirect to='/dashboard' />;
  }

  if (!user) {
    return (
      <div className="login-buttons">
        <button className="login-provider-button" onClick={signInWithGoogle}>
          <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
          <span> Continue with Google</span>
        </button>
      </div>
    );
  }

  if (user) {
    return (
      <div className="login-buttons">
        <button className="login-provider-button" onClick={handleLogout}>
          <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
          <span>Logout</span>
        </button>
      </div>
    );
  }
}

export default LogInOut;