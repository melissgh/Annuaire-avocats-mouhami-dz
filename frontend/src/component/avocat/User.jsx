import React, { useEffect, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './User.css';

const User = () => {
    const [csrfToken, setCsrfToken] = useState(null);

    useEffect(() => {
        const getCookie = (name) => {
            const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
            return cookieValue ? cookieValue.pop() : null;
        };

        const token = getCookie('csrftoken');
        setCsrfToken(token);
    }, []);

    const handleLoginSuccess = async (credentialResponse) => {
        if (credentialResponse && credentialResponse.tokenId) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/auth/google/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken || '',
                    },
                    body: JSON.stringify({
                        idToken: credentialResponse.tokenId,
                    }),
                    credentials: 'include',
                });

                console.log('Payload:', credentialResponse);
                console.log('idToken:', credentialResponse.tokenId);
                console.log('CSRF Token:', csrfToken);

                if (response.ok) {
                    console.log('Login successful');
                } else {
                    console.log('Login failed on the backend');
                }
            } catch (error) {
                console.error('Error during authentication:', error);
            }
        } else {
            console.log('TokenId is undefined in credentialResponse.');
        }
    };

    const handleLoginError = () => {
        console.log('Login Failed');
    };

    return (
        <div className='container-main'>
           
            <GoogleOAuthProvider clientId="743505389927-hjfqqjm0hf0cvh4r1sc9icuu5qscq84f.apps.googleusercontent.com">
               

                <div className='google-login-container'>
                    <GoogleLogin
                        className='google-login-button'
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                    />
                </div>
            </GoogleOAuthProvider>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
         
        </div>
    );
};

export default User;
