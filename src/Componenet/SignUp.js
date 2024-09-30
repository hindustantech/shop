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
   

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        
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
