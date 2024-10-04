import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem(
        "modalMessage4",
        JSON.stringify({
          title: "Login successfully",
          content: "You have logged in successfully",
        })
      );

      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(`${apiBaseUrl}/login`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
        },
      });

      const token = response.data.token;
      const id = response.data.user_id;

      // Store the token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      toast.success('Login successfully!');
      navigate("/");
    } catch (error) {
      toast.error('Login Failed');
    }
  };

  const fetchData = async () => {
    try {
      const id = localStorage.getItem("id");
      const response = await axios.get(`${apiBaseUrl}/homepageapi/${id}`);
      setData(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className='green-box'>
        <div className="login-container mx-auto">
          <Link to="/">
            <img src="/asset/design/2.png" className="img-fluid close-png" alt="" />
          </Link>
          <div className="row mt-4">
            <div className="col-12 ">
              <h1 className="login-text mt-3">Login</h1>
              <img src="/asset/design/1.png" alt="Logo" className="logo me-2 logo-h login-logo mt-4" />
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-12 col-md-6 text-center">
              <img src="/asset/design/3.png" alt="" className="img-login" />
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-12 col-md-4">
              <form className='loginForm' onSubmit={handleSubmit}>
                <div className="mb-3 input-fi">
                  <img src="/asset/design/profile/5.png" className='logo-e' alt="" />
                  <input
                    type="text"
                    className="email input-login"
                    id="email"
                    onChange={handleChange}
                    name='email'
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3 input-fi position-relative">
                  <img src="/asset/design/profile/3.png" className='logo-e' alt="" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="password input-login"
                    onChange={handleChange}
                    id="password"
                    name='password'
                    placeholder="Password"
                  />
                  <span
                    className="input-group-text show-password-icon"
                    onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                    style={{
                      cursor: 'pointer',
                      border: 'none',         
                      background: 'none',     
                      padding: '0',           
                      outline: 'none',        
                      position: 'absolute',   
                      right: '10px',          
                      top: '50%',             
                      transform: 'translateY(-50%)' 
                    }}
                  >
                    <i className={`fas fa-eye${showPassword ? '' : '-slash'}`}></i> {/* FontAwesome icon */}
                  </span>

                </div>
                <button type="submit" className="btn-color">Login <i className="fas fa-arrow-right mx-3"></i></button>
              </form>
            </div>
            <div className='mt-3 '>
              <Link className='text-white text-decoration-none fw-bold' to="/forgot">Forgot Password?</Link>
              <p className='text-white mx-2'>Don’t have an account?
                <span className='text-white'><NavLink to="/register" className='text-white fw-bold text-decoration-none'> sign up</NavLink></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
