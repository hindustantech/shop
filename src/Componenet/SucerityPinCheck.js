import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Headers from './Headers';
import { useLocation, useNavigate } from 'react-router-dom';

const SucerityPinCheck = () => {
    const newPinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const [pinData, setPinData] = useState({
        new_pin: '', // Holds the new PIN
        email: ''
    });

    const id = localStorage.getItem('id'); // Get user ID from localStorage
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Retrieve email and target page from URL parameters
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const targetPage = params.get('target') || '/dashboard'; // Default target page

    const navigate = useNavigate(); // Initialize navigation hook

    // Set email in state if available
    useEffect(() => {
        if (email) {
            setPinData(prev => ({ ...prev, email }));
        }
    }, [email]);

    // Handle input change and focus management
    const handleInputChange = (e, index) => {
        const value = e.target.value;

        // Update pinData state for new PIN
        setPinData(prev => ({
            ...prev,
            new_pin: prev.new_pin.substring(0, index) + value + prev.new_pin.substring(index + 1),
        }));

        // Focus on the next input if a digit is entered
        if (value.length === 1 && index < newPinRefs.length - 1) {
            newPinRefs[index + 1].current.focus();
        }

        // Focus back on the previous input on backspace
        if (e.key === 'Backspace' && index > 0 && value.length === 0) {
            newPinRefs[index - 1].current.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate if new PIN is exactly 4 digits
        if (pinData.new_pin.length !== 4) {
            toast.error('Please enter a 4-digit PIN.');
            return;
        }

        try {
            const response = await axios.post(`${apiBaseUrl}/check`, {
                check_pin: pinData.new_pin,
                id,
                email: pinData.email
            });

            // On success, navigate to the target page
            if (response.data.success) {
                toast.success('PIN reset successfully');
                navigate(targetPage);
            } else {
                toast.error('Invalid PIN. Please try again.');
            }

        } catch (error) {
            toast.error('Error resetting PIN. Please try again.');
        }
    };

    return (
        <>
            <Headers Name="Reset PIN" />

            <div className="main-body-change-password">
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-md-6 text-center">
                        <img src="/asset/design/s.png" alt="Reset PIN" className="img-fluid" />
                    </div>
                </div>

                <form className='loginForm' onSubmit={handleSubmit}>
                    <p className='px-5 mt-4 mb-1 security-p'>New Security PIN *</p>
                    <div className="mb-3 mt-4 security-pin-input d-flex justify-content-center align-items-center">
                        {newPinRefs.map((ref, index) => (
                            <input
                                key={index}
                                type="text"
                                className="text-otp mx-2"
                                maxLength="1"
                                ref={ref}
                                onKeyUp={(e) => handleInputChange(e, index)}
                                required
                            />
                        ))}
                    </div>

                    <button type="submit" className="change_password_btn_color mt-2 px-4">Reset PIN</button>
                </form>
            </div>
        </>
    );
};

export default SucerityPinCheck;
