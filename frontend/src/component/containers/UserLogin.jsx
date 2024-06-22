import Footer from "../Footer";
import Navbar from "../NavBar";
import './User.css';
import LoginUser from "../user/LoginUser";

const UserLogin = () => {
    return ( 
        <div>
            <Navbar />
            <LoginUser/>
            <Footer/>
        </div>
     );
}
export default UserLogin;