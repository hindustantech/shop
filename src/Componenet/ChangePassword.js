import React, { useState } from 'react';
import axios from 'axios';
import Headers from './Headers';
import toast from 'react-hot-toast';

const ChangePassword = () => {
    const [error, setError] = useState(null);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Retrieve the id from localStorage when the component mounts
    const id = localStorage.getItem('id');
    
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: '',
    });

    // State to track password visibility
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password length (at least 8 characters)
        if (formData.new_password.length < 8) {
            setError("New password must be at least 8 characters long.");
            return;
        }

        // Validate if new password and confirm password match
        if (formData.new_password !== formData.confirm_password) {
            setError("New password and confirm password do not match.");
            return;
        }

        try {
            await axios.post(`${apiBaseUrl}/changePassword/${id}`, {
                old_password: formData.old_password,
                new_password: formData.new_password,
                confirm_password: formData.confirm_password
            });

            toast.success('Password changed successfully');
        } catch (error) {
            toast.error('Error changing password. Please try again.');
        }
    };

    return (
        <>
            <Headers Name="Change Password" />
            <div className="main-body-change-password">
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-md-6 text-center">
                        <img src="/asset/design/c.png" alt="" className="img-fluid" />
                    </div>
                </div>

                <form className='loginForm' onSubmit={handleSubmit}>
                    <div className="mb-3 input-fi">
                        <input
                            type={showPassword.old ? "text" : "password"}
                            className="text login-color input-login"
                            name="old_password"
                            placeholder="Existing password"
                            value={formData.old_password}
                            onChange={handleChange}
                            required
                        />
                        <i 
                            className={`fa ${showPassword.old ? "fa-eye-slash" : "fa-eye"}`} 
                            onClick={() => togglePasswordVisibility('old')}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </div>
                    <div className="mb-3 input-fi">
                        <input
                            type={showPassword.new ? "text" : "password"}
                            className="text login-color input-login"
                            name="new_password"
                            placeholder="New password"
                            value={formData.new_password}
                            onChange={handleChange}
                            required
                        />
                        <i 
                            className={`fa ${showPassword.new ? "fa-eye-slash" : "fa-eye"}`} 
                            onClick={() => togglePasswordVisibility('new')}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </div>
                    <div className="mb-3 input-fi">
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            className="text login-color input-login"
                            name="confirm_password"
                            placeholder="Confirm new password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            required
                        />
                        <i 
                            className={`fa ${showPassword.confirm ? "fa-eye-slash" : "fa-eye"}`} 
                            onClick={() => togglePasswordVisibility('confirm')}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </div>
                    {error && <div className="text-danger">{error}</div>}
                    <button type="submit" className="change_password_btn_color mt-3">Change Password</button>
                </form>
            </div>
        </>
    );
};

export default ChangePassword;
