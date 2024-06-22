import React, {useState} from 'react'
import './LoginSignUpAvocat.css';
import email_icon from '../pic/email.png';
import password_icon from '../pic/password.png';
import number_icon from '../pic/number.png';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
const LogInSignUpAvocat = () => {

  const [action,setAction]=useState("Login");
  const [email, setEmail] = useState('');

  const validateEmail = () => {
    if (email.trim() !== '') {
        if (isNaN(email)) {
        
        } else {
         alert('Email should be a string and not just a number. Validation failed!');
        }
    } else {
        alert('Email cannot be empty. Please provide a valid email.');
    }
};
  const [name, setName] = useState('');
  const validatePrenom = () => {
    const onlyLettersRegex = /^[A-Za-z]+$/;
    if (name.trim() !== '') {
        if (onlyLettersRegex.test(name)) {
         
       } else {
         alert('Prenom should contain only letters. Validation failed!');
       }
    } else {
        alert('Prenom cannot be empty. Please provide a valid prenom.');
    }
}; 
 const [nom, setNom] = useState('');
  const validateNom = () => {
    const onlyLettersRegex = /^[A-Za-z]+$/;
   
    if (nom.trim() !== '') {
       if (onlyLettersRegex.test(nom)) {
         
       } else {
         alert('Nom should contain only letters. Validation failed!');
       }
    } else {
        alert('Nom cannot be empty. Please provide a valid Nom.');
    }
};
const [phoneNumber, setPhoneNumber] = useState('');

  const validatePhoneNumber = () => {
    const onlyNumbersRegex = /^[0-9+]+$/;

    if (phoneNumber.trim() !== '') {
      if (onlyNumbersRegex.test(phoneNumber)) {
    
      } else {
        alert('Phone number should contain only numeric characters. Validation failed!');
      }
    } else {
      alert('Phone number cannot be empty. Please provide a valid phone number.');
    }
  };
  const handleButtonClick = () => {
    // Call both validation functions
    validateNom();
    validatePrenom();
    validatePhoneNumber();
    validateEmail();
  };
  return (
    
     <div className='container'>
      <form action="" className="formulaire">
        <div className="header">
         <div className="text">{action}</div>
         <div className="underline"></div>
       </div>
    
        <div className="inputs">
          {action==="Login"?<div></div>:<div className="input">
              <input type="text" placeholder='Votre Nom'  value={nom}
        onChange={(e) => setNom(e.target.value)}
        required/>
            </div> 
            
            }
            {action==="Login"?<div></div>:<div className="input">
              <input type="text" placeholder='Votre Prenom'  value={name}
        onChange={(e) => setName(e.target.value)}
        required/>
            </div> 
            
            }
            {action==="Login"?<div></div>:<div className="input">
             <img src={number_icon} alt="" />
              <input type="text"  placeholder='Votre Numero de telephone' value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required/>
             
            </div>
            }

            

            <div className="input">
             <img src={email_icon} alt="" />
              <input type="email" placeholder='Votre Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
             
            </div>

            

            <div className="input">
              <img src={password_icon} alt="" />
             <input type="password" placeholder='Mot de passe' required/>
           </div>
          </div>
          {action==="Sign Up"? <div></div>: <div className="forgot-password">Mot de passe perdu ?<span><a href="#">Cliquer Ici</a></span></div>   }
      
          <div className="submit-container">
             {action === "Login" ? (
             <>
              <div className="submit gray" onClick={() => setAction("Sign Up")}><FaArrowLeft /></div>
          <button onClick={validateEmail}>Se Connecter</button>
        </>
      ) : null}

      {action === "Sign Up" ? (
        <>
          <button  onClick={handleButtonClick}>S'inscrire</button>
          <div className="submit gray" onClick={() => setAction("Login")} ><FaArrowRight /></div>
        </>
      ) : null}
    </div>
      </form>
     </div>
     
  
  )
}

export default LogInSignUpAvocat;
