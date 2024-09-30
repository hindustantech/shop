import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const SignUp = () => {

    const navigate = useNavigate();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [errors, setErrors] = useState({});
    // State to store form data
    const [formData, setFormData] = useState({
        sponcer_id: "",
        country_code: "",
        mobile: "",
        name: "",
        email: "",
        password: "",
        pwd_open: "",
        is_active: ""

    });




    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    // Form validation function
    const validateFormData = () => {
        let validationErrors = {};
        const phonePattern = /^[0-9]{10,15}$/;
        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        // Validate sponsor_id (Required)
        if (!formData.sponcer_id.trim()) {
            validationErrors.sponcer_id = "Sponsor ID is required";
        }

        // Validate country_code (Required)
        if (!formData.country_code.trim()) {
            validationErrors.country_code = "Country code is required";
        }

        // Validate mobile (Required, should be a valid phone number)
        if (!formData.mobile.trim()) {
            validationErrors.mobile = "Mobile number is required";
        } else if (!phonePattern.test(formData.mobile)) {
            validationErrors.mobile = "Invalid mobile number";
        }

        // Validate name (Required, min 3 characters)
        if (!formData.name.trim()) {
            validationErrors.name = "Name is required";
        } else if (formData.name.length < 3) {
            validationErrors.name = "Name must be at least 3 characters long";
        }

        // Validate email (Required, should be a valid email)
        if (!formData.email.trim()) {
            validationErrors.email = "Email is required";
        } else if (!emailPattern.test(formData.email)) {
            validationErrors.email = "Invalid email format";
        }

        // Validate password (Required, min 6 characters)
        if (!formData.password.trim()) {
            validationErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters long";
        }

        // Validate pwd_open (Required and should match password)
        if (!formData.pwd_open.trim()) {
            validationErrors.pwd_open = "Password confirmation is required";
        } else if (formData.pwd_open !== formData.password) {
            validationErrors.pwd_open = "Passwords do not match";
        }

        // Validate is_active (Should be true or false)
        if (!formData.is_active.trim()) {
            validationErrors.is_active = "Active status is required";
        } else if (!["true", "false"].includes(formData.is_active.toLowerCase())) {
            validationErrors.is_active = "Active status must be 'true' or 'false'";
        }

        setErrors(validationErrors);

        // If there are no errors, return true
        return Object.keys(validationErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFormData()) {
            toast.error('Please fix the errors in the form');
            return;
        }
        try {
            // Store a success message in localStorage (or you can use state for this)

            // Prepare form data for sending
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }



            await axios.post(`${apiBaseUrl}/register`, formData, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });
            toast.success('Register Success!');

            // Redirect to homepage or login after successful registration
            navigate("/Login");

        } catch (error) {
            toast.error('Something went wrong!');
        }
    };

    return (
        <>
            <div className='green-box App'>
                <div className="register-from mx-auto">

                    <Link to="/">
                        <img src="/asset/design/2.png" className="img-fluid close-png" alt="" />
                    </Link>

                    <div className="row ">
                        <div className="col-12 ">
                            <h1 className="login-text mt-3">Sign Up</h1>
                            <img src="/asset/design/1.png" alt="Logo" className="logo me-2 logo-h login-logo mt-4" />
                        </div>
                    </div>

                    <div className="row justify-content-center mt-4">
                        <div className="col-12 col-md-6 text-center">
                            <img src="/asset/design/3.png" alt="" className="img-login " />
                        </div>
                    </div>


                    <form className='loginForm mt-4' onSubmit={handleSubmit}>
                        <div className="mb-3 input-fi">
                            <img src="/asset/logo/7.png" className='logo-e' alt="" />
                            <input
                                type="text"
                                className="text login-color input-login"
                                onChange={handleChange}
                                value={formData.sponcer_id}
                                name='sponcer_id'
                                placeholder="Enter Your Refferal ID "
                                required
                            />
                            {errors.sponcer_id && <p>{errors.sponcer_id}</p>}

                        </div>

                        <div className="mb-3 input-fi">
                            <img src="/asset/logo/7.png" className='logo-e' alt="" />
                            <input
                                type="text"
                                className="text login-color input-login"
                                onChange={handleChange}
                                value={formData.name}
                                name='name'
                                placeholder="Enter Your Name"
                                required
                            />
                            {errors.name && <p>{errors.name}</p>}

                        </div>

                        <div className="mb-3 input-fi">

                            <i className="fa fa-phone" aria-hidden="true"></i>

                            <input
                                className='contory-code'
                                type="text"
                                name="country_code"
                                onChange={handleChange}
                                value={formData.country_code}
                                placeholder='+91' />
                            <input
                                type="text"
                                className="text login-color input-login mx-2"
                                onChange={handleChange}
                                value={formData.mobile}
                                name='mobile'
                                placeholder="Enter Your Mobile Number"
                                required
                            />
                            {errors.country_code && <p>{errors.country_code}</p>}
                        </div>

                        <div className="mb-3 input-fi">
                            <img src="/asset/logo/1.png" className='logo-e' alt="" />
                            <input
                                type="email"
                                className="email login-color input-login"
                                onChange={handleChange}
                                value={formData.email}
                                name='email'
                                placeholder=" Enter Your Email"
                                required
                            />
                            {errors.sponcer_id && <p>{errors.sponcer_id}</p>}
                        </div>

                        <div className="mb-3 input-fi">
                            <img src="/asset/logo/1.png" className='logo-e' alt="" />
                            <input
                                type="password"
                                className="password login-color input-login"
                                onChange={handleChange}
                                value={formData.password}
                                name="password"
                                placeholder=" Enter Password"
                                required
                            />
                            {errors.password && <p>{errors.password}</p>}
                        </div>
                        <div className="mb-3 input-fi">
                            <img src="/asset/logo/1.png" className='logo-e' alt="" />
                            <input
                                type="password"
                                className="password login-color input-login"
                                onChange={handleChange}
                                value={formData.pwd_open}
                                name="pwd_open"
                                placeholder="confirm Password"
                                required
                            />
                            {errors.pwd_open && <p>{errors.pwd_open}</p>}
                        </div>
                        <div className="d-flex justify-content-center">

                            <input
                                type="checkbox"
                                className='mx-2'
                                name="is_active"
                                onChange={handleChange}
                                value={formData.is_active}
                                id=""
                            />
                            <p className='text-white'> I agree to all terms & condition </p>
                        </div>

                        <button type="submit" className="btn-color btn  mt-2">Sign up<i className="fas fa-arrow-right mx-3"></i></button>
                    </form>

                    <div className='d-flex justify-content-center mt-1'>
                        <p className='text-white mb-4 mx-2'>Already Registered?</p>
                        <span>
                            <NavLink to="/Login" className='text-white fw-bold text-decoration-none '> Sign in </NavLink>
                        </span>
                    </div>
                </div>



            </div>
        </>
    );
};

export default SignUp;
