import React, { useState } from 'react';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    mobile: '',
    location: '',
    city: '',
    state: '',
    role: 'farmer',
    id_proof: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'id_proof') {
      setForm({ ...form, id_proof: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      const res = await fetch('https://farm-to-fork-30r2.onrender.com/register', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      alert(result.message);
    } catch (err) {
      alert("Error submitting form!");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#eafbe6', // very light green
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
         // backgroundColor: '#a0d9a0',
          padding: '30px',
          //borderRadius: '15px',
         // boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%',
          fontFamily: 'Arial, sans-serif',
          color: '#065f46',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Farm to Fork - Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input name="username" placeholder="Username" onChange={handleChange} required style={inputStyle} />

          <label>Password:</label>
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={inputStyle} />

          <label>Mobile No.:</label>
          <input name="mobile" placeholder="Mobile No." onChange={handleChange} required style={inputStyle} />

          <label>Location:</label>
          <input name="location" placeholder="Location" onChange={handleChange} required style={inputStyle} />

          <label>City:</label>
          <input name="city" placeholder="City" onChange={handleChange} required style={inputStyle} />

          <label>State:</label>
          <input name="state" placeholder="State" onChange={handleChange} required style={inputStyle} />

          <label>Role:</label>
          <select name="role" onChange={handleChange} style={inputStyle}>
            <option value="farmer">Farmer</option>
            <option value="vendor">Vendor</option>
            <option value="consumer">Consumer</option>
          </select>

          <label>ID Proof (file):</label>
          <input type="file" name="id_proof" onChange={handleChange} required style={{ marginBottom: '20px' }} />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#065f46',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#054e3b')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#065f46')}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '8px',
  border: '1px solid #065f46',
  outline: 'none',
};

export default Signup;
