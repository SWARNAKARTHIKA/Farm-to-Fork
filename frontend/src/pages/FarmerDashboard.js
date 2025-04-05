import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const FarmerDashboard = () => {
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
          paddingLeft: '20px',   // ← Left margin
          paddingRight: '20px',  // ← Right margin
        }}
      >
        {[
          'Add Crop Details',
          'Update Crop Details',
          'View My Crops',
          'Select Vendor'
        ].map((text, index) => (
          <div
            key={index}
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
