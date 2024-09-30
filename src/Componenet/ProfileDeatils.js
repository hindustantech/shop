import React, { useContext, useState, useEffect } from 'react';
import Headers from './Headers';
import { DataContext } from '../DataContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const ProfileDeatils = () => {
    const { data } = useContext(DataContext);
    const [errors, setErrors] = useState({});
    // State for holding editable profile data
    const [formData, setFormData] = useState({
        id: '',
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
        pan: '',
        gst: '',
        nomineeName: '',
        nomineeAge: '',
        nomineeRelation: '',
    });
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    // Effect to set initial values from context data
    useEffect(() => {
        if (data && data.user && data.user.user) {
            setFormData({
                id: data.user.user.id || '',
                title: data.user.user.title || '',
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
                pan: data.user.user.pan || '',
                gst: data.user.user.gst || '',
                nomineeName: data.user.user.nominee_name || '',
                nomineeAge: data.user.user.nominee_age || '',
                nomineeRelation: data.user.user.nominee_relation || '',
            });
        }
    }, [data]);


    const validateForm = (formData) => {
        let errors = {};

        // Validate Name
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        } else if (formData.name.length < 3) {
            errors.name = "Name must be at least 3 characters long";
        }

        // Validate Email
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email address is invalid";
        }

        // Validate Mobile
        if (!formData.mobile.trim()) {
            errors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            errors.mobile = "Mobile number must be exactly 10 digits";
        }

        // Validate PAN
        if (!formData.pan.trim()) {
            errors.pan = "PAN is required";
        } else if (formData.pan.length !== 10) {
            errors.pan = "PAN must be 10 characters long";
        }

        // Validate GST (if required)
        if (formData.gst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(formData.gst)) {
            errors.gst = "Invalid GST number";
        }

        // Validate Nominee Name
        if (!formData.nomineeName.trim()) {
            errors.nomineeName = "Nominee name is required";
        }

        // Validate Nominee Age
        if (!formData.nomineeAge.trim()) {
            errors.nomineeAge = "Nominee age is required";
        } else if (isNaN(formData.nomineeAge) || formData.nomineeAge <= 0) {
            errors.nomineeAge = "Nominee age must be a valid number";
        }

        // Validate Address
        if (!formData.address.trim()) {
            errors.address = "Address is required";
        }

        // Validate Pincode
        if (!formData.pincode.trim()) {
            errors.pincode = "Pincode is required";
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            errors.pincode = "Pincode must be exactly 6 digits";
        }

        return errors;
    };



    const handleChange = (e) => {

        const formErrors = validateForm(formData);
        setErrors(formErrors);

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            await axios.post(
                `${apiBaseUrl}/update`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${data.user.token}`, // Ensure token is passed
                    },
                }
            );
            toast.success('Profile updated successfully:');
        } catch (error) {
            toast.error('Error updating profile:', error.response ? error.response.data : error);
        }
    };



    return (
        <>
            <Headers Name="Profile Details" />

            {/* Detail */}
            <div className="mani-profile-deatils ">
                <div className="profile-name d-flex justify-content-center align-items-center mt-2">
                    <img src="/asset/design/10.png" className="profile-deatils-img" alt="" />
                    <div className="detail px-3 mb-0">
                        <p className="sponser_id mb-0dd">
                            ID : <span>{data?.user?.user?.email}</span>
                        </p>
                        <p className="sponser_name mb-0dd">
                            Name : <span>{data?.user?.user?.first_name}</span>
                        </p>
                    </div>
                </div>

                {/* Referral Information */}
                <div className="referal-card d-flex flex-column justify-content-evenly container-fluid mt-2 ">
                    <div className="referal-information-header">
                        <h3 className='text-center text-white'>Referral Information</h3>
                    </div>
                    <div className="referral-deatils text-center" style={{ height: '110px' }}>
                        <div className="d-flex justify-content-space-between box-s">
                            <p className='mb-0 px-1 mt-2 profile-text-right'>Referral To</p>
                            <p className='mb-0dd p-text-p fw-bold-p mt-2'> {data?.user?.sponsor?.email}</p>
                        </div>
                        <div className="d-flex justify-content-space-between box-s">
                            <p className='mb-0 px-1 mt-2 profile-text-right'>Referral Name</p>
                            <p className='mb-0dd p-text-p fw-bold-p mt-2'> {data?.user?.sponsor?.first_name}</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} >

                    {/* Profile Information */}
                    <div className="referal-card profile-information d-flex flex-column justify-content-evenly container-fluid mt-2">
                        <div className="referal-information-header">
                            <h3 className='text-center text-white'>Profile Information</h3>
                        </div>
                        <div className="referral-deatils text-center">
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>USER id</p>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.id}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.name && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>Title</p>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.name && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>Name</p>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.name && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>Gender</p>
                                <input
                                    type="text"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.gender && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>Date of Birth</p>
                                <input
                                    type="text"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.dob && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>Residence</p>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.address && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>State</p>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.state && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>City</p>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.city && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>District</p>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.district && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>Pincode</p>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.pincode && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>Email</p>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.email && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>Mobile</p>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.mobile && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>Status</p>
                                <p className='mb-0dd p-text-p fw-bold-p px-4 mt-2 fw-bold'> {data && data.user.user && data.user.user.is_active}</p>
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>PAN</p>
                                <input
                                    type="text"
                                    name="pan"
                                    value={formData.pan}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.pan && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>GST </p>
                                <input
                                    type="text"
                                    name="gst"
                                    value={formData.gst}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.gst && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                           
                        </div>
                    </div>

                    {/* Nominee Information */}
                    <div className="referal-card profile-information d-flex flex-column justify-content-evenly container-fluid mt-2">
                        <div className="referal-information-header">
                            <h3 className='text-center text-white'>Nominee Information</h3>
                        </div>
                        <div className="referral-deatils text-center">
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='px-1 profile-text-right fw-bold mt-2'>Nominee Name</p>
                                <input
                                    type="text"
                                    name="nomineeName"
                                    value={formData.nomineeName}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.nomineeName && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='px-1 profile-text-right fw-bold mt-2'>Nominee Age</p>
                                <input
                                    type="text"
                                    name="nomineeAge"
                                    value={formData.nomineeAge}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.nomineeAge && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='px-1 profile-text-right fw-bold mt-2'>Nominee Relation</p>
                                <input
                                    type="text"
                                    name="nomineeRelation"
                                    value={formData.nomineeRelation}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />
                                 {errors.nomineeRelation && <p style={{ color: 'red',fontSize:'12px' }}>*</p>}
                            </div>
                        </div>
                    </div>
                    <div className="referal-card profile-information d-flex flex-column justify-content-evenly container-fluid mt-2 mb-4">
                        <div className="referal-information-header">
                            <h3 className='text-center text-white'>update  Your Informaiton Information</h3>
                        </div>
                        <button className="update-Deatils mx-4 ">Update Deatils </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ProfileDeatils;
