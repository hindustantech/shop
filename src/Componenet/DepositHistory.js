import React, { useEffect, useState } from 'react'
import Headers from './Headers'
import axios from 'axios';

const DepositHistory = () => {

    const[Deposit,setDeposit]=useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
   
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const DepositHistory = async () => {
        try {
            const id = localStorage.getItem('id');
            const reason = 'deposit';
            const response = await axios.get(`${apiBaseUrl}/Transaction/${id}/${reason}`);
            console.log(response.data);
            
            // Update the state with the data
            setDeposit(response.data);
           
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        DepositHistory();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <>
            <Headers Name="Deposit History " />

            {Deposit.transaction.data.map((item, index) => (
                <div className="history-card px-2 pt-2 mt-2 mx-2" key={index}>
                    <div className="d-flex history-data">
                        <p className='package-activation-text'>Reciver ID</p>
                        <p className="right-text-history">{item.reciver}</p> {/* Assuming the key is 'senderName' */}
                    </div>
                    <div className="d-flex history-data">
                        <p className='package-activation-text'>Amount</p>
                        <p className="right-text-history">{item.amount}</p> {/* Assuming the key is 'packageName' */}
                    </div>
                    <div className="d-flex history-data">
                        <p className='package-activation-text'>Status</p>
                        <p className="right-text-history">{item.status}</p> {/* Assuming the key is 'status' */}
                        <img src="/asset/logo/50.jpeg" className='l-h activation-img_h' alt="" />
                    </div>
                    <div className="px-3 d-flex justify-content-end">
                        <p className='mb-2 data-history'>{item.date}</p> {/* Assuming the key is 'date' */}
                    </div>
                </div>
            ))}

        </>
    )
}

export default DepositHistory