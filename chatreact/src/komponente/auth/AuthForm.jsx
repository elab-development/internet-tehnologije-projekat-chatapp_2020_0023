import React, { useState } from 'react';
import './AuthForm.css';  

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Stanje za praćenje da li je login ili register forma aktivna

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <div className="login-form">
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
          <p onClick={toggleForm}>Don't have an account? Register here</p>
        </div>
      ) : (
        <div className="register-form">
          <h2>Register</h2>
          <form>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button type="submit">Create Account</button>
          </form>
          <p onClick={toggleForm}>Have an account? Login here</p>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
