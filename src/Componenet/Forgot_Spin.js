import React, { useRef, useState } from 'react';
import axios from 'axios';
import Headers from './Headers';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate

const Forgot_Spin = () => {
    // Create refs for each input field for new PIN
    const newPinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    // State to hold the new PIN values and email
    const [pinData, setPinData] = useState({
        new_pin: '',
        email: ''
    });

    // Retrieve the id from localStorage
    const id = localStorage.getItem('id');
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Retrieve the email from URL parameters
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const email = params.get('email'); // Retrieve the email

    // Navigation hook
    const navigate = useNavigate(); // Initialize useNavigate

    // Set email in state
    React.useEffect(() => {
        if (email) {
            setPinData((prev) => ({ ...prev, email }));
        }
    }, [email]);

    // Function to handle input change and move focus
    const handleInputChange = (e, index, refs, type) => {
        const value = e.target.value;

        // Update pinData state for new PIN
        setPinData((prev) => ({
            ...prev,
            [type]: prev[type].substring(0, index) + value + prev[type].substring(index + 1),
        }));

        // Move focus to the next input if a number is entered
        if (value.length === 1 && index < refs.length - 1) {
            refs[index + 1].current.focus();
        }

        // Move focus back on backspace
        if (e.key === 'Backspace' && index > 0 && value.length === 0) {
            refs[index - 1].current.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate if new pin is provided
        if (pinData.new_pin.length < 4) {
            toast.error("New PIN must be 4 digits long.");
            return;
        }

        try {
            await axios.post(`${apiBaseUrl}/resetPin`, {
                new_pin: pinData.new_pin,
                email: pinData.email, // Include email in the payload
                id
            });

            toast.success('PIN reset successfully');

            // Navigate to home page after success
            navigate('/'); // Redirect to home page

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
                        <img src="/asset/design/s.png" alt="" className="img-fluid" />
                    </div>
                </div>

                <form className='loginForm' onSubmit={handleSubmit}>

                    {/* New Security PIN */}
                    <p className='px-5 mt-4 mb-1 security-p'>New Security PIN *</p>
                    <div className="mb-3 mt-4 security-pin-input d-flex justify-content-center align-items-center">
                        {newPinRefs.map((ref, index) => (
                            <input
                                key={index}
                                type="text"
                                className="text-otp mx-2"
                                maxLength="1"
                                ref={ref}
                                onKeyUp={(e) => handleInputChange(e, index, newPinRefs, 'new_pin')}
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

export default Forgot_Spin;
