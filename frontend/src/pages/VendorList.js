import React, { useEffect, useState } from 'react';
import BASE_URL from './config';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/select_vendor`)
      .then(res => res.json())
      .then(data => setVendors(data.vendors || []))
      .catch(err => console.error('Error fetching vendors:', err));
  }, []);

  const handleConnectionRequest = (vendorId) => {
    setVendors(prevVendors =>
      prevVendors.map(vendor =>
        vendor.id === vendorId ? { ...vendor, isConnected: true } : vendor
      )
    );
  };

  return (
    <div className="vendor-container">
      <h1 className="title">Vendors</h1>
      <div className="vendor-list">
        {vendors.map(vendor => (
          <div key={vendor.id} className="vendor-card">
            <h2 className="vendor-name">{vendor.vendorName}</h2>
            <p><strong>Contact:</strong> {vendor.contactPerson}</p>
            <p><strong>Phone:</strong> {vendor.phone}</p>
            <p><strong>Type:</strong> {vendor.vendorType}</p>
            <p><strong>Location:</strong> {vendor.baseLocation}</p>
            <p><strong>Service Area:</strong> {vendor.serviceArea}</p>
            <p><strong>Pickup:</strong> {vendor.pickup ? 'Yes' : 'No'}</p>
            <p><strong>Storage:</strong> {vendor.storageType} ({vendor.storageCapacity})</p>
            <p><strong>Payment Percentage:</strong> {vendor.advancePayment}</p>

            {/* Show Crops Accepted */}
            <p><strong>Crops Accepted:</strong> {vendor.cropsAccepted.length > 0 ? vendor.cropsAccepted.join(', ') : 'N/A'}</p>

            {/* Show Minimum and Maximum Quantity */}
            <p><strong>Min Quantity:</strong> {vendor.minQty || 'N/A'}</p>
            <p><strong>Max Quantity:</strong> {vendor.maxQty || 'N/A'}</p>

            {/* Make Connection Button */}
            <button
              className={`connection-btn ${vendor.isConnected ? 'requested' : ''}`}
              onClick={() => handleConnectionRequest(vendor.id)}
            >
              {vendor.isConnected ? 'Requested' : 'Make Connection'}
            </button>
          </div>
        ))}
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        /* Container for the entire vendor list */
        .vendor-container {
          min-height: 100vh;
          background-color: #f7fafc;
          padding: 2rem;
          text-align: center;
        }

        /* Title styling */
        .title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }

        /* Flexbox layout for vendor cards */
        .vendor-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem; /* Space between cards */
        }

        /* Individual vendor card styling */
        .vendor-card {
          background-color: #38a169; /* Green background */
          color: white;
          border-radius: 12px;
          padding: 1.5rem;
          width: 250px; /* Fixed width for each card */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out; /* Smooth scaling on hover */
        }

        .vendor-card:hover {
          transform: scale(1.05); /* Slightly enlarge the card on hover */
        }

        /* Styling for vendor name */
        .vendor-name {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        /* General paragraph styling inside the cards */
        .vendor-card p {
          margin: 0.5rem 0;
        }

        /* Styling for strong elements (labels) inside each card */
        .vendor-card strong {
          font-weight: 600;
        }

        /* Styling for the connection button */
        .connection-btn {
          background-color: #48bb78; /* Green button */
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 1rem;
        }

        /* Change button color when "Requested" */
        .connection-btn.requested {
          background-color: #e53e3e; /* Red button for requested */
        }

        .connection-btn:hover {
          background-color: #38a169; /* Darker green on hover */
        }

        /* Responsive design for smaller screens */
        @media (max-width: 768px) {
          .vendor-card {
            width: 100%; /* Make cards full width on smaller screens */
          }
        }
      `}</style>
    </div>
  );
};

export default VendorList;
