import React, { useContext } from 'react'
import { DataContext } from '../DataContext';
import Nav from './Nav'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const { data, error, loading } = useContext(DataContext);
    return (
        <>
            <div className="header-dashboard d-flex justify-content-evenly align-items-center py-2">
                <Link to="/"> <img src="/asset/logo/37.png" className="l-h heade-nav mx-3" alt="Company Logo 1" /></Link>
                <h3 className='text-dashborad mx-4'>Dashboards</h3>
                <img src="/asset/design/25.png" className='l-h heade-nav mx-3' alt="Company Logo 2" />
            </div>
            <div className="dashboard-body container " style={{ height: "100vh" }}>
                <div className="row px-2 mt-3">
                    <h2>Wallets</h2>
                    <div className="col-6 ">
                        <div className='cardBox '>

                            <div className="card gradient-border">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4> ₹ {data && data.wallet && data.wallet.activation_wallet}</h4>
                                        <h5 className="text-s">Activation Wallet</h5>
                                    </div>
                                    <img src="asset/logo/26.png" className="l-h" alt="Activation Wallet Logo" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-6 ">
                        <div className='cardBox '>
                            <div className="card gradient-border">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4> ₹ {data && data.wallet && data.wallet.wallet_balance}</h4>
                                        <h5 className="text-s">Income Wallet</h5>
                                    </div>
                                    <img src="asset/logo/26.png" className="l-h" alt="Activation Wallet Logo" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row px-2 mt-3">
                    <h2>Income</h2>
                    <div className="col-12 mt-3">
                        <div className='cardBox '>
                            <div className="card gradient-border">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>₹ {data && data.wallet && data.wallet.level}</h4>
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
                    <div className="col-12 mt-3">
                        <div className='cardBox '>
                            <div className="card gradient-border">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>₹ {data && data.wallet && data.wallet.sponcer_income04}</h4>
                                        <h5 className="text-s">Sponser Income</h5>
                                    </div>
                                    <div className='Activation Wallet Logo'>
                                        <h4 className='t' >+18%</h4>
                                        <p>From Last Week</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row px-2 mt-3">
                    <h3>Earnings & Payout</h3>
                    <div className="col-6 ">
                        <div className='cardBox '>

                            <div className="card gradient-border">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>₹ {data && data.wallet && data.wallet.total_income}</h4>
                                        <h5 className="text-s">Total Earning</h5>
                                    </div>
                                    <img src="asset/logo/28.png" className="l-h" alt="Activation Wallet Logo" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-6 ">
                        <div className='cardBox '>
                            <div className="card gradient-border">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>₹ {data && data.wallet && data.wallet.total_withdrawal}</h4>
                                        <h5 className="text-s">Total Payout</h5>
                                    </div>
                                    <img src="asset/logo/28.png" className="l-h" alt="Activation Wallet Logo" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-center btn-b pb-4 '>
                    <Link to="/earn">   <button type="button" className="btn btn-dashboard btn-c m-4"> Refer & Earn</button></Link>
                </div>

            </div>

            <Nav />

        </>
    )
}

export default Dashboard