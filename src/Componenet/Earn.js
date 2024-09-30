import React from 'react'
import { Link } from 'react-router-dom'

const Earn = () => {
    return (
        <>
            <div className="header-refer-earn">
              <Link to="/" >  <img src="/asset/logo/e.png" className='l-h-h' alt="" /></Link>
                <h3 className='  text-center pt-3'>Refer & Earn</h3>

            </div>
            <div className="main-body-refer-earn px-4 w-full">
                <img src="/asset/design/24.png" className="img-fluid justify-content-center " alt="" />
                <h4 className='px-3 h-earn'> Refer a friend and Earn Commission</h4>
                <div className='container '>

                    <div className=" ref-box mt-3  ">
                        <i className='p-2 copy-i fa fa-copy '></i>
                        <p className='text-center link-ref  m-3'>https://digiconcept.com/referall?id=12ss33</p>
                    </div>
                    <div className="benefits mt-4">
                        <h4 className='ref-benefits  '>Benefits of Referral Program</h4>
                        <div className=" ref-boxx  d-flex justify-content-evenly ">
                            <p className=' text-center ref-text '>Passive Income Source</p>
                        </div>
                        <div className=" ref-boxx mt-4  d-flex justify-content-evenly  ">
                            <p className=' text-center ref-text '>Time Flexibility</p>
                        </div>
                        <div className=" ref-boxx mt-4 d-flex justify-content-evenly  ">
                            <p className=' text-center ref-text '>Anytime & Anywhere</p>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <h4 className='ref-benefits mt-4 px-4 '>Refer Now</h4>
                    <div className="socalmeadia d-flex justify-content-evenly  aling-item-center">
                        <div className=" whatapp "> <img src="/asset/logo/31.png" className='socal-media-icons' alt="" /></div>
                        <div className=" facebook"> <img src="/asset/logo/32.png" className='socal-media-icons' alt="" /></div>
                        <div className=" instagram"> <img src="/asset/logo/33.png" className='socal-media-icons' alt="" /></div>
                        <div className=" linkdine"> <img src="/asset/logo/34.png" className='socal-media-icons' alt="" /></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Earn