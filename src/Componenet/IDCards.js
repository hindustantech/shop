import React, { useContext } from 'react'
import Headers from './Headers'
import { DataContext } from '../DataContext';


const IDCards = () => {
    const { data } = useContext(DataContext);
    const imageurl = process.env.REACT_APP_IMAGE_BASE_URL;
    return (
        <>
            <Headers Name="ID card" />
            <div className="maind-body-id">
                <div className="body-main-card mt-2 mx-2">
                    <div className="heading-complogo-id  mt-1 d-flex  justify-content-center">
                        <img src="/asset/logo/1.png" className="l-id " alt="Company Logo"  style={{height:"50px"}}/>
                        <div className="heading-name-id d-inline-block text-center ml-3">
                            <p className="text-white mb-0 heading-id ">Digiconcept</p>
                            <p className="text-white mb-0 heading-id mx-2">Techmedia Pvt. Ltd.</p>
                        </div>
                    </div>
                    <div className="info-idcard d-flex justify-content-center mt-4">

                        <img className='mt-4' src={`${imageurl}/profile/${data && data.user.user && data.user.user.image}`}
                             alt="" />
                    </div>
                    <div className="text-info-idcard mt-3">
                        <div className="id-info  ">
                            <h1 className='text-center name-id'>{data && data.user && data.user.user.first_name}</h1>

                            <div className="d-flex justify-content-space-between  px-5 mx-3">
                                <p className='   mb-0 px-1 profile-text-right' >ID No.  </p>
                                <p className='   mb-0 px-1 p-text-p '>: {data.user.user.email}</p>
                            </div>

                            <div className="d-flex justify-content-space-between  px-5 mx-3">

                                <p className='   mb-0 px-1 profile-text-right'>Address</p>
                                <p className='   mb-0 px-1 p-text-p'>: {data.user.user.address} </p>
                            </div>
                            <div className="d-flex justify-content-space-between  px-5 mx-3">

                                <p className='   mb-0 px-1 profile-text-right'>Mobile No.</p>
                                <p className='   mb-0 px-1 p-text-p'>: {data.user.user.mobile}</p>
                            </div>

                        </div>

                    </div>


                </div>
                <div className="body-main-card mt-3 mx-2">
                    <div className="heading-complogo-id  mt-2 d-flex  justify-content-center">
                        <img src="/asset/logo/1.png" className="l-id " alt="Company Logo"  style={{height:"50px"}} />
                        <div className="heading-name-id d-inline-block text-center ml-3">
                            <p className="text-white mb-0  heading-id ">Digiconcept</p>
                            <p className="text-white mb-0  heading-id mx-2">Techmedia Pvt. Ltd.</p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default IDCards