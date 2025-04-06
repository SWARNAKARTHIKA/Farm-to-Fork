import React from 'react';

const FarmerTokenDetails = () => {
  // Static values for testing
  const tokenInfo = {
    tokenId: '12345',
    status: 'Completed',
    dateIssued: '2025-04-06',
    items: [
      { name: 'Tomatoes', quantity: 10, price: 5 },
      { name: 'Lettuce', quantity: 5, price: 3 },
    ],
  };

  const customerInfo = {
    name: 'John Doe',
    contact: '9876543210',
    address: '123 Main St, Springfield',
  };

  const totalPrice = 50;
  const farmerShare = 40;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Token Details</h2>

      {/* Token Information */}
      <div style={styles.section}>
        <h3 style={styles.subheading}>Token Information</h3>
        <p><strong>Token ID:</strong> {tokenInfo.tokenId}</p>
        <p><strong>Status:</strong> {tokenInfo.status}</p>
        <p><strong>Date Issued:</strong> {tokenInfo.dateIssued}</p>
      </div>

      {/* Customer Details */}
      <div style={styles.section}>
        <h3 style={styles.subheading}>Customer Details</h3>
        <p><strong>Customer Name:</strong> {customerInfo.name}</p>
        <p><strong>Contact:</strong> {customerInfo.contact}</p>
        <p><strong>Address:</strong> {customerInfo.address}</p>
      </div>

      {/* Token Items */}
      <div style={styles.section}>
        <h3 style={styles.subheading}>Token Details</h3>
        <ul>
          {tokenInfo.items && tokenInfo.items.map((item, index) => (
            <li key={index}>
              <strong>Item:</strong> {item.name} - {item.quantity} - ${item.price}
            </li>
          ))}
        </ul>
      </div>

      {/* Price Information */}
      <div style={styles.section}>
        <h3 style={styles.subheading}>Price Information</h3>
        <p><strong>Total Price Paid:</strong> ${totalPrice}</p>
        <p><strong>Farmer's Share:</strong> ${farmerShare}</p>
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  section: {
    backgroundColor: '#e5e7eb',
    padding: '15px',
    marginTop: '10px',
    borderRadius: '8px',
  },
  subheading: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
  },
};

export default FarmerTokenDetails;
