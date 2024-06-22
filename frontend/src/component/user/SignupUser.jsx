import React, { useState } from 'react';
import axios from 'axios';
import './userSignup.css';
import email_icon from '../pic/email.png';
import password_icon from '../pic/password.png';
import { useNavigate } from 'react-router-dom';
import User from "../avocat/User";

const SignupUser = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '', 
    clientEmail: '', 
    clientPassword: '', 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObject = new FormData();
      formDataObject.append('clientName', formData.clientName);
      formDataObject.append('clientEmail', formData.clientEmail);
      formDataObject.append('clientPassword', formData.clientPassword); 

      const response = await axios.post('http://127.0.0.1:8000/api/signupUser/', formDataObject, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        } 
      });
      console.log('Signed up:', response.data);
      localStorage.setItem('userId', response.data.user_id); //stocker l'id du client 
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Sign Up User</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="text" name="clientName" placeholder='Client Name' value={formData.clientName} onChange={handleChange} />
          </div>

          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" name="clientEmail" placeholder='Email ID' value={formData.clientEmail} onChange={handleChange} />
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" name="clientPassword" placeholder='Password' value={formData.clientPassword} onChange={handleChange} />
          </div>
        </div>

        <div className="forgot-password">
          J'ai déjà un compte <span>
           
            <a href="./UserLogin">Login</a></span>
        </div>
        <div className="user" style={{ margin: "20px 0" }}>
         <User/>
        </div>  
        <div className="submit-container">
          <button type='submit' className="submit" style={{ margin: "-60% 20%" }}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupUser;
