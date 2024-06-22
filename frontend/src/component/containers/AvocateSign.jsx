import Footer from "../Footer";
import Navbar from "../NavBar";
import './Avocate.css';

import SignUpAvocat from "../avocat/SignUpAvocat";

const AvocateSign = () => {
    return ( 
        <div>
            <Navbar />
            <SignUpAvocat/>
            <Footer/>
        </div>
     );
}
export default AvocateSign;