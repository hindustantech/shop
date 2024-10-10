import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Headers from './Headers';

const OTPC = () => {
  const [otp, setOtp] = useState('');
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  // Using useLocation to get the email from URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email'); // Retrieve the email from the URL

  // Create refs for each input field
  const confirmPinRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Handle OTP input
  const handleInputChange = (e, index, refs) => {
    const value = e.target.value;

    // Ensure only numbers are allowed
    if (!/^\d*$/.test(value)) {
      e.target.value = ''; // Clear invalid input
      return;
    }

    // Update OTP state
    const newOtp = otp.split(''); // Convert string to array
    newOtp[index] = value; // Update the current index with the entered value
    setOtp(newOtp.join(''));

    // Move focus to the next input if a number is entered
    if (value.length === 1 && index < refs.length - 1) {
      refs[index + 1].current.focus();
    }

    // Move focus back on backspace
    if (e.key === 'Backspace' && index > 0 && value.length === 0) {
      refs[index - 1].current.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('otp', otp);
      formDataToSend.append('email', email);

      await axios.post(`${apiBaseUrl}/checkOtp`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Redirect to the Forgot_Spin page with the email query parameter
      navigate(`/Forgot_Spin?email=${encodeURIComponent(email)}`);
    
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Error verifying OTP, please try again.');
    }
  };

  // Handle paste event for pasting the entire OTP
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    confirmPinRefs.forEach((ref, i) => {
      ref.current.value = pastedData[i] || '';
    });

    // Update OTP state
    setOtp(pastedData);

    // Move focus to the last input field if pasted data is complete
    confirmPinRefs[pastedData.length - 1]?.current.focus();
  };

  return (
    <>
      <Headers Name="Otp" />

      <div className="main-body-change-password">
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-md-6 text-center">
            <img src="/asset/design/s.png" alt="" className="img-fluid" />
          </div>
        </div>

        <form className="loginForm" onSubmit={handleSubmit}>
          <p className="security-p mb-4 text-center">Enter Your Otp*</p>
          <div className="mb-3 mx-4 security-pin-input d-flex justify-content-center align-items-center">
            {confirmPinRefs.map((ref, index) => (
              <input
                key={index}
                type="text"
                className="text-otp-forgot mx-2"
                maxLength="1"
                ref={ref}
                onKeyUp={(e) => handleInputChange(e, index, confirmPinRefs)}
                onPaste={handlePaste} // Handle paste event
                required
              />
            ))}
          </div>

          <button type="submit" className="change_password_btn_color mt-2 w-100">Validate OTP</button>
        </form>

      </div>
    </>
  );
};

export default OTPC;
