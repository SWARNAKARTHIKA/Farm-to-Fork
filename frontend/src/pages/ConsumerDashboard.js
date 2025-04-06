import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import BASE_URL from './config';

const ConsumerDashboard = () => {
  const [availableTokens, setAvailableTokens] = useState([]);
  const [myTokens, setMyTokens] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch(`${BASE_URL}/available_tokens`)
      .then(res => res.json())
      .then(data => setAvailableTokens(data))
      .catch(err => console.error('Error fetching available tokens:', err));

    fetch(`${BASE_URL}/my_tokens`)
      .then(res => res.json())
      .then(data => setMyTokens(data))
      .catch(err => console.error('Error fetching your tokens:', err));
  }, []);

  const handleQuantityChange = (index, event) => {
    setQuantities({
      ...quantities,
      [index]: event.target.value,
    });
  };

  const handleBuyClick = (index) => {
    const quantity = quantities[index];
    if (quantity && quantity > 0) {
      fetch(`${BASE_URL}/buy_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenQty: quantity }),
      })
        .then(res => res.json())
        .then(data => {
          alert(`Successfully bought ${quantity} tokens!`);
        })
        .catch(err => {
          console.error('Error buying token:', err);
          alert('Error buying token. Please try again.');
        });
    } else {
      alert('Please select a valid quantity to buy.');
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f0fdf4' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2f855a', fontWeight: 'bold' }}>Welcome, Consumer</h1>
        <FaUserCircle size={50} color="#2f855a" />
      </div>

      {/* Available Tokens */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#2f855a', marginBottom: '10px' }}>Available Tokens</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {availableTokens.length > 0 ? (
            availableTokens.map((token, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#38a169',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <p><strong>Crop Type:</strong> {token.cropType || 'N/A'}</p>
                  <p><strong>Variety:</strong> {token.variety || 'N/A'}</p>
                  <p><strong>Sowing Date:</strong> {token.sowingDate || 'N/A'}</p>
                  <p><strong>Harvest Date:</strong> {token.harvestDate || 'N/A'}</p>
                  <p><strong>Land Area:</strong> {token.landArea || 'N/A'} acres</p>
                  <p><strong>Expected Yield:</strong> {token.expectedYield || 'N/A'} tons</p>
                  <p><strong>Irrigation:</strong> {token.irrigationSource || 'N/A'}</p>
                  <p><strong>Fertilizer:</strong> {token.fertilizerUse || 'N/A'}</p>
                  <p><strong>Token Qty:</strong> {token.tokenQty || 'N/A'}</p>
                  <p><strong>Token Price:</strong> ₹{token.tokenPrice || 'N/A'}</p>
                  <p><strong>Min Qty:</strong> {token.minQty || 'N/A'}</p>

                  {/* Quantity Selection */}
                  <div style={{ marginTop: '10px' }}>
                    <label htmlFor={`quantity-${index}`} style={{ marginRight: '10px' }}>Quantity:</label>
                    <input
                      type="number"
                      id={`quantity-${index}`}
                      min={token.minQty || 1}
                      max={token.tokenQty || 100}
                      value={quantities[index] || 0}
                      onChange={(e) => handleQuantityChange(index, e)}
                      style={{
                        padding: '5px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        width: '60px',
                      }}
                    />
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={() => handleBuyClick(index)}
                    style={{
                      marginTop: '10px',
                      padding: '10px 15px',
                      backgroundColor: '#2f855a',
                      color: 'white',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: '#555' }}>No available tokens.</p>
          )}
        </div>
      </div>

      {/* Your Tokens */}
      <div>
        <h2 style={{ fontSize: '1.5rem', color: '#2f855a', marginBottom: '10px' }}>Your Tokens</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {myTokens.length > 0 ? (
            myTokens.map((token, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#2f855a',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <p><strong>Crop Type:</strong> {token.cropType || 'N/A'}</p>
                  <p><strong>Variety:</strong> {token.variety || 'N/A'}</p>
                  <p><strong>Sowing Date:</strong> {token.sowingDate || 'N/A'}</p>
                  <p><strong>Harvest Date:</strong> {token.harvestDate || 'N/A'}</p>
                  <p><strong>Land Area:</strong> {token.landArea || 'N/A'} acres</p>
                  <p><strong>Expected Yield:</strong> {token.expectedYield || 'N/A'} tons</p>
                  <p><strong>Irrigation:</strong> {token.irrigationSource || 'N/A'}</p>
                  <p><strong>Fertilizer:</strong> {token.fertilizerUse || 'N/A'}</p>
                  <p><strong>Token Qty:</strong> {token.tokenQty || 'N/A'}</p>
                  <p><strong>Token Price:</strong> ₹{token.tokenPrice || 'N/A'}</p>
                  <p><strong>Min Qty:</strong> {token.minQty || 'N/A'}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: '#555' }}>You don't own any tokens.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
