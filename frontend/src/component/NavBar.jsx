import React, { useRef, useState } from 'react';
import { FaBars, FaTimes, FaUser} from 'react-icons/fa';
import avocat from './pic/avocat.jpg'
import './NavBar.css';
import { Link } from "react-router-dom";
// import './avocat/LogInSignUpAvocat'; 
import Muhami from './pic/mouhamidz-high-resolution-logo-transparent.png'


function Navbar() {
  const lawyerId = localStorage.getItem("lawyerId");
  const navRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div id='font-nav'>
      <header>
        <h3><a href="/Home"><img src={Muhami}/></a></h3>
        <nav ref={navRef}>
         
          <a href="/Home">Accueil</a>
          
          <a href="/Lawyer">Avocats</a>
          <a href="/Home/#about">À propos</a>
          <a href="/Home/#servicess">Services</a>
          <a href="/Home/#contact">Contact</a>

          {/* Le bouton du menu déroulant */}
          <div className="dropdown" style={{ marginRight: "4.5%" }}>
          <span style={{ visibility: "hidden" }}>----</span>
            <button className="dropbtn" onClick={toggleDropdown}>
            
            <FaUser />

              {/* {isDropdownOpen ? <FaTimes /> : <FaBars />} */}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
              <a href="/AvocateSign">Avocat</a>
              <a href="/UserSign">Utilisateur</a>
              <Link to={`/editprofile?id=${lawyerId}`}>Modifier Profil</Link> 
              {/* <a href="/AdminDash">Admin</a> */}
              <a href="/Home">Deconnexion</a>
            </div>
            
            )}
          </div>

          {/* Ancien lien "Login/Sign Up" */}
          {/* <a href="./avocat/LogInSignUpAvocat">Login/Sign Up</a> */}

          {/* Au lieu du lien, vous pouvez inclure ici votre composant LogInSignUpAvocat */}
          {/* <LogInSignUpAvocat /> */}
          
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
             <FaTimes /> 
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
           <FaBars />
        </button>
      </header>
    </div>
  );
}

export default Navbar;