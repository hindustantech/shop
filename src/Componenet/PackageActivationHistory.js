import React, { useEffect, useState } from 'react'
import Headers from './Headers'
import axios from 'axios';

const PackageActivationHistory = () => {

    const [Activaton, setActivaton] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
   
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const PackageActivat = async () => {
        try {
            const id = localStorage.getItem('id');
            const reason = 'activate_package';
            const response = await axios.get(`${apiBaseUrl}/Transaction/${id}/${reason}`);

            
            // Update the state with the data
            setActivaton(response.data);
            console.log(response.data)
           
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        PackageActivat();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <>
            <Headers Name="Activation History" />

            {Activaton.transaction.data.map((item, index) => (
                <div className="history-card px-2 pt-2 mt-2 mx-2 mb-2" key={index}>
                    <div className="d-flex history-data">
                        <p className='package-activation-text'>Sender Name</p>
                        <p className="right-text-history">{item.sender}</p> {/* Assuming the key is 'senderName' */}
                    </div>
                    <div className="d-flex history-data">
                        <p className='package-activation-text'>Package Name</p>
                        <p className="right-text-history">{item.package}</p> {/* Assuming the key is 'packageName' */}
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

export default PackageActivationHistory
