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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Vendors</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {vendors.map(vendor => (
          <div key={vendor.id} className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200">
            <h2 className="text-xl font-semibold text-green-700 mb-2">{vendor.vendorName}</h2>
            <p><strong>Contact:</strong> {vendor.contactPerson}</p>
            <p><strong>Phone:</strong> {vendor.phone}</p>
            <p><strong>Type:</strong> {vendor.vendorType}</p>
            <p><strong>Location:</strong> {vendor.baseLocation}</p>
            <p><strong>Service Area:</strong> {vendor.serviceArea}</p>
            <p><strong>Pickup:</strong> {vendor.pickup ? 'Yes' : 'No'}</p>
            <p><strong>Storage:</strong> {vendor.storageType} ({vendor.storageCapacity})</p>
            <p><strong>Advance Payment:</strong> {vendor.advancePayment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorList;
