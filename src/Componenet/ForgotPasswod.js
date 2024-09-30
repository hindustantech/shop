import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Headers from './Headers'
const ForgotPasswod = () => {
  
  
    const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
  
   

    // Using useLocation to get the email from URL
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const email = params.get('email');

    // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // Handle form submission for resetting password
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Check if the passwords match
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
  
      try {
        const resetPasswordData = new FormData();
        resetPasswordData.append('email', email);
        resetPasswordData.append('newPassword', formData.newPassword);
  
        // API call to reset the password
       await axios.post(`${apiBaseUrl}/reset_password`, resetPasswordData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        toast.success('Password reset successfully!');
        navigate('/Login');
  
      } catch (error) {
        console.error('Error resetting password:', error);
        toast.error('Error resetting password, please try again.');
      }
    };
  
    return (
        <>
          <Headers Name="Change Password" />
          <div className="main-body-change-password">
            <div className="row justify-content-center mt-4">
              <div className="col-12 col-md-6 text-center">
                <img src="/asset/design/4.png" alt="" className="img-fluid" />
              </div>
            </div>
    
    
            <form className='loginForm ' onSubmit={handleSubmit} >
              <div className="mb-3 input-fi">
    
                <input
                  type="text"
                  className="text login-color input-login"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
    
                  required
                />
              </div>
              <div className="mb-3 input-fi">
    
                <input
                  type="text"
                  className="text login-color input-login"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" className="change_password_btn_color mt-3 "> change Password</button>
    
            </form>
          </div>
        </>
    
  )
}

export default ForgotPasswod