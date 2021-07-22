import './Login.css';
import { signInWithGoogle } from '../firebase.config';
import UserContext from '../providers/UserProvider';
import { useEffect, useContext } from 'react';

const Login = () => {
  const user = useContext(UserContext);
  console.log('user: ', user);
  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user])

  return (
    <div className="login-buttons">
      user: {user}
      <button className="login-provider-button" onClick={signInWithGoogle}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
        <span> Continue with Google</span>
      </button>
    </div>
  );
}

export default Login;