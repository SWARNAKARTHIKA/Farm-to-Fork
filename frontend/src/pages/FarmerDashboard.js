import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
  const navigate = useNavigate();

  const [submittedData, setSubmittedData] = useState([
    // Example data
    { image: 'https://via.placeholder.com/150', text: 'Harvest 1', date: '2023-04-06' },
    { image: 'https://via.placeholder.com/150', text: 'Harvest 2', date: '2023-04-05' },
  ]);

  const handleCardClick = (index) => {
    if (index === 0) {
      navigate('/add-harvest');
    } else if (index === 3) {
      navigate('/vendor-list');
    } else if (index === 2) {
      navigate('/harvest-details', { state: submittedData[index] }); // Pass data for harvest details
    }
  };

  const cardTexts = [
    'Add Harvest Data',
    'Update Yield Info',
    'View My Harvests',
    'Vendors List',
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

      {/* Display Submitted Data */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#2f855a', fontSize: '1.8rem', marginBottom: '20px' }}>Your Uploaded Harvests</h2>
        {submittedData.map((entry, index) => (
          <div key={index} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e2f7e0', borderRadius: '12px' }}>
            <img
              src={entry.image}
              alt="Uploaded Harvest"
              style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '10px' }}
            />
            <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#2f855a' }}>{entry.text}</p>
            <p style={{ fontSize: '0.9rem', color: '#718096' }}>{entry.date}</p>
            <button
              onClick={() => handleCardClick(2)}
              style={{
                backgroundColor: '#38a169',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Update Harvest
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerDashboard;
