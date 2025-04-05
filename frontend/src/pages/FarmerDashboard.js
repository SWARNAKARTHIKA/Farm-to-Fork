import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (index) => {
    if (index === 0) {
      navigate('/add-harvest'); // 🔗 Route to AddHarvestData page
    }
    // You can add more `if` statements for other cards later
  };

  const cardTexts = [
    'Add Harvest Data',
    'Update Yield Info',
    'View My Harvests',
    'Connect with Vendors'
  ];

  return (
    <div style={{ padding: '30px', height: '100vh', boxSizing: 'border-box', backgroundColor: '#f0fdf4' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2f855a', fontWeight: 'bold' }}>Welcome, Swarna</h1>
        <FaUserCircle size={50} color="#2f855a" />
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '40px',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        {cardTexts.map((text, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            style={{
              width: '100%',
              height: '140px',
              backgroundColor: '#38a169',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '12px',
              boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
              cursor: index === 0 ? 'pointer' : 'default', // Only first box is clickable
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerDashboard;
