import React from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <>
            <div className='green-box App'>

                <div className="login-container mx-auto">

                    <img src="/asset/logo/3.png" className="img-fluid close-png" alt="" />
                    <div className="row mt-4">
                        <div className="col-12 ">
                            <img src="/asset/logo/2.png" alt="Logo" className="logo me-2 logo-h" />
                            <h1 className="login-text ">Login</h1>
                        </div>
                    </div>


                    <div className="row justify-content-center mt-4">
                        <div className="col-12 col-md-6 text-center">
                            <img src="/asset/logo/4.png" alt="" className="img-fluid logo-h"  style={{height: '250px',}}/>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <div className="col-12 col-md-4">
                            <form className='loginForm'>
                                <div className="mb-3 input-fi">
                                    <img src="/asset/logo/7.png" className='logo-e' alt="" />
                                    <input type="text" className="text input-login" id="text" placeholder="Name" />
                                </div>
                                <div className="mb-3 input-fi">
                                    <img src="/asset/logo/1.png" className='logo-e' alt="" />
                                    <input type="email" className="email input-login" id="email" placeholder="Email" />
                                </div>
                                <div className="mb-3 input-fi">
                                    <img src="/asset/logo/1.png" className='logo-e' alt="" />
                                    <input type="password" className="password input-login" id="email" placeholder="Password" />
                                </div>
                                <div className="mb-3 input-fi">
                                    <img src="/asset/logo/8.png" className='logo-e' alt="" />
                                    <input type="Date" className="password input-login" id="Date" placeholder=" Date of Birth" />
                                </div>
                                <button type="submit" className="btn-color btn">Login <i className="fas fa-arrow-right mx-3"></i> </button>
                            </form>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <p className='text-black'>Already registered? </p>
                            <span>  <Link to="/Login" className=' text-black '> sign up </Link></span>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SignUp