import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Reuse App.css for styling

function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    age: '',
    aadharcard: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          aadharcard: reader.result, // Base64 string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://loginform-okk7.onrender.com/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Form submitted successfully!');
        navigate('/'); // Navigate back to dashboard or home
      } else {
        alert(data.error || 'Error submitting form');
      }
    } catch (error) {
      alert('Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <div className="login-header">
          <h1>Fill Your Details</h1>
          <p>Please provide your information</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Name</label>
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Email</label>
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Phone Number</label>
          </div>
          <div className="form-group">
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Date of Birth</label>
          </div>
          <div className="form-group">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Age</label>
          </div>
          <div className="form-group">
            <input
              type="file"
              name="aadharcard"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            <label>Aadhaar Card Photo</label>
          </div>
          <button type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
