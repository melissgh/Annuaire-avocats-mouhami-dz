import Footer from "../Footer";
import Navbar from "../NavBar";
import './Avocate.css';
import LoginAvocat from "../avocat/loginAvocat";

const Avocate = () => {
    return ( 
        <div>
            <Navbar />
            <LoginAvocat/>
            <Footer/>
        </div>
     );
}
export default Avocate;