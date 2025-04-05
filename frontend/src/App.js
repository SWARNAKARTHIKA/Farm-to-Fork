import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import FarmerDashboard from './pages/FarmerDashboard';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '100vh',
        background: 'radial-gradient(circle at center, #bbf7d0 0%, #065f46 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '40px' }}>FARM TO FORK</h1>
      
      {/* Button Row */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <button
          onClick={() => navigate('/signup')}
          style={{
            padding: '12px 24px',
            backgroundColor: 'white',
            color: '#065f46',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate('/Login')}
          style={{
            padding: '12px 24px',
            backgroundColor: 'white',
            color: '#065f46',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
