import React from 'react'
import Nav from './Nav'

const Dashboard = () => {
    return (
        <>
            <div className="header-dashboard d-flex justify-content-evenly align-items-center py-2">
                <img src="/asset/logo/24.png" className="l-h mx-3" alt="Company Logo 1" />
                <h3 className='text-c mx-4'>Dashboards</h3>
                <img src="/asset/logo/25.png" className='l-h mx-3' alt="Company Logo 2" />
            </div>
            <div className="conteaner">

                <div className='dashboard-body'>
                    <div class="row px-3 mt-3">
                        <h2>Wallets</h2>
                        <div class="col-6 ">
                            <div className='cardBox '>

                                <div className="card gradient-border">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4>₹12000</h4>
                                            <h5 className="text-s">Activation Wallet</h5>
                                        </div>
                                        <img src="asset/logo/26.png" className="l-h" alt="Activation Wallet Logo" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-6 ">
                            <div className='cardBox '>
                                <div className="card gradient-border">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4>₹12000</h4>
                                            <h5 className="text-s">Activation Wallet</h5>
                                        </div>
                                        <img src="asset/logo/26.png" className="l-h" alt="Activation Wallet Logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row px-3 mt-3">
                        <h2>Income</h2>
                        <div className="col-12 col-md-12 mb-3">
                            <div className='cardBox '>
                                <div className="card gradient-border">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4>₹2000</h4>
                                            <h5 className="text-s">Leval Commission</h5>
                                        </div>
                                        <div className='d-inline float-left'>
                                            <h4 className='t' >+18%</h4>
                                            <p>From Last Week</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 mb-2">

                            <div class="cardBox border-b">
                                <div className="card gradient-border">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4 >₹2000</h4>
                                            <h5 className="text-s">Leval Commission</h5>

                                        </div>
                                        <div className='d-inline float-left'>
                                            <h4 className='t' >+18%</h4>
                                            <p>From Last Week</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-md-12 mb-3">

                            <div class="cardBox border-b">
                                <div className="card gradient-border">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4>₹2000</h4>
                                            <h5 className="text-s">Leval Commission</h5>
                                        </div>
                                        <div className='d-inline float-left'>
                                            <h4 className='t' >+18%</h4>
                                            <p>From Last Week</p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row px-3 mt-3">
                        <h3>Earnings & Payout</h3>
                        <div class="col-6">
                            <div className='cardBox '>
                                <div className="card gradient-border">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4>₹2000</h4>
                                            <h5 className="text-s">Total Earning</h5>
                                        </div>
                                        <img src="asset/logo/28.png" className="l-h" alt="Activation Wallet Logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div className='cardBox '>
                                <div className="card gradient-border">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4>₹8000</h4>
                                            <h5 className="text-s">Total Payout</h5>
                                        </div>
                                        <img src="asset/logo/27.png" className="l-h" alt="Activation Wallet Logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center btn-b '>
                        <button type="button" class="btn btn-success btn-c m-4"> Refer & Earn</button>
                    </div>
                </div>

                <div className='navbar-b'>
                    <Nav />
                </div>
            </div>
        </>
    )
}

export default Dashboard