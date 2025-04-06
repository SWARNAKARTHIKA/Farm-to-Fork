import React, { useState, useEffect } from 'react';
import VendorList from './VendorList';  // Ensure VendorList is imported correctly

const AddHarvestData = () => {
  const [form, setForm] = useState({
    cropType: '',
    variety: '',
    sowingDate: '',
    harvestDate: '',
    landArea: '',
    expectedYield: '',
    historicalYield: '',
    irrigationSource: '',
    fertilizerUse: '',
    tokenQty: '',
    tokenPrice: '',
    minQty: '',
    landRecord: null,
    fieldPhoto: null,
  });
  const [showVendors, setShowVendors] = useState(false); // State to control vendor list visibility
  const [filteredVendors, setFilteredVendors] = useState([]);  // State for filtered vendors

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Fetch vendors based on cropType
  const fetchVendors = async (cropType) => {
    if (!cropType) return;  // Skip if no cropType is provided
    
    try {
      const res = await fetch(`https://your-api-url.com/vendors?cropType=${cropType}`);
      const result = await res.json();
      setFilteredVendors(result);
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation: Ensure fields are filled (you can extend this based on requirements)
    if (!form.cropType || !form.variety || !form.sowingDate || !form.harvestDate) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('crop_type', form.cropType);
    formData.append('variety', form.variety);
    formData.append('sowing_date', form.sowingDate);
    formData.append('expected_harvest_date', form.harvestDate);
    formData.append('total_land_area', form.landArea);
    formData.append('expected_yield', form.expectedYield);
    formData.append('historical_yield', form.historicalYield);
    formData.append('irrigation_source', form.irrigationSource);
    formData.append('fertilizer_pesticide_use', form.fertilizerUse);
    formData.append('token_quantity_kg', form.tokenQty);
    formData.append('token_price_per_kg', form.tokenPrice);
    formData.append('min_purchase_quantity', form.minQty);
    formData.append('land_record', form.landRecord);
    formData.append('field_photo', form.fieldPhoto);

    try {
      const res = await fetch('https://farm-to-fork-30r2.onrender.com/register', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      alert('Data submitted successfully ✅');
      console.log(result);
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Error submitting data.');
    }
  };

  // Show vendors when the cropType is selected
  useEffect(() => {
    if (form.cropType) {
      fetchVendors(form.cropType);  // Fetch vendors based on crop type
    }
  }, [form.cropType]);

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', color: '#276749', textAlign: 'center', marginBottom: '20px' }}>
        🌾 Add Harvest Data
      </h1>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {/* Crop Info */}
          <div style={boxStyle}>
            <h2 style={subHeading}>🌾 Crop Information</h2>
            <div style={fieldStyle}>Crop Type: <input name="cropType" style={inputStyle} type="text" onChange={handleChange} /></div>
            <div style={fieldStyle}>Variety: <input name="variety" style={inputStyle} type="text" onChange={handleChange} /></div>
            <div style={fieldStyle}>Sowing Date: <input name="sowingDate" style={inputStyle} type="date" onChange={handleChange} /></div>
            <div style={fieldStyle}>Expected Harvest Date: <input name="harvestDate" style={inputStyle} type="date" onChange={handleChange} /></div>
          </div>

          {/* Field Info */}
          <div style={boxStyle}>
            <h2 style={subHeading}>🌍 Field & Quantity Details</h2>
            <div style={fieldStyle}>Total Land Area: <input name="landArea" style={inputStyle} type="text" onChange={handleChange} /></div>
            <div style={fieldStyle}>Expected Yield: <input name="expectedYield" style={inputStyle} type="text" onChange={handleChange} /></div>
            <div style={fieldStyle}>Historical Yield: <input name="historicalYield" style={inputStyle} type="text" onChange={handleChange} /></div>
            <div style={fieldStyle}>Irrigation Source: <input name="irrigationSource" style={inputStyle} type="text" onChange={handleChange} /></div>
            <div style={fieldStyle}>Fertilizer/Pesticide Use: <input name="fertilizerUse" style={inputStyle} type="text" onChange={handleChange} /></div>
          </div>

          {/* Tokenization */}
          <div style={boxStyle}>
            <h2 style={subHeading}>📊 Sale & Tokenization Info</h2>
            <div style={fieldStyle}>Token Quantity (kg): <input name="tokenQty" style={inputStyle} type="text" onChange={handleChange} /></div>
            <div style={fieldStyle}>Token Price (₹/kg): <input name="tokenPrice" style={inputStyle} type="number" onChange={handleChange} /></div>
            <div style={fieldStyle}>Min. Purchase Quantity (kg): <input name="minQty" style={inputStyle} type="text" onChange={handleChange} /></div>
          </div>

          {/* Verification */}
          <div style={boxStyle}>
            <h2 style={subHeading}>📎 Verification / Supporting Docs</h2>
            <div style={fieldStyle}>Land Record: <input name="landRecord" style={inputStyle} type="file" onChange={handleChange} /></div>
            <div style={fieldStyle}>Field Photo: <input name="fieldPhoto" style={inputStyle} type="file" onChange={handleChange} /></div>
            <div style={fieldStyle}>ID Proof: <span style={{ color: '#999' }}>Already collected</span></div>
          </div>

          {/* Vendor Button */}
          <div style={boxStyle}>
            <button
              type="button"
              onClick={() => setShowVendors(!showVendors)} // Toggle vendor list visibility
              style={{
                backgroundColor: '#276749',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '20px',
                width: '100%',
              }}
            >
              Suggested Vendors
            </button>
          </div>
        </div>

        {/* Show Vendor List Modal */}
        {showVendors && (
          <div
            onClick={() => setShowVendors(false)}  // Close on outside click
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                width: '80%',
                maxHeight: '80%',
                overflowY: 'scroll',
              }}
            >
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Suggested Vendors</h2>
              <VendorList vendors={filteredVendors} /> {/* The component displaying the vendors */}
              <button
                type="button"
                onClick={() => setShowVendors(false)}
                style={{
                  backgroundColor: '#FF6347',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={submitButtonStyle}>
            Submit Harvest Data
          </button>
        </div>
      </form>
    </div>
  );
};

// Styles (can be moved to an external CSS file for better maintainability)
const boxStyle = {
  flex: '1 1 45%',
  backgroundColor: '#e6f4ea',
  border: '1px solid #a0d9a0',
  borderRadius: '12px',
  padding: '20px',
  minWidth: '300px',
  maxWidth: '500px',
};

const subHeading = {
  fontSize: '1.25rem',
  color: '#276749',
  marginBottom: '10px',
  fontWeight: 'bold',
};

const fieldStyle = {
  marginBottom: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const submitButtonStyle = {
  marginTop: '30px',
  padding: '12px 24px',
  backgroundColor: '#276749',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default AddHarvestData;
