import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateHarvest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve passed data (if any)
  const harvest = location.state || { image: '', text: '', date: '' };

  const [image, setImage] = useState(harvest.image);
  const [text, setText] = useState(harvest.text);

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

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedHarvest = {
      image,
      text,
      date: new Date().toLocaleDateString(),
    };
    // Here, you would typically send this updated data to the server or update the state.
    console.log(updatedHarvest);
    navigate('/farmer-dashboard'); // Navigate back to Farmer Dashboard
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f0fdf4' }}>
      <h2 style={{ color: '#2f855a', fontSize: '1.8rem', marginBottom: '20px' }}>Update Harvest Details</h2>

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
            placeholder="Enter updated harvest description..."
            style={{ width: '100%', padding: '10px', height: '100px' }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: '8px' }}
        >
          Update Harvest
        </button>
      </form>
    </div>
  );
};

export default UpdateHarvest;
