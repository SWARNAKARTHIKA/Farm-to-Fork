import React, { useState } from 'react';
import BASE_URL from './config';

const VendorRegistrationForm = () => {
  const [form, setForm] = useState({
    vendorName: '',
    contactPerson: '',
    phone: '',
    vendorType: '',
    baseLocation: '',
    serviceArea: '',
    cropsAccepted: [],
    minQty: '',
    maxQty: '',
    pickup: '',
    storageType: '',
    storageCapacity: '',
    advancePayment: '',
    paymentTimeline: '',
    pricingType: '',
    grading: '',
    packagingTesting: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        cropsAccepted: checked
          ? [...prev.cropsAccepted, value]
          : prev.cropsAccepted.filter(item => item !== value),
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/register_vendor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      alert('✅ Vendor Registered Successfully');
      console.log(result);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to Register Vendor');
    }
  };

  const crops = ['Wheat', 'Rice', 'Tomato', 'Potato', 'Mango'];

  const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
  };

  const boxStyle = {
    flex: '1 1 45%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    minWidth: '300px',
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '1000px',
        margin: '30px auto',
        padding: '20px',
        background: '#f0fdf4',
        borderRadius: '15px',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#166534', marginBottom: '30px' }}>Vendor Registration</h1>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Box 1: Company Info */}
        <div style={boxStyle}>
          <h3>Company Info</h3>
          <label>Vendor/Company Name: <input name="vendorName" value={form.vendorName} onChange={handleChange} style={inputStyle} /></label>
          <label>Contact Person Name: <input name="contactPerson" value={form.contactPerson} onChange={handleChange} style={inputStyle} /></label>
          <label>Phone: <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} /></label>
          <label>Vendor Type:
            <select name="vendorType" value={form.vendorType} onChange={handleChange} style={inputStyle}>
              <option value="">Select</option>
              <option value="Aggregator">Aggregator</option>
              <option value="Exporter">Exporter</option>
              <option value="Cold Storage">Cold Storage</option>
              <option value="Logistics">Logistics</option>
              <option value="Retailer">Retailer</option>
            </select>
          </label>
        </div>

        {/* Box 2: Location & Service */}
        <div style={boxStyle}>
          <h3>Location & Service</h3>
          <label>Base Location: <input name="baseLocation" value={form.baseLocation} onChange={handleChange} style={inputStyle} /></label>
          <label>Service Area: <input name="serviceArea" value={form.serviceArea} onChange={handleChange} style={inputStyle} /></label>
          <label>Crops Accepted:</label>
          <div>
            {crops.map(crop => (
              <label key={crop} style={{ display: 'block' }}>
                <input type="checkbox" name="cropsAccepted" value={crop} onChange={handleChange} checked={form.cropsAccepted.includes(crop)} />
                {' '}{crop}
              </label>
            ))}
          </div>
        </div>

        {/* Box 3: Quantity & Pickup */}
        <div style={boxStyle}>
          <h3>Quantity & Pickup</h3>
          <label>Min Quantity: <input name="minQty" value={form.minQty} onChange={handleChange} style={inputStyle} /></label>
          <label>Max Quantity: <input name="maxQty" value={form.maxQty} onChange={handleChange} style={inputStyle} /></label>
          <label>On-field Pickup:
            <select name="pickup" value={form.pickup} onChange={handleChange} style={inputStyle}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
        </div>

        {/* Box 4: Storage Info */}
        <div style={boxStyle}>
          <h3>Storage Info</h3>
          <label>Storage Type:
            <select name="storageType" value={form.storageType} onChange={handleChange} style={inputStyle}>
              <option value="">Select</option>
              <option value="Dry">Dry</option>
              <option value="Cold">Cold</option>
              <option value="Both">Both</option>
            </select>
          </label>
          <label>Storage Capacity (MT): <input name="storageCapacity" value={form.storageCapacity} onChange={handleChange} style={inputStyle} /></label>
        </div>

        {/* Box 5: Payment Info */}
        <div style={boxStyle}>
          <h3>Payment & Pricing</h3>
          <label>Advance Payment (%): <input name="advancePayment" value={form.advancePayment} onChange={handleChange} style={inputStyle} /></label>
          <label>Pricing Type:
            <select name="pricingType" value={form.pricingType} onChange={handleChange} style={inputStyle}>
              <option value="">Select</option>
              <option value="Fixed">Fixed</option>
              <option value="Negotiable">Negotiable</option>
              <option value="Market Linked">Market Linked</option>
            </select>
          </label>
        </div>

        {/* Box 6: Extra Services */}
        <div style={boxStyle}>
          <h3>Extra Services</h3>
          <label>Grading/Sorting:
            <select name="grading" value={form.grading} onChange={handleChange} style={inputStyle}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>Packaging/Testing:
            <select name="packagingTesting" value={form.packagingTesting} onChange={handleChange} style={inputStyle}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#166534', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px' }}>
          Register Vendor
        </button>
      </div>
    </form>
  );
};

export default VendorRegistrationForm;
