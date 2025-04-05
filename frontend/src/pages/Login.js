import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Uncomment when enabling redirect

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  // const navigate = useNavigate(); // Uncomment when enabling redirect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://farm-to-fork-30r2.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      alert(result.message);

      // if (result.success) {
      //   navigate('/farmer-dashboard'); // Navigate to farmer dashboard
      // }

    } catch (err) {
      alert("Login failed!");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h2>Farm to Fork - Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
