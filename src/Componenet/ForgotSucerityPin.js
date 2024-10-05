import React, { useState } from 'react';
import Headers from './Headers';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ForgotSecurity = () => {
    const [id, setId] = useState('');  // State to hold the ID
    const [email, setEmail] = useState(''); // State to hold the email

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const location = useLocation();

    // Extract additional parameters from URL if needed
    const params = new URLSearchParams(location.search);
    const additionalParam = params.get('additionalParam'); // Example parameter from URL

    const handleIdChange = (e) => {
        setId(e.target.value); // Update ID state when input changes
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value); // Update email state when input changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send POST request with email and id
            await axios.post(`${apiBaseUrl}/forgot_pin`, { email, id });

            toast.success('OTP sent successfully to your email!');
            // Pass the email and any additional parameters to the OTP page via URL parameters
            navigate(`/OTP2?email=${encodeURIComponent(email)}`);

        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error('Failed to send OTP. Please check your email and ID.');
        }
    };

    return (
        <>
            <Headers Name="Forgot Security PIN" />
            <div className="main-body-change-password">
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-md-6 text-center">
                        <img src="/asset/design/f.jpeg" alt="" className="img-fluid" />
                    </div>
                </div>

                <form className='loginForm' onSubmit={handleSubmit}>
                    <div className="mb-3 input-fi">
                        <input
                            type="text"
                            className="text login-color input-login"
                            name='id'
                            placeholder="ID Number"
                            onChange={handleIdChange} // Update ID state on change
                            value={id} // Bind ID state to input value
                            required
                        />
                    </div>
                    <div className="mb-3 input-fi">
                        <input
                            type="email" // Change to email type for better validation
                            className="text login-color input-login"
                            name='email'
                            placeholder="Enter your email"
                            onChange={handleEmailChange} // Update email state on change
                            value={email} // Bind email state to input value
                            required
                        />
                    </div>
                    <button type="submit" className="change_password_btn_color mt-2 px-4 w-100">Change Security PIN</button>
                </form>
            </div>
        </>
    );
};

export default ForgotSecurity;
