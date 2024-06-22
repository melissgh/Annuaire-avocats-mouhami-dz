import React, { useState } from 'react';
import axios from 'axios';
import './loginAvocat.css';
import email_icon from '../pic/email.png';
import password_icon from '../pic/password.png';
import { useNavigate } from 'react-router-dom';

const LoginAvocat = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [email, setEmail] = useState('');

  const validateEmail = () => {
    if (email.trim() !== '') {
      if (isNaN(email)) {
        return true; // Email is valid
      } else {
        alert('Email should be a string and not just a number. Validation failed!');
        return false;
      }
    } else {
      alert('Email cannot be empty. Please provide a valid email.');
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate email here
    if (name === 'email') {
      setEmail(value);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email before submitting the form
    if (!validateEmail()) {
      return; // Stop form submission if email is not valid
    }

    try {
      const formDataObject = new FormData();
      formDataObject.append('email', formData.email);
      formDataObject.append('password', formData.password);

      const response = await axios.post('http://127.0.0.1:8000/api/login/', formDataObject, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      console.log('Logged in:', response.data);

      // Assuming the ID is retrieved from the response
      const lawyerId = response.data.user_id;
      
      // Save the lawyer ID to localStorage
      localStorage.setItem('lawyerId', response.data.user_id);

      // Redirect to the edit profile page with the lawyer ID as a query parameter
      navigate(`/editprofile?id=${lawyerId}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              name="email"
              placeholder='Email ID'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="forgot-password">
          don't have an account yet? <span><a href="/AvocateSign">Sign Up</a></span>
        </div>

        <div className="submit-container">
          <button type='submit' className="submit" onClick={validateEmail}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginAvocat;
