import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const VendorDashboard = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Hardcoded farmers' data
  const [farmers, setFarmers] = useState([
    { id: 1, name: 'Ravi Kumar', crop: 'Paddy', year: '2023', price: '500', location: 'Guindy, Chennai' },
    { id: 2, name: 'Kavitha Devi', crop: 'Sugarcane', year: '2022', price: '400', location: 'T Nagar, Chennai' },
    { id: 3, name: 'Arun Prakash', crop: 'Tomato', year: '2021', price: '450', location: 'Velachery, Chennai' },
    { id: 4, name: 'Meera Rani', crop: 'Brinjal', year: '2020', price: '550', location: 'Anna Nagar, Chennai' },
    { id: 5, name: 'Vigneshwaran', crop: 'Coconut', year: '2023', price: '350', location: 'Adyar, Chennai' },
  ]);

  const [selectedFarmer, setSelectedFarmer] = useState(null); // To store the selected farmer for modal
  const [showModal, setShowModal] = useState(false); // To control visibility of the modal

  const handleAccept = (id) => {
    // Handle accept logic here, like sending the request to the server
    console.log(`Accepted request from farmer ${id}`);

    // Navigate to the chat-room
    navigate('/chat-room'); // Navigate to the /chat-room route

    // Optionally, remove the farmer from the list after accepting
    setFarmers(prevFarmers => prevFarmers.filter(farmer => farmer.id !== id));
  };

  const handleReject = (id) => {
    // Handle reject logic here, like notifying the farmer or logging
    console.log(`Rejected request from farmer ${id}`);

    // Remove the farmer from the list after rejecting
    setFarmers(prevFarmers => prevFarmers.filter(farmer => farmer.id !== id));
  };

  const handleViewDetails = (farmer) => {
    setSelectedFarmer(farmer); // Set the selected farmer's details
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    setSelectedFarmer(null); // Clear the selected farmer
  };

  return (
    <div className="vendor-dashboard" style={{ padding: '2rem', backgroundColor: '#f7fafc' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>Farmer Dashboard</h1>
      <div className="farmer-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
        {farmers.map(farmer => (
          <div key={farmer.id} className="farmer-card" style={farmerCardStyle}>
            <p>{farmer.name}</p>
            <button 
              onClick={() => handleViewDetails(farmer)} 
              className="view-btn"
              style={viewButtonStyle}
            >
              View
            </button>
            <div style={{ marginTop: '10px' }}>
              <button 
                onClick={() => handleAccept(farmer.id)} 
                className="accept-btn"
                style={acceptButtonStyle}
              >
                Accept
              </button>
              <button 
                onClick={() => handleReject(farmer.id)} 
                className="reject-btn"
                style={rejectButtonStyle}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for farmer details */}
      {showModal && selectedFarmer && (
        <div className="modal" style={modalStyle}>
          <div className="modal-content" style={modalContentStyle}>
            <h2 style={{ marginBottom: '1rem', color: '#2b6cb0' }}>Farmer Details</h2>
            <p><strong>Name:</strong> {selectedFarmer.name}</p>
            <p><strong>Crop:</strong> {selectedFarmer.crop}</p>
            <p><strong>Year:</strong> {selectedFarmer.year}</p>
            <p><strong>Price:</strong> ${selectedFarmer.price}</p>
            <p><strong>Location:</strong> {selectedFarmer.location}</p>
            <button onClick={closeModal} style={closeButtonStyle}>Close</button>
          </div>
        </div>
      )}

      {/* Inline CSS for styling */}
      <style jsx>{`
        .farmer-card {
          background-color: #38a169;
          color: white;
          padding: 1rem;
          border-radius: 10px;
          width: 220px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .farmer-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        .view-btn, .accept-btn, .reject-btn {
          padding: 0.5rem 1rem;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 10px;
        }

        .view-btn {
          background-color: #3182ce;
          color: white;
        }

        .view-btn:hover {
          background-color: #2b6cb0;
        }

        .accept-btn {
          background-color: #48bb78;
          color: white;
        }

        .accept-btn:hover {
          background-color: #38a169;
        }

        .reject-btn {
          background-color: #e53e3e;
          color: white;
          margin-left: 10px;
        }

        .reject-btn:hover {
          background-color: #c53030;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background-color: #fff;
          padding: 2rem;
          border-radius: 10px;
          width: 400px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        button {
          padding: 0.5rem 1rem;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 1rem;
          background-color: #e53e3e;
          color: white;
        }

        button:hover {
          background-color: #c53030;
        }
      `}</style>
    </div>
  );
};

// Styles as JS objects for dynamic use
const farmerCardStyle = {
  backgroundColor: '#38a169',
  color: 'white',
  padding: '1rem',
  borderRadius: '10px',
  width: '220px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const viewButtonStyle = {
  backgroundColor: '#3182ce',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
};

const acceptButtonStyle = {
  backgroundColor: '#48bb78',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
};

const rejectButtonStyle = {
  backgroundColor: '#e53e3e',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
};

const modalStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '10px',
  width: '400px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
};

const closeButtonStyle = {
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  backgroundColor: '#e53e3e',
  color: 'white',
};

export default VendorDashboard;
