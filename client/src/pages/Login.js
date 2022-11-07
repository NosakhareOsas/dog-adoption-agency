import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import {Button} from 'react-bootstrap';


function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <hr />
          <p style={{ margin: '1% 25%' }}>
            Don't have an account? &nbsp;
            <Button variant="dark" type="submit" style={{ padding: '10px', margin: '10px' }} onClick={() => setShowLogin(false)}>
                Sign up
            </Button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <hr />
          <p style={{ margin: '1% 25%' }}>
            Already have an account? &nbsp;
            <Button variant="dark" type="submit" style={{ padding: '10px', margin: '10px' }} onClick={() => setShowLogin(true)}>
                Login
            </Button>
          </p>
        </>
      )}
    </>
  );
}

export default Login;