import React, { useState } from 'react';
import axios from 'axios';
import './SignUpAvocat.css';
import email_icon from '../pic/email.png'; 
import password_icon from '../pic/password.png';
import number_icon from '../pic/number.png';
import { useNavigate } from 'react-router-dom';

const SignUpAvocat = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    secondName: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.trim() !== '') {
      if (isNaN(email) && emailRegex.test(email)) {
        return true; // Email is valid
      } else {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Email not accepted. Validation failed!',
        }));
        return false;
      }
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email cannot be empty. Please provide a valid email.',
      }));
      return false;
    }
  };

  const validateName = (name, fieldName) => {
    const onlyLettersRegex = /^[A-Za-z]+$/;

    if (name.trim() !== '') {
      if (onlyLettersRegex.test(name)) {
        return true; // Name is valid
      } else {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `${fieldName} should contain only letters. Validation failed!`,
        }));
        return false;
      }
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `${fieldName} cannot be empty. Please provide a valid ${fieldName}.`,
      }));
      return false;
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const onlyNumbersRegex = /^[0-9+]+$/;

    if (phoneNumber.trim() !== '') {
      if (onlyNumbersRegex.test(phoneNumber)) {
        return true; // Phone number is valid
      } else {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: 'Phone number should contain only numeric characters. Validation failed!',
        }));
        return false;
      }
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: 'Phone number cannot be empty. Please provide a valid phone number.',
      }));
      return false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields before submitting the form
    const isEmailValid = validateEmail(formData.email);
    const isFirstNameValid = validateName(formData.firstName, 'firstName');
    const isSecondNameValid = validateName(formData.secondName, 'secondName');
    const isPhoneNumberValid = validatePhoneNumber(formData.phoneNumber);

    if (isEmailValid && isFirstNameValid && isSecondNameValid && isPhoneNumberValid) {
      try {
        const formDataObject = new FormData();
        formDataObject.append('firstName', formData.firstName);
        formDataObject.append('secondName', formData.secondName);
        formDataObject.append('phoneNumber', formData.phoneNumber);
        formDataObject.append('email', formData.email);
        formDataObject.append('password', formData.password);

        const response = await axios.post('http://127.0.0.1:8000/api/signup/', formDataObject, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }); 

        console.log('Signed up:', response.data);
        const lawyerId = response.data.user_id;
        localStorage.setItem('lawyerId', response.data.user_id);
        navigate(`/profil/${lawyerId}`);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              name='firstName'
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {validationErrors.firstName && <span className="error-message">{validationErrors.firstName}</span>}
          </div>

          <div className="input">
            <input
              type="text"
              name='secondName'
              placeholder='Second Name'
              value={formData.secondName}
              onChange={handleChange}
              required
            />
            {validationErrors.secondName && <span className="error-message">{validationErrors.secondName}</span>}
          </div>

          <div className="input">
            <img src={number_icon} alt="" />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {validationErrors.phoneNumber && <span className="error-message">{validationErrors.phoneNumber}</span>}
          </div>

          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              name='email'
              placeholder='Email ID'
              value={formData.email}
              onChange={handleChange}
              required
            />
            {validationErrors.email && <span className="error-message">{validationErrors.email}</span>}
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="forgot-password">
          Already have an account? <span><a href="/AvocateLogin">Login</a></span>
        </div>

        <div className="submit-container">
          <button type='submit' className="submit" >Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpAvocat;
