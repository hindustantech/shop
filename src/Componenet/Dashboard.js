import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../DataContext';
import Nav from './Nav'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const { data } = useContext(DataContext);
    console.log(data)

   

    const [tier, setTier] = useState("");
    
    const rankImages = {
        Bronze: "/asset/logo/bronze.png",
        Silver: "/asset/logo/silver.png",
        Gold: "/asset/logo/gold.png",
        Platinum: "/asset/logo/platinum.png",
        Diamond: "/asset/logo/diamond.png",
        Invalid: "/asset/logo/default.png"  // Default image if rank is invalid
    };

    const determineTier = (points) => {
        if (points >= 0 && points <= 1000) {
            return "Bronze";
        } else if (points > 1000 && points <= 10000) {
            return "Silver";
        } else if (points > 10000 && points <= 100000) {
            return "Gold";
        } else if (points > 100000 && points <= 1000000) {
            return "Platinum";
        } else if (points > 1000000 && points <= 10000000) {
            return "Diamond";
        } else {
            return "Invalid Rank";
        }
    };

    useEffect(() => {
        if (data && data.wallet && data.wallet.bonus !== undefined) {
            const calculatedTier = determineTier(data.wallet.bonus);
            setTier(calculatedTier);
        }
    }, [data]);
    return (
        <>
            <div className="header-dashboard d-flex justify-content-evenly align-items-center py-2">
                <Link to="/"> <img src="/asset/logo/37.png" className="l-h heade-nav mx-3" alt="Company Logo 1" /></Link>
                <h3 className='text-dashborad mx-4'>Dashboards</h3>
                <img src="/asset/design/25.png" className='l-h heade-nav mx-3' alt="Company Logo 2" />
            </div>
            <div className="dashboard-body container " >
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
                                        <img src="asset/logo/l.png" className="l-h" alt="Activation Wallet Logo" />
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
                                        <h4>₹ {data && data.wallet && data.wallet.sponcer_income}</h4>
                                        <h5 className="text-s">Sponser Income</h5>
                                    </div>
                                    <div className='Activation Wallet Logo'>
                                        <img src="asset/logo/s.png" className="l-h" alt="Activation Wallet Logo" />
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
                                        <h4>₹ {data && data.wallet && data.wallet.bonus}</h4>
                                        <h5 className="text-s">Bonus Rank</h5>
                                    </div>
                                    <div className='Activation Wallet Logo'>
                                        <img src={rankImages[tier]}className="l-h" alt="bonus Wallet " />
                                        <p className='text-s'>{tier}</p>
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
                <div className='text-center btn-b pb-4 big-screen-het-botton '>
                    <Link to="/earn">   <button type="button" className="btn btn-dashboard btn-c m-4"> Refer & Earn</button></Link>
                </div>

            </div>
            <div className='big-screen-het'>
                <Nav />

            </div>


        </>
    )
}

export default Dashboard