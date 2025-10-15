import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';
import './App.css'; // Reuse App.css for styling

function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    dob: '',
    age: '',
    aadharcard: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
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
    if (!file) return;

    setIsVerifying(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;

      // OCR recognition
      Tesseract.recognize(imageData, 'eng')
        .then(({ data: { text } }) => {
          const lowerText = text.toLowerCase();
          if (
            lowerText.includes('aadhaar') ||
            lowerText.includes('government of india')
          ) {
            setFormData({ ...formData, aadharcard: imageData });
            alert('✅ Aadhaar verified successfully.');
          } else {
            alert('❌ Uploaded image is not a valid Aadhaar card.');
            e.target.value = ''; // clear file input
            setFormData({ ...formData, aadharcard: null });
          }
        })
        .catch(() => {
          alert('Error reading image. Try again.');
          e.target.value = '';
          setFormData({ ...formData, aadharcard: null });
        })
        .finally(() => {
          setIsVerifying(false);
        });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Age validation: must be between 18 and 60
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 18 || age > 60) {
      alert('Age must be between 18 and 60.');
      return;
    }

    // Aadhaar validation
    if (!formData.aadharcard) {
      alert('Please upload a valid Aadhaar card image before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://loginform-okk7.onrender.com/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('✅ Form submitted successfully!');
        navigate('/'); // Navigate back to dashboard or home
      } else {
        alert(data.error || 'Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form: ' + error.message);
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
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label>Address</label>
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
          <button type="submit" className="login-btn" disabled={isSubmitting || isVerifying}>
            {isSubmitting || isVerifying ? 'Processing...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
