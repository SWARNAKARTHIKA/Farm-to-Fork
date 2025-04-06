import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import FarmerDashboard from './pages/FarmerDashboard';
import AddHarvestData from './pages/AddHarvestData'; 
import VendorRegistrationForm from './pages/VendorRegistrationForm';
import ConsumerDashboard from './pages/ConsumerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import BASE_URL from './config'; // Make sure BASE_URL is correctly defined in this file
import VendorList from './pages/VendorList';
import ChatRoom from './pages/ChatRoom';
import UpdateHarvest from './pages/UpdateHarvest';
import FarmerTokenDetails from './pages/FarmTokenDetails';

const Home = () => {  
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: 'url("/home1.jpg")', // Make sure image is in public/
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        color: 'white',
        textAlign: 'center',
      }}
    >
    

      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
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
        <Route path="/add-harvest" element={<AddHarvestData />} />
        <Route path="/vendor-registration" element={<VendorRegistrationForm />} />
        <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />    
        <Route path="/vendor-list" element={<VendorList />} />
        <Route path="/chat-room" element={<ChatRoom />} />
        <Route path="/update-harvest" element={<UpdateHarvest />} />
        <Route path="/farmer-token-details" element={<FarmerTokenDetails />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
