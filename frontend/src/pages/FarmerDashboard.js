import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  
  // State for storing image and text
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [submittedData, setSubmittedData] = useState([]); // To store uploaded data

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle text input change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text && image) {
      const newEntry = {
        image,
        text,
        date: new Date().toLocaleDateString(),
      };
      setSubmittedData([newEntry, ...submittedData]);
      setImage(null);
      setText('');
    }
  };

  const handleCardClick = (index) => {
    if (index === 0) {
      navigate('/add-harvest');
    } else if (index === 1) {
      navigate('/farmer-token-details'); // Navigate to Token Details Page
    } else if (index === 3) {
      navigate('/vendor-list');
    }
  };

  const cardTexts = [
    'Add Harvest Data',
    'View Token Details',
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

      {/* Image and Text Upload Form */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#2f855a', fontSize: '1.8rem', marginBottom: '20px' }}>Upload Your Harvest Data</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ padding: '10px', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Enter your harvest description..."
              style={{ width: '100%', padding: '10px', height: '100px' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: '8px' }}>
            Upload Data
          </button>
        </form>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerDashboard;
