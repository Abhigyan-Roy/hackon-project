import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      console.log(response.data.message); 
      localStorage.setItem('token', response.data.token);
      navigate('/dash');
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <div id='container'>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login Here</button>
      <p>Not having an account? <Link to="/">Create an account here</Link></p>
    </div>
  );
};

export default Login;
