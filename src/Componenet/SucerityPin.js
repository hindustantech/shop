import React, { useRef, useState } from 'react';
import axios from 'axios';
import Headers from './Headers';
import toast from 'react-hot-toast';

const SucerityPin = () => {
    // Create refs for each input field
    const oldPinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const newPinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const confirmPinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    // State to hold the PIN values
    const [pinData, setPinData] = useState({
        old_pin: '',
        new_pin: '',
        confirm_pin: '',
    });

    // Retrieve the id from localStorage
    const id = localStorage.getItem('id');
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
   

    // Function to handle input change and move focus
    const handleInputChange = (e, index, refs, type) => {
        const value = e.target.value;
        
        // Update pinData state based on input type
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
        
        // Validate if new pin and confirm pin match
        if (pinData.new_pin !== pinData.confirm_pin) {
            toast.error("New PIN and Confirm PIN do not match.");
            return;
        }

        try {
            await axios.post(`${apiBaseUrl}/changePin/${id}`, {
                old_pin: pinData.old_pin,
                new_pin: pinData.new_pin,
                confirm_pin: pinData.confirm_pin
            });

            toast.success('PIN changed successfully');
        } catch (error) {
            toast.error('Error changing PIN. Please try again.');
        }
    };

    return (
        <>
            <Headers Name="Security Pin" />

            <div className="main-body-change-password">
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-md-6 text-center">
                        <img src="/asset/design/s.png" alt="" className="img-fluid" />
                    </div>
                </div>

                <form className='loginForm' onSubmit={handleSubmit}>
                    {/* Old Security PIN */}
                    <p className='px-3 mb-1 security-p'>Old Security PIN</p>
                    <div className="mb-3 security-pin-input d-flex justify-content-center align-items-center">
                        {oldPinRefs.map((ref, index) => (
                            <input
                                key={index}
                                type="text"
                                className="text-otp mx-2"
                                maxLength="1"
                                ref={ref}
                                onKeyUp={(e) => handleInputChange(e, index, oldPinRefs, 'old_pin')}
                                required
                            />
                        ))}
                    </div>

                    {/* New Security PIN */}
                    <p className='px-3 mb-1 security-p'>New Security PIN *</p>
                    <div className="mb-3 security-pin-input d-flex justify-content-center align-items-center">
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

                    {/* Confirm Security PIN */}
                    <p className='px-3 mb-1 security-p'>Confirm Security PIN *</p>
                    <div className="mb-3 security-pin-input d-flex justify-content-center align-items-center">
                        {confirmPinRefs.map((ref, index) => (
                            <input
                                key={index}
                                type="text"
                                className="text-otp mx-2"
                                maxLength="1"
                                ref={ref}
                                onKeyUp={(e) => handleInputChange(e, index, confirmPinRefs, 'confirm_pin')}
                                required
                            />
                        ))}
                    </div>

                    <button type="submit" className="change_password_btn_color mt-2">Validate PIN</button>
                </form>
            </div>
        </>
    );
};

export default SucerityPin;
