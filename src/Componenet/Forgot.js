import React, { useState } from 'react'
import Headers from './Headers'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Forgot = () => {

    const [email, setEmail] = useState('');

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value); // Update email state when input changes
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${apiBaseUrl}/forgotpassword`, { email });

           
                toast.success('OTP sent successfully to your email!');
                // Pass the email to the OTP page via URL parameter
                navigate(`/OTP?email=${encodeURIComponent(email)}`);


           
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error('Failed to send OTP. Please check your email.');
        }
    };
    return (
        <>

            <Headers Name="Forgot Password" />
            <div className="main-body-change-password">
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-md-6 text-center">
                        <img src="/asset/design/4.png" alt="" className="img-fluid" />
                    </div>
                </div>


                <form className='loginForm' onSubmit={handleSubmit}  >
                    <div className="mb-3 input-fi">

                        <input
                            type="text"
                            className="text login-color input-login forgot-password"
                            name='email'
                            placeholder="Enter Your Email "
                            onClick={onchange}
                            onChange={handleChange}
                            value={email}
                            required
                        />
                    </div>

                    <button type="submit" className="change_password_btn_color mt-2 "> Change Password</button>

                </form>
            </div>
        </>
    )
}
