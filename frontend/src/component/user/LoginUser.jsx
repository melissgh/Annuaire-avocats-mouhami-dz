import React, { useState } from 'react';
import axios from 'axios';
import './userlogin.css';
import email_icon from '../pic/email.png';
import password_icon from '../pic/password.png';
import { useNavigate } from 'react-router-dom'; // Import de useHistory depuis react-router-dom
import User from "../avocat/User";


const LoginUser = () => {
  let navigate = useNavigate(); // Use useNavigate to get navigation functionality
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObject = new FormData();
      formDataObject.append('clientEmail', formData.email);
      formDataObject.append('clientPassword', formData.password);


      const response = await axios.post('http://127.0.0.1:8000/api/loginUser/', formDataObject, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      console.log('Logged in:', response.data);

      localStorage.setItem('userId', response.data.user_id);
       //stocker l'id du client 

      //  localStorage.setItem('userId', null);

     navigate(`/`); 
 
    
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
          
          <div className="header">
            <div className="text">Login User</div>
            <div className="underline"></div>
          </div>
    
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" name="email" placeholder='Email ID' value={formData.email} onChange={handleChange} />
              </div>
    
              <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
              </div>
            </div>
            
            <div className="forgot-password">
              don't have an account yet? <span><a href="/UserSign">Sign Up</a></span>
            </div>
            <div className="user" style={{ margin: "20px 0" }}>
             <User/>
            </div>
            <div className="submit-container">
             
              <button type='submit' className="submit" style={{ margin: "-60% 20%" }}>Login</button>
              
            </div>
            
          </form>
          
        </div>
  );
}

export default LoginUser;