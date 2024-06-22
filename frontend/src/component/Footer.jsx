import React from 'react';
import './Footer.css'; 
import { FaInstagram , FaFacebook,FaTwitter} from "react-icons/fa6";
import avocat from './pic/avocat.jpg';
import Muhami from './pic/mouhamidz-high-resolution-logo-transparent.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="inner-container">
        <div className="column">
         <h3><a href="./Home"><img src={Muhami}/></a></h3>
          <p>À propos de notre entreprise et de notre mission.</p>
        </div>
        <div className="column">
          <h3>Liens rapides</h3>
          <ul className="link-list">
            <li><a href="/">Accueil</a></li>
            <li><a href="/about">À propos de nous</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contactez-nous</a></li>
          </ul>
        </div>
        <div className="column">
          <h3>Contact</h3>
          <p>Email: company@mouhami.dz</p>
          <p>Téléphone: +2135678932</p>
         <a href="#"><FaInstagram/></a>
          <a href="#">< FaFacebook/></a>
          <a href="#"><FaTwitter/></a>
          
        </div>
      </div>
      <div className="copy-right">
        <p>&copy; {new Date().getFullYear()} Mouhami DZ</p>
      </div>
    </footer>
  );
};

export default Footer;