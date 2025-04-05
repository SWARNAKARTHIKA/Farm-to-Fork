import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from './config'; // Make sure BASE_URL is correctly defined in this file

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Sending credentials:', credentials); // Debug log

    try {
      const res = await fetch(`${BASE_URL}/register/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      alert(result.message);

      if (result.success) {
        navigate('/farmer-dashboard');
      }
    } catch (err) {
      alert('Login failed!');
      console.error('Login error:', err);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#eafbe6', // Very light green
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          padding: '40px',
          maxWidth: '400px',
          width: '100%',
          borderRadius: '15px',
          fontFamily: 'Arial, sans-serif',
          color: '#065f46',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          Farm to Fork - Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              border: '1px solid #065f46',
              borderRadius: '8px',
              outline: 'none',
            }}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              border: '1px solid #065f46',
              borderRadius: '8px',
              outline: 'none',
            }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#065f46',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#054e3b')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#065f46')}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
