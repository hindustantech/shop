import React, { useContext } from 'react'
import Nav from './Nav'
import { Link } from 'react-router-dom'
import { DataContext } from '../DataContext';

const Profile = () => {
    const { data } = useContext(DataContext);
    
    // Assuming `kyc_status` is part of the `data.user.user` object and holds the KYC status
    const isKYCVerified = data && data.user.user && data.user.user.verified === 'verified';

    return (
        <>
            <div className="nav header-dashboard color-custom d-flex justify-content-between align-items-center">
                <Link to="/" className=''>
                    <img src="asset/logo/37.png" alt="" className="l-h-h heade-nav" />
                </Link>
                <h3 className="text-white text-center flex-grow-1">Profile</h3>
            </div>

            <div className="container mb-4">
                <div className="profile-detail mt-2 text-center">
                    <div className="eddit">
                        <Link to="/edditproile">
                            <img src="asset/logo/46.png" className=" profile-pic-edit" alt="" />
                        </Link>
                    </div>
                    <img src="asset/logo/22.png" alt="" className="profile-p profile-pic-height  d-inline-block" />
                    <h3 className="profile-text-color fw-bolder mt-2 p-0">
                        {data && data.user.user && data.user.user.first_name}
                    </h3>
                    <p className="profile-text-color">
                        {data && data.user.user && data.user.user.email1}
                    </p>
                </div>

                <div className="gernal-settinig mt-4">
                    <h2 className='profile-text-color heading-h px-4'>General Settings</h2>
                    
                    {/* KYC Status */}
                    <div className="kyc d-flex justify-content-around  profile-content ">
                        <img src="/asset/profile/2.png" className='profile-icons-height' alt="" />
                        <p className='profile-text-color'> KYC Status </p>
                        <div className="form-check form-switch mx-2">
                            <input
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                checked={isKYCVerified} 
                                readOnly
                                  
                            />
                        </div>
                    </div>

                    {/* Upload KYC Details */}
                    <Link to="/kyc" className="link-none ">
                        <div className="kyc d-flex justify-content-around profile-content ">
                            <img src="/asset/profile/2.png" className='profile-icons-height' alt="" />
                            <p className='profile-text-color'>Upload KYC Details</p>
                            <img src="/asset/logo/38.png" alt="" className='profile-icons-height' />
                        </div>
                    </Link>

                    {/* Change Password */}
                    <Link className="link-none " to="/ChangePassword">
                        <div className="d-flex justify-content-around profile-content">
                            <img src="/asset/profile/3.png" className='profile-icons-height' alt="" />
                            <p className='profile-text-color'>Change Passwords</p>
                            <img src="/asset/logo/38.png" alt="" className='profile-icons-height' />
                        </div>
                    </Link>

                    {/* Update Profile */}
                    <Link className='link-none' to="/edditproile">
                        <div className="d-flex justify-content-around profile-content">
                            <img src="/asset/profile/4.png" alt="" className='profile-icons-height' />
                            <p className='profile-text-color'>Update Profile</p>
                            <img src="/asset/logo/38.png" alt="" className='profile-icons-height' />
                        </div>
                    </Link>

                    {/* Welcome Letter */}
                    <div className="d-flex justify-content-around profile-content">
                        <img src="/asset/profile/5.png" alt="" className='profile-icons-height' />
                        <p className='profile-text-color'>Welcome Letter</p>
                        <img src="/asset/logo/38.png" alt="" className='profile-icons-height' />
                    </div>

                    {/* Identity Card */}
                    <Link className="link-none" to="/IDCards">
                        <div className="d-flex justify-content-around profile-content">
                            <img src="/asset/profile/6.png" alt="" className='profile-icons-height' />
                            <p className='profile-text-color'>Identity Card</p>
                            <img src="/asset/logo/38.png" alt="" className='profile-icons-height' />
                        </div>
                    </Link>
                </div>

                <div className="information">
                    <h2 className='profile-text-color heading-h px-4'>Information</h2>
                    <div className="d-flex justify-content-around profile-content">
                        <img src="/asset/profile/7.png" alt="" className='profile-icons-height' />
                        <p className='profile-text-color'>About Digiconcepts</p>
                        <img src="/asset/logo/38.png" alt="" className='profile-icons-height' />
                    </div>
                    <div className="d-flex justify-content-around profile-content">
                        <img src="/asset/profile/8.png" alt="" className='profile-icons-height' />
                        <p className='profile-text-color'>Terms & Conditions</p>
                        <img src="/asset/logo/38.png" alt="" className='profile-icons-height' />
                    </div>
                </div>
            </div>
            <Nav />
        </>
    );
}

export default Profile;
