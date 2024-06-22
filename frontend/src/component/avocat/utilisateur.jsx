import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Navbar from '../NavBar';

const Utilisateur = () => {
    const responseGoogle = (response) => {
        console.log(response);
    };

    return (
        <div className='container-main'>
            <Navbar />
            <GoogleLogin
                clientId="743505389927-hjfqqjm0hf0cvh4r1sc9icuu5qscq84f.apps.googleusercontent.com"
                buttonText="Join with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Utilisateur;
