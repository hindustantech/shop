import React from 'react'
import Nav from './Nav'

const Profile = () => {
    return (
        <>

            <div className="nav color-custom d-flex justify-content-between align-items-center">

                <img src="asset/logo/24.png" alt="" className="l-h-h" />

                <h5 className="text-white text-center flex-grow-1">Profile</h5>

            </div>


            <div className="container">

                <div className="profile-detail mt-2 text-center">
                    <div className="eddit">

                        <img src="asset/logo/46.png" className=" profile-pic-edit" alt="" />
                    </div>
                    <img src="asset/logo/22.png" alt="" className="profile-p profile-pic-height  d-inline-block" />
                    <h3 className="profile-text-color fw-bolder mt-2 p-0">Ashish Shinde</h3>
                    <p className="profile-text-color">ashish@digiconcepts.com</p>
                </div>

                <div className="gernal-settinig mt-4">
                    <h2 className='profile-text-color heading-h px-4'>General Settings</h2>
                    <div className="kyc d-flex justify-content-around  profile-content px-3">
                        <img src="/asset/profile/2.png" className='profile-icons-height' alt="" />
                        <p className='profile-text-color'>KYC Status
                            Upload KYC Details</p>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                            />
                        </div>


                    </div>
                    <div className="d-flex justify-content-around  profile-content">
                        <img src="/asset/profile/3.png" className='profile-icons-height' alt="" />
                        <p className='profile-text-color'>Change Passwords</p>

                        <img src="/asset/logo/38.png" alt="" className='profile-icons-height' />

                    </div>
                    <div className="d-flex justify-content-around  profile-content">
                        <img src="/asset/profile/4.png" alt="" className='profile-icons-height' />
                        <p className='profile-text-color'>Update Profile</p>

                        <img src="/asset/logo/38.png" alt="" className='profile-icons-height' />

                    </div>
                    <div className="d-flex justify-content-around  profile-content">
                        <img src="/asset/profile/5.png" alt="" className='profile-icons-height' />

                        <p className='profile-text-color'>Welcome Letter</p>
                        <img src="/asset/logo/38.png" alt="" className='profile-icons-height' />


                    </div>
                    <div className="d-flex justify-content-around  profile-content">
                        <img src="/asset/profile/6.png" alt="" className='profile-icons-height' />
                        <p className='profile-text-color '> Identity Card</p>
                        <img src="/asset/logo/38.png" alt="" className='profile-icons-height' />


                    </div>
                </div>
                <div className="information ">
                    <h2 className='profile-text-color heading-h px-4'>Information</h2>
                    <div className="d-flex justify-content-around  profile-content">
                        <img src="/asset/profile/7.png" alt="" className='profile-icons-height' />

                        <p className='profile-text-color'>About Digiconcepts</p>

                        <img src="/asset/logo/38.png" alt="" className='profile-icons-height' />

                    </div>
                    <div className="d-flex justify-content-around  profile-content">
                        <img src="/asset/profile/8.png" alt="" className='profile-icons-height' />
                        <p className='profile-text-color'>Terms & Conditions</p>
                        <img src="/asset/logo/38.png" alt="" className='profile-icons-height' />


                    </div>
                    <div className="d-flex justify-content-around  profile-content">
                        <img src="" alt="" />
                        <p className='profile-text-color'>KYC Status
                            Upload KYC Details</p>
                        <img src="" alt="" />

                    </div>

                </div>
            </div>

            
                <Nav />
            

        </>
    )
}

export default Profile