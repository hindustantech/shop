import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Headers from './Headers';
import { DataContext } from '../DataContext';

const ProfileDetails = () => {
    const { data } = useContext(DataContext);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // State for holding editable profile data
    const [profile, setProfile] = useState({
        title: 'MR',
        name: '',
        gender: '',
        dob: '',
        address: '',
        state: '',
        city: '',
        district: '',
        pincode: '',
        email: '',
        mobile: '',
        status: '',
        pan: '',
        gst: '',
        joiningDate: '',
        activationDate: '',
        nomineeName: '',
        nomineeAge: '',
        nomineeRelation: '',
    });

    // Effect to set initial values from context data
    useEffect(() => {
        if (data && data.user && data.user.user) {
            setProfile({
                title: 'MR', // Change this as needed
                name: data.user.user.first_name || '',
                gender: data.user.user.gender || '',
                dob: data.user.user.dob || '',
                address: data.user.user.address || '',
                state: data.user.user.state || '',
                city: data.user.user.city || '',
                district: data.user.user.district || '',
                pincode: data.user.user.pincode || '',
                email: data.user.user.email1 || '',
                mobile: data.user.user.mobile || '',
                status: data.user.user.is_active ? 'Active' : 'Inactive',
                pan: data.user.user.pan || '',
                gst: data.user.user.gst || '',
                joiningDate: data.user.user.joining_date || '',
                activationDate: data.user.user.activation_date || '',
                nomineeName: data.user.user.nominee_name || '',
                nomineeAge: data.user.user.nominee_age || '',
                nomineeRelation: data.user.user.nominee_relation || '',
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting profile:', profile); // Debug the profile object before submission

            const response = await axios.post(
                `${apiBaseUrl}/update/${data.user.user.id}`, // Ensure user ID is passed
                profile,
                {
                    headers: {
                        Authorization: `Bearer ${data.user.token}`, // Ensure token is passed
                    },
                }
            );
            console.log('Profile updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating profile:', error.response ? error.response.data : error);
        }
    };

    return (
        <>
            <Headers Name="Profile Details"  />

            <div className="mani-profile-deatils">
                <div className="profile-name d-flex justify-content-center align-items-center mt-2">
                    <img src="/asset/design/10.png" className="profile-deatils-img" alt="" />
                    <div className="detail px-3 mb-0">
                        <p className="sponser_id mb-0">
                            ID : <span>{data?.user?.user?.email1}</span>
                        </p>
                        <p className="sponser_name mb-0">
                            Name : <span>{profile.name}</span>
                        </p>
                    </div>
                </div>

                {/* Referral Information */}
                <form onSubmit={handleSubmit} className='px-2'>
                    <div className="referal-card d-flex flex-column justify-content-evenly container-fluid m-2">
                        <div className="referal-information-header">
                            <h3 className='text-center text-white'>Referral Information</h3>
                        </div>
                        <div className="referral-deatils text-center" style={{ height: '110px' }}>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>Referral To</p>
                                <p className='mb-0 px-4 p-text-p fw-bold-p'>: {data?.user?.sponsor?.email}</p>
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>Referral Name</p>
                                <p className='mb-0 px-4 p-text-p fw-bold-p'>: {data?.user?.sponsor?.first_name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="referal-card profile-information d-flex flex-column justify-content-evenly container-fluid m-2">
                        <div className="referal-information-header">
                            <h3 className='text-center text-white'>Profile Information</h3>
                        </div>
                        <div className="referral-deatils text-center">
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>Title</p>
                                <input
                                    type="text"
                                    name="title"
                                    value={profile.title}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>Name</p>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>Gender</p>
                                <input
                                    type="text"
                                    name="gender"
                                    value={profile.gender}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>Date of Birth</p>
                                <input
                                    type="date"
                                    name="dob"
                                    value={profile.dob}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>Residence</p>
                                <input
                                    type="text"
                                    name="address"
                                    value={profile.address}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>State</p>
                                <input
                                    type="text"
                                    name="state"
                                    value={profile.state}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>City</p>
                                <input
                                    type="text"
                                    name="city"
                                    value={profile.city}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>District</p>
                                <input
                                    type="text"
                                    name="district"
                                    value={profile.district}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>Pincode</p>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={profile.pincode}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>Email</p>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>Mobile</p>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={profile.mobile}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>Status</p>
                                <input
                                    type="text"
                                    name="status"
                                    value={profile.status}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                    disabled // Optionally disable if you don't want it to be editable
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>PAN</p>
                                <input
                                    type="text"
                                    name="pan"
                                    value={profile.pan}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>GST</p>
                                <input
                                    type="text"
                                    name="gst"
                                    value={profile.gst}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>Joining Date</p>
                                <input
                                    type="date"
                                    name="joiningDate"
                                    value={profile.joiningDate}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 profile-text-right'>Activation Date</p>
                                <input
                                    type="date"
                                    name="activationDate"
                                    value={profile.activationDate}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Nominee Information */}
                    <div className="referal-card profile-information d-flex flex-column justify-content-evenly container-fluid m-2">
                        <div className="referal-information-header">
                            <h3 className='text-center text-white'>Nominee Information</h3>
                        </div>
                        <div className="referral-deatils text-center">
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='px-1 fw-bold'>Nominee Name</p>
                                <input
                                    type="text"
                                    name="nomineeName"
                                    value={profile.nomineeName}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='px-1 fw-bold'>Nominee Age</p>
                                <input
                                    type="text"
                                    name="nomineeAge"
                                    value={profile.nomineeAge}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='px-1 fw-bold'>Nominee Relation</p>
                                <input
                                    type="text"
                                    name="nomineeRelation"
                                    value={profile.nomineeRelation}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                            <button type="submit" className="btn btn-primary">Update Profile</button>
                            </div>
                        </div>
                    </div>


                    <div className="text-center my-3">

                    </div>
                </form >
            </div>

            {/* Submit Button */}

        </>
    );
}

export default ProfileDetails;
