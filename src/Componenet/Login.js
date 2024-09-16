import React from 'react';

import { Link, NavLink } from 'react-router-dom';
const Login = () => {
  return (
    <>

      <div className='green-box'>

        <div className="login-container mx-auto">

        <Link to="/">  <img src="/asset/design/2.png" className="img-fluid close-png" alt="" /></Link>
          <div className="row mt-4">
            <div className="col-12 ">
              <img src="/asset/design/1.png" alt="Logo" className="logo me-2 logo-h login-logo" />
              <h1 className="login-text ">Login</h1>
            </div>
          </div>


          <div className="row justify-content-center mt-4">
            <div className="col-12 col-md-6 text-center">
              <img src="/asset/design/3.png" alt="" className="img-fluid "  />
            </div>
          </div>


          <div className="row justify-content-center mt-4">
            <div className="col-12 col-md-4">
              <form className='loginForm'>
                <div className="mb-3 input-fi">
                  <img src="/asset/logo/1.png" className='logo-e' alt="" />
                  <input type="email" className="email input-login" id="email" placeholder="Email" />
                </div>
                <div className="mb-3 input-fi">
                  <img src="/asset/logo/5.png" className='logo-e' alt="" />
                  <input type="password" className="password input-login" id="password" placeholder=" password" />
                </div>
                <button type="submit" className="btn-color ">Login <i className="fas fa-arrow-right mx-3"></i> </button>
              </form>
            </div>
            <div className='mt-3 '>
              <a className='text-white' href="/">Forgot Password?</a>
              <p className='text-white'>Don’t have account?
                <span className='text-white'><NavLink to="/singup" className='text-white fw-bold'> sign up</NavLink></span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
