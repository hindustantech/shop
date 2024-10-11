import React, { useContext, useState, useEffect } from 'react';
import Headers from './Headers';
import { DataContext } from '../DataContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProfileDeatils = () => {
    const { data } = useContext(DataContext);
    const [errors, setErrors] = useState({});

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const imageurl = process.env.REACT_APP_IMAGE_BASE_URL;

    // State for holding editable profile data
    const [formData, setFormData] = useState({
        id: '',
        title: '',
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
        adhar: '',
        bank_name: '',
        bank_ifsc: '',
        bank_acc_holder_name: '',
        bank_acc_no: '',
        nomineeName: '',
        nomineeAge: '',
        nomineeRelation: '',
        image: '',
    });

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
                image: data.user.user.image, // Check if image exists
                adhar: data.user.user.adhar || '',
                bank_name: data.user.user.bank_name || '',
                bank_ifsc: data.user.user.bank_ifsc || '',
                bank_acc_no: data.user.user.bank_acc_no || '',
                bank_acc_holder_name: data.user.user.bank_acc_holder_name || '',
                nomineeName: data.user.user.nominee_name || '',
                nomineeAge: data.user.user.nominee_age || '',
                nomineeRelation: data.user.user.nominee_relation || '',
            });
        }
    }, [data]);

   


    // File upload handler


    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            if (files && files.length > 0) {
                // Ensure file is available and accessible
                setFormData({
                    ...formData,
                    image: files[0], // Safely store file object
                });
            }

        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };





    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if all fields have values, including the file upload
        for (const key of Object.keys(formData)) {
            if (key === 'image') {
                // Check if the image field has a file selected
                if (!formData[key]) {
                    toast.error('Image is required!', {
                        position: 'bottom-center',
                    });
                    return; // Stop submission if image is empty
                }
            } else {
                // Check if other fields have values
                if (formData[key] === '' || formData[key] === null) {
                    toast.error(`${key} is required!`, {
                        position: 'bottom-center',
                    });
                    return; // Stop submission if any field is empty
                }
            }
        }

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                // Append each form field to FormData
                if (key === 'image' && formData[key]) {
                    // Only append if image is available
                    formDataToSend.append(key, formData[key]);
                } else if (key !== 'image') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const res = await axios.post(`${apiBaseUrl}/update`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.user.token}`, // Ensure token is passed
                },
            });

            


            toast.success('Profile updated successfully!', {
                // 5 seconds
                position: 'bottom-center', // Display toast at the bottom
            });

            // Reload the page after a successful update
            setTimeout(() => {
                window.location.reload(); // Reloads the current page
            }, 1000); // Wait for 5 seconds to allow the toast to be visible

        } catch (error) {
            toast.error(`Error updating profile: ${error.response ? error.response.data.message : error.message}`, {
                // 5 seconds
            });
        }
    };



    return (
        <>
            <Headers Name="Edit Details" />

            {/* Detail */}
            <div className="mani-profile-deatils ">
                <div className="profile-name d-flex justify-content-center align-items-center mt-2">


                    <img
                        src={`${imageurl}/profile/${data && data.user.user && data.user.user.image}`}

                        style={{
                            height: '70px',  // Set desired height
                            width: '70px',   // Set desired width
                            borderRadius: '50%', // Makes the image circular
                            objectFit: 'cover' // Ensures the image covers the entire area without distortion
                        }}
                        className="profile-deatils-img mx-2 profile-pi"
                        alt="img"
                        onError={(e) => {
                            e.target.onerror = null; // prevents looping if fallback fails
                            e.target.src = "/asset/logo/22.png"; // provide fallback image path
                        }}
                    />
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
                    <div className="referral-deatils text-center" style={{ height: '100px' }}>
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
                                <p className="mb-0 px-1 mt-2 profile-text-right">Upload User image</p>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"  // Ensure only image files are allow
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />

                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>User Id</p>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.id}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                    readOnly
                                />

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

                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>Name</p>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "61%" }}
                                />

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

                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>
                                    Aadhar Number :  </p>
                                <input
                                    type="text"
                                    name="adhar"
                                    value={formData.adhar}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />

                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>Name Account Holder </p>
                                <input
                                    type="text"
                                    name="bank_acc_holder_name"
                                    value={formData.bank_acc_holder_name}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />

                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'> Account No </p>
                                <input
                                    type="text"
                                    name="bank_acc_no"
                                    value={formData.bank_acc_no}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />

                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>IFSC code </p>
                                <input
                                    type="text"
                                    name="bank_ifsc"
                                    value={formData.bank_ifsc}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />

                            </div>
                            <div className="d-flex justify-content-space-between box-s">
                                <p className='mb-0 px-1 mt-2 profile-text-right'>Bank Name </p>
                                <input
                                    type="text"
                                    name="bank_name"
                                    value={formData.bank_name}
                                    onChange={handleChange}
                                    className="px-4 p-text-p fw-bold border-0 mt-2"
                                    style={{ outline: 'none', width: "55%" }}
                                />

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

                            </div>
                        </div>
                    </div>
                    <div className="referal-card profile-information d-flex flex-column justify-content-evenly container-fluid mt-2 mb-4">
                        <div className="referal-information-header">

                        </div>
                        <button className="update-Deatils mx-4 ">Update</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ProfileDeatils;
