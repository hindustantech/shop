import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { DataContext } from '../DataContext';


const SignUp = () => {
    const { data } = useContext(DataContext);
    const navigate = useNavigate();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [errors, setErrors] = useState({});

    const location = useLocation();

    const [sponcerMessage, setSponcerMessage] = useState('');
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

    const handleBlur = () => {
        const { sponcer_id } = formData;

        // Check if sponcer_id is set and data.getalluser is an array
        if (sponcer_id && data && Array.isArray(data.getalluser)) {
            // Use a flag to determine if the sponsor was found
            let sponsorFound = false;

            // Iterate over all users in the array
            data.getalluser.forEach((user) => {
                if (user.email === sponcer_id) {
                    sponsorFound = true; // Mark as found
                    setSponcerMessage(`Name: ${user.first_name}`); // Set the message with the found name
                    toast.success(`Sponsor found: ${sponcer_id}`); // Show success toast
                }
            });

            // If no sponsor was found after checking all users
            if (!sponsorFound) {
                setSponcerMessage('Sponsor not found.'); // Update message
                toast.error('Sponsor not found.'); // Show error toast
            }
        } else if (!sponcer_id) {
            setSponcerMessage('Please enter a Sponsor ID.'); // Handle case where no ID is entered
        }
    };

    // Form validation function

    const validateForm = () => {
        const newErrors = {};

        // Validate mobile number (10 digits)
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(formData.mobile)) {
            newErrors.mobile = 'Please enter a valid  number.';
        }

        // Validate password (at least 8 characters, 1 number, 1 uppercase, 1 lowercase, 1 special character)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 .';
        }

        // Validate password confirmation
        if (formData.password !== formData.pwd_open) {
            newErrors.pwd_open = 'Passwords do not match.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search); // Parse the query string
        const email = queryParams.get('email');
        // Get the email from the URL query parameter
        if (email) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                sponcer_id: email // Autofill sponcer_id with email from the URL
            }));
        }
    }, [location.search]);


    useEffect(() => {
        const { sponcer_id } = formData;

        // Check if sponcer_id is set and data is available
        if (sponcer_id && data && Array.isArray(data.getalluser)) {
            // Use a flag to determine if the sponsor was found
            let sponsorFound = false;

            // Iterate over all users in the array
            data.getalluser.forEach((user) => {
                if (user.email === sponcer_id) {
                    sponsorFound = true; // Mark as found
                    setSponcerMessage(`Name: ${user.first_name}`); // Set the message with the found name
                    toast.success(`Sponsor found: ${sponcer_id}`); // Show success toast
                }
            });

            // If no sponsor was found after checking all users
            if (!sponsorFound) {
                setSponcerMessage('Sponsor not found.'); // Update message
                toast.error('Sponsor not found.'); // Show error toast
            }
        } else if (!sponcer_id) {
            setSponcerMessage('Please enter a Sponsor ID.'); // Handle case where no ID is entered
        }
    }, [formData.sponcer_id, data]);



    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return; // Stop if form validation fails
        }

        try {
            // Store a success message in localStorage (or you can use state for this)

            // Prepare form data for sending
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }



            const res = await axios.post(`${apiBaseUrl}/register`, formData, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });

            const userDetails = res.data.user; // Ensure this matches your actual response structure

            if (userDetails) {
                // Display the email (as user ID) and temporary password
                toast.success(`Registration Successful! 
                    Your User ID: ${userDetails.email},
                    Your Password: ${userDetails.pwd_open}`, {
                    duration: 5000, // 5 seconds
                });
            } else {
                toast.error('User details not found in response!');
            }

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
                                onBlur={handleBlur}
                                value={formData.sponcer_id}
                                name='sponcer_id'
                                placeholder="Enter Your Refferal ID "
                                required
                            />
                            {errors.sponcer_id && <p>{errors.sponcer_id}</p>}

                        </div>
                        {sponcerMessage && <p className="text-success message-name-emai mb-0">{sponcerMessage}</p>}

                        <div className="mb-3 input-fi mt-2">
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

                        </div>
                        {errors.mobile && <p className="text-danger" style={{ fontSize: "16px" }}>{errors.mobile}</p>}
                        <div className="mb-3 input-fi">
                            <img src="/asset/design/profile/5.png" className='logo-e' alt="" />
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
                            <img src="/asset/design/profile/3.png" className='logo-e' alt="" />
                            <input
                                type="password"
                                className="password login-color input-login"
                                onChange={handleChange}
                                value={formData.password}
                                name="password"
                                placeholder=" Enter Password"
                                required
                            />

                        </div>
                        {errors.password && <p className="text-danger" style={{ fontSize: "16px" }}>{errors.password}</p>}
                        <div className="mb-3 input-fi">
                            <img src="/asset/design/profile/3.png" className='logo-e' alt="" />
                            <input
                                type="password"
                                className="password login-color input-login"
                                onChange={handleChange}
                                value={formData.pwd_open}
                                name="pwd_open"
                                placeholder="confirm Password"
                                required
                            />

                        </div>
                        {errors.pwd_open && <p className="text-danger" style={{ fontSize: "16px" }}>{errors.pwd_open}</p>}
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

                        <button type="submit" className="btn-color  mt-2">Sign up<i className="fas fa-arrow-right mx-3"></i></button>
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
