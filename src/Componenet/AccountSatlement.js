import React from 'react'
import Headers from './Headers'
const AccountSatlement = () => {
  return (

    <>
            <Headers Name="Account satllement" />
            <div className="kuy-main">
                <div className="uploadDocument kyc-status mt-3 mx-2 pt-3 ">
                    <div className="headers-kyc mx-3 ">
                        <p className='text-center'> Upload Documents </p>
                    </div>

                    <div className="uploadDocument1 d-flex justify-content-around mx-2 mt-3">
                        <div className="text-kyc"> <p className='px-2 document-text mt-2'> Pan Card</ p></div>
                        <div className="card-pan">
                            <i className="fa fa-file  p-s-s" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="uploadDocument1 d-flex justify-content-around mx-2 mt-3">
                        <div className="text-kyc"> <p className='px-2 document-text mt-2'>Upload Bank Passbook</p></div>
                        <div className="card-pan">
                            <i className="fa fa-file  p-s-s" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="uploadDocument1 d-flex justify-content-around mx-2 mt-3">
                        <div className="text-kyc"> <p className='px-2 document-text mt-2'>Upload ID Card Photo</p></div>
                        <div className="card-pan">
                            <i className="fa fa-file  p-s-s" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="uploadDocument1 d-flex justify-content-around mx-2 mt-3">
                        <div className="text-kyc"> <p className='px-2 document-text mt-2'>Upload ID Card Photo</p></div>
                        <div className="card-pan">
                            <i className="fa fa-file  p-s-s" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>

                <div className="kyc-status-s mt-3 mx-2 pt-3">
                    <div className="headers-kyc mx-3 ">
                        <p className='text-center'> KYC Status </p>
                    </div>
                    <div className="document-button d-flex">
                        <button className='btn-document'>PAN Card</button>
                        <button className='btn-document btn-desibale'>Bank detatil</button>
                        <button className='btn-document btn-desibale'>ID card Photo </button>
                        <button className='btn-document btn-desibale'>GST No </button>


                    </div>
                    <div className="detail  px-3 mt-2  mb-0">
                        <p className="sponser_id   mb-0 mt-3" >
                            KYC Status : <span> Approved</span>  <span> <img src="/asset/logo/50.jpeg" className='l-h mb-1' alt="" /></span>
                        </p>
                        <p className="sponser_name   mb-0">
                            ID No.   <span>511776</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
  )
}

export default AccountSatlement