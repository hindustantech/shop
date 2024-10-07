import React, { useState } from 'react'
import Headers from './Componenet/Headers'
import axios from 'axios';

const AccountStatement = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statementData, setStatementData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const fetchStatementData = async () => {
        setLoading(true);
        const id = localStorage.getItem('id');
       
        try {
            const response = await axios.get(`${apiBaseUrl}/statement/${id}`, {
                params: {
                    from_date: startDate,
                    to_date: endDate,
                },
            });
            setStatementData(response.data);
                console.log(response.data)
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchStatementData();
    };

    return (
        <>
            <Headers Name="Account Statment" />

            <div className="selectDateRange mx-2">
                <p className='pt-2 text-color-account fw-bold mb-4 mx-2'> Select Date Range</p>
                <form onSubmit={handleSubmit}>
                    <div className="from-date">

                        <div className=" form-date d-flex mx-2 ">
                            <p className="mx-2 text-color-account fw-bold"> From</p>
                            <img src="/asset/design/c2.png" className='l-date-select mt-1 px-2' alt="" />
                            <input
                                type="date"
                                name="from_date"
                                className='date-blance mx-3'
                                placeholder='10 jan 2024'
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                id="" />
                        </div>
                        <div className=" mx-4 d-flex  ">
                            <p className=" text-color-account fw-bold">TO</p>
                            <img src="/asset/design/c2.png" className='l-date-select mt-1 mx-2 px-3' alt="" />

                            <input
                                type="date"
                                name="to_date"
                                className='date-blance'
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                placeholder='10 jan 2024' id="" />
                        </div>
                    </div>

                    <button className='check-btn px-2 mt-3 text-center text-color-account'> View Statment</button>
                </form>
            </div>

            <div className=" d-flex  justify-content-between px-2  mt-4">
                <p className='  text-color-account'> New Balance</p>
                <p className='  text-color-account'>373.00 cr</p>

            </div>
            <hr />
            <div className="debit mx-2 ">
                <div className="date-type d-flex justify-content-between mx-2">
                    <p className='text-color-account fw-bold'>01 jan 2024</p>
                    <p className='text-danger fw-bold'>Debit</p>


                </div>
                <p className='nara px-2 mt-2 text-color-account fw-bold'> Narration : Opening Balance</p>
                <p className='bla mx-2'>$000.75</p>
                <div className='d-flex justify-content-between  mt-2'>

                    <p className='blance-defferent text-color-account mx-2 fw-bold'>PBV:0.00</p>
                    <p className='blance-defferent text-color-account mx-2 fw-bold'>TDS Per:0.00 </p>
                    <p className='blance-defferent text-color-account mx-2 fw-bold'>TDS : 0.00</p>
                    <p className='blance-defferent text-color-account mx-2 fw-bold'>Incentive:0.00</p>
                </div>
            </div>
            <div className="debit mx-2 mt-4">
                <div className="date-type d-flex justify-content-between mx-2">
                    <p className='text-color-account fw-bold'>01 jan 2024</p>
                    <p className='text-success fw-bold'>Credit</p>


                </div>
                <p className='nara px-2 mt-2 text-color-account fw-bold'> Narration : Opening Balance</p>
                <p className='bla mx-2 text-color-account'>$000.75</p>
                <div className='d-flex justify-content-between   mt-2'>

                    <p className='blance-defferent text-color-account fw-bold mx-2'>PBV:0.00</p>
                    <p className='blance-defferent text-color-account fw-bold mx-2'>TDS Per:0.00 </p>
                    <p className='blance-defferent text-color-account fw-bold mx-2'>TDS : 0.00</p>
                    <p className='blance-defferent text-color-account fw-bold mx-2'>Incentive:0.00</p>
                </div>
            </div>
        </>
    )
}

export default AccountStatement