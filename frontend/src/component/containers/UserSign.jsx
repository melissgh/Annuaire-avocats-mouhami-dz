import Footer from "../Footer";
import Navbar from "../NavBar";
import './User.css';
import SignupUser from "../user/SignupUser";

const UserSign = () => {
    return ( 
        <div>
            <Navbar />
            <SignupUser/>
            <Footer/>
        </div>
     );
}
export default UserSign;