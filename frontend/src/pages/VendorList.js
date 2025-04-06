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
            <p><strong>Crops Accepted:</strong> {vendor.cropsAccepted.length > 0 ? vendor.cropsAccepted.join(', ') : 'N/A'}</p>
            <p><strong>Min Quantity:</strong> {vendor.minQty || 'N/A'}</p>
            <p><strong>Max Quantity:</strong> {vendor.maxQty || 'N/A'}</p>
  
            <button
              className={`connection-btn ${vendor.isConnected ? 'requested' : ''}`}
              onClick={() => handleConnectionRequest(vendor.id)}
            >
              {vendor.isConnected ? 'Requested' : 'Make Connection'}
            </button>
          </div>
        ))}
      </div>
  
      <style jsx>{`
        .vendor-container {
          background-color: #e8f5e9; /* light green */
          min-height: 100vh;
          padding: 2rem;
          font-family: Arial, sans-serif;
        }
  
        .title {
          text-align: center;
          font-size: 2.5rem;
          color: #2e7d32; /* dark green */
          margin-bottom: 2rem;
        }
  
        .vendor-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
  
        .vendor-card {
          background-color: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
          line-height: 1.7;
        }
  
        .vendor-card:hover {
          transform: translateY(-4px);
        }
  
        .vendor-name {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.75rem;
          color: #333;
        }
  
        p {
          margin: 0.25rem 0;
          font-size: 0.95rem;
          color: #555;
        }
  
        .connection-btn {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background-color: #388e3c; /* green */
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
  
        .connection-btn:hover {
          background-color: #2e7d32;
        }
  
        .connection-btn.requested {
          background-color: #6c757d;
          cursor: default;
        }
      `}</style>
    </div>
  );
}

export default VendorList;
