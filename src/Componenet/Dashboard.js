import React from 'react'
import Nav from './Nav'

const Dashboard = () => {
    return (
        <>
            <div className="header-dashboard d-flex justify-content-evenly align-items-center py-2">
                <img src="/asset/logo/37.png" className="l-h mx-3" alt="Company Logo 1" />
                <h3 className='text-dashborad mx-4'>Dashboards</h3>
                <img src="/asset/design/25.png" className='l-h mx-3' alt="Company Logo 2" />
            </div>
            <div className="dashboard-body">
                <div class="row px-4 mt-3">
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

                <div class="row px-4 mt-3">
                    <h2>Income</h2>
                    <div class="col-12 mt-3">
                        <div className='cardBox '>
                            <div className="card gradient-border">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>₹2000</h4>
                                        <h5 className="text-s">Leval Commission</h5>
                                    </div>
                                    <div className='Activation Wallet Logo'>
                                        <h4 className='t' >+18%</h4>
                                        <p>From Last Week</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                        <div className='cardBox '>
                            <div className="card gradient-border">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>₹2000</h4>
                                        <h5 className="text-s">Leval Commission</h5>
                                    </div>
                                    <div className='Activation Wallet Logo'>
                                        <h4 className='t' >+18%</h4>
                                        <p>From Last Week</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                        <div className='cardBox '>
                            <div className="card gradient-border">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>₹2000</h4>
                                        <h5 className="text-s">Leval Commission</h5>
                                    </div>
                                    <div className='Activation Wallet Logo'>
                                        <h4 className='t' >+18%</h4>
                                        <p>From Last Week</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row px-4 mt-3">
                        <h3>Earnings & Payout</h3>
                        <div class="col-6 ">
                            <div className='cardBox '>

                                <div className="card gradient-border">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4>₹12000</h4>
                                            <h5 className="text-s">Activation Wallet</h5>
                                        </div>
                                        <img src="asset/logo/28.png" className="l-h" alt="Activation Wallet Logo" />
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
                                        <img src="asset/logo/28.png" className="l-h" alt="Activation Wallet Logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center btn-b '>
                        <button type="button" class="btn btn-dashboard btn-c m-4"> Refer & Earn</button>
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