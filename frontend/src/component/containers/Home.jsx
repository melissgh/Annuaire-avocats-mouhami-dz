import Navbar from "../NavBar";
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n'; 
import './Home.css';
import lawyer_icon from '../pic/lawyer.jpg';
import {CiBank} from 'react-icons/ci';
import { GoLaw } from "react-icons/go";
import { BsFillAwardFill } from "react-icons/bs";
import law_icon from '../pic/law.jpg';
import team_one from '../pic/team1.jpg';
import team_two from '../pic/team2.jpg';
import home from '../pic/homee.JPG';
import team_three from '../pic/team3.jpg';
import { MdChat } from "react-icons/md";
import { MdOutlineMiscellaneousServices, MdMediation,MdOutlineFamilyRestroom  } from "react-icons/md";
import { RiCriminalFill } from "react-icons/ri";
import { GiDiscussion } from "react-icons/gi";
import { GrUserPolice } from "react-icons/gr";
import { FaHandshake } from "react-icons/fa6";
import Footer from "../Footer";
import picturehome from '../pic/finlaw.jpg';
import pichome from '../pic/homee.JPG';




const Home = () => {
   const { t } = useTranslation();
   const changeLanguage = (lng) => {
       console.log('Changing language to:', lng);
       i18n.changeLanguage(lng);
   };
    return ( 
       
        <main>
         <Navbar/>
         <button onClick={() => changeLanguage('fr')} className='translate'>French</button>
        <button onClick={() => changeLanguage('ar')} className='translate'>العربية</button>
         <section id="home">
            <div className="home">
              <div className="my-pic">
                <img src={pichome} />
              </div>
           </div>
         </section>
           <section id="services">
             
             <div className="cards">             
                  <div className="card-one">
                     <CiBank/>
                     <h1>La faillite</h1>
                     <span>----</span>
                     <p>Surmontez les difficultés financières avec notre expertise en droit de la faillite, offrant des conseils éclairés et des solutions adaptées à votre situation.</p>
                  </div>
                  <div className="card-two">
                     <GoLaw/>
                     <h1>Modifications</h1>
                     <span>----</span>
                     <p>Effectuez des modifications en toute confiance avec notre assistance, garantissant des ajustements précis et conformes à vos besoins spécifiques.</p>
                  </div>
                  <div className="card-three">
                     <BsFillAwardFill/>
                     <h1>Forclusion</h1>
                     <span>----</span>
                     <p>Naviguez avec assurance à travers les complexités de la forclusion avec notre équipe d'experts juridiques, prête à vous guider vers des solutions éclairées.</p>
                 </div>
              </div>
           </section>
           <section id="about">
            <div className="aboutus">
                <div className="us">
                    <img src={law_icon} alt="" />
                </div>
                <div className="about">
                    <h2>Qui nous sommes</h2>
                   <h3>À propos de DZ-Mouhami</h3>
                    <h5>DZ-Mouhami, votre partenaire juridique de confiance, est un site d'avocat dédié à fournir des services juridiques de qualité.</h5>
                    <p>Notre équipe d'avocats expérimentés s'engage à vous offrir des conseils spécialisés et une représentation solide. Que vous ayez des préoccupations familiales, des questions criminelles ou des défis financiers, nous sommes là pour vous accompagner à chaque étape. Explorez notre site pour découvrir nos domaines d'expertise et la manière dont nous pouvons vous aider à résoudre vos problèmes juridiques avec professionnalisme et efficacité.</p>
                    <br/><br /><br /><br />
                  <hr className="line" />

                  
              </div>
            </div>
           </section>
           
         <section id="servicess">
             <h2>Our Services</h2>
             <div className="cards">             
                  <div className="card-one">
                     <MdChat/>
                     <h1>CONSEIL GRATUIT</h1>
                     <span>----</span>
                     <p>Bénéficiez d'un conseil gratuit de qualité, notre engagement envers vous pour vous offrir l'assistance dont vous avez besoin sans frais initiaux.</p>
                  </div>
                  <div className="card-two">
                     <MdOutlineMiscellaneousServices/>
                     <h1>SERVICES SPÉCIAUX</h1>
                     <span>----</span>
                     <p>Explorez nos services spéciaux, une offre sur mesure pour des solutions uniques.</p>
                  </div>
                  <div className="card-three">
                     <GiDiscussion/>
                     <h1>DISCUTER DE STRATÉGIE</h1>
                     <span>----</span>
                     <p>Entamons la discussion sur votre stratégie, pour façonner ensemble la voie vers votre succès.</p>
                 </div>
                 <div className="card-one">
                     <GrUserPolice />
                     <h1>AVOCATS CIVILS</h1>
                     <span>----</span>
                     <p>Nos avocats civils dédiés sont là pour vous guider à travers les complexités du droit civil, assurant une représentation experte pour protéger vos intérêts.</p>
                 </div>
              </div> 
           </section>
           <section id="services">
             
             <div className="cards">             
                  <div className="card-one">
                     < MdMediation />
                     <h1>LA MÉDIATION</h1>
                     <span>----</span>
                     <p>Choisissez la médiation pour des solutions équitables et durables dans la résolution des conflits.</p>
                  </div>
                  <div className="card-two">
                    <MdOutlineFamilyRestroom/>
                     <h1>DIFFÉRENDS FAMILIAUX</h1>
                     <span>----</span>
                     <p>Abordez vos différends familiaux avec sensibilité et expertise, notre équipe d'avocats vous accompagne pour des solutions adaptées à vos besoins.</p>
                  </div>
                  <div className="card-three">
                     <RiCriminalFill/>
                     <h1>LES CRIMINELS</h1>
                     <span>----</span>
                     <p>Affrontez les enjeux criminels avec notre équipe d'avocats dévoués, prêts à vous défendre avec détermination et compétence.</p>
                 </div>
                 <div className="card-one">
                     <FaHandshake/>
                     <h1>LA FAILLITE</h1>
                     <span>----</span>
                     <p>Surmontez les difficultés financières avec notre assistance experte en droit de la faillite.</p>
                 </div>
              </div> 
           </section>
        
        <section id="contact">
        <div className="last">
           
            <div className="contactus">
             <h2>Entrer en contact</h2>
             <h1>Contactez-nous</h1>
             <input type="text" placeholder="Votre Nom" />
             <input type="email" placeholder="Votre Email" />
             <textarea id="message" name="message" placeholder="Entrer votre message ici" ></textarea>
             <button><a href="#">Envoyer Message</a></button>
            </div>
        </div>
        </section>
        <Footer/>
      </main>
  );
}
 
export default Home;