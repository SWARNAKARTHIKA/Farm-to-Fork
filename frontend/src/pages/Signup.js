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
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h2>Farm to Fork - Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required /><br /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br /><br />
        <input name="mobile" placeholder="Mobile No." onChange={handleChange} required /><br /><br />
        <input name="location" placeholder="Location" onChange={handleChange} required /><br /><br />
        <input name="city" placeholder="City" onChange={handleChange} required /><br /><br />
        <input name="state" placeholder="State" onChange={handleChange} required /><br /><br />

        <select name="role" onChange={handleChange}>
          <option value="farmer">Farmer</option>
          <option value="vendor">Vendor</option>
          <option value="consumer">Consumer</option>
        </select><br /><br />

        <input type="file" name="id_proof" onChange={handleChange} required /><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
