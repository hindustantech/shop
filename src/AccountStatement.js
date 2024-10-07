import React, { useState } from 'react';
import Headers from './Componenet/Headers';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const AccountStatement = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const[userdata,setuserData]=useState([])
    const [statementData, setStatementData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true); // Flag to indicate if there are more transactions to load
    const [page, setPage] = useState(1);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const fetchStatementData = async (pageNumber) => {
        setLoading(true);
        const id = localStorage.getItem('id');

        try {
            const response = await axios.get(`${apiBaseUrl}/statement/${id}`, {
                params: {
                    from_date: startDate,
                    to_date: endDate,
                    page: pageNumber // Pass the page number for pagination
                },
            });
            setuserData(response.data);
            if (response.data.transaction.data.length === 0) {
                setHasMore(false); // No more data to load
            } else {
                setStatementData((prevData) => [...prevData, ...response.data.transaction.data]);
                
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatementData([]); // Reset data for new queries
        setPage(1); // Reset to first page
        setHasMore(true); // Reset more flag
        fetchStatementData(1); // Fetch data for the first page
    };

    const fetchMoreData = () => {
        if (hasMore && !loading) {
            const nextPage = page + 1;
            setPage(nextPage); // Update page number
            fetchStatementData(nextPage); // Fetch next page of data
        }
    };

    const renderStatement = (data) => {
        const userEmail = userdata.user_data.email;
        
       // Assuming you save email in localStorage
        const isDebit = (data.reason === 'withdraw_payment' || data.sender === userEmail);
        const isCredit = (data.reason === 'deposit' || data.reciver === userEmail);

        return (
            <div className="debit mx-2 mt-4 mb-2" key={data.id}>
                <div className="date-type d-flex justify-content-between mx-2">
                    <p className='text-color-account fw-bold'>{new Date(data.date).toLocaleDateString()}</p>
                    <p className={isDebit ? 'text-danger fw-bold' : (isCredit ? 'text-success fw-bold' : 'text-muted')}>
                        {isDebit ? 'Debit' : (isCredit ? 'Credit' : 'Other')}
                    </p>
                </div>
                <p className='nara px-2 mt-2 text-color-account fw-bold'>Narration: {data.reason}</p>
                <p className='bla mx-2 text-color-account'>Amount: {data.amount}</p>
                {isDebit ? (
                <div className='d-flex justify-content-between mt-2'>
                    <p className='fw-bold mx-2 font-size-s'>Send to: {data.reciver}</p>
                    {/* <p className='blance-defferent text-color-account fw-bold mx-2'>TDS Per: {data.tds_per}</p>
                    <p className='blance-defferent text-color-account fw-bold mx-2'>TDS: {data.tds}</p>
                    <p className='blance-defferent text-color-account fw-bold mx-2'>Incentive: {data.incentive}</p> */}
                </div>) : ( <div className='d-flex justify-content-between mt-2'>
                    <p className=' fw-bold mx-2 font-size-s'>Received: {data.sender}</p>
                    {/* <p className='blance-defferent text-color-account fw-bold mx-2'>TDS Per: {data.tds_per}</p>
                    <p className='blance-defferent text-color-account fw-bold mx-2'>TDS: {data.tds}</p>
                    <p className='blance-defferent text-color-account fw-bold mx-2'>Incentive: {data.incentive}</p> */}
                </div>)}
            </div>
        );
    };

    return (
        <>
            <Headers Name="Account Statement" />

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
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className=" mx-4 d-flex">
                            <p className=" text-color-account fw-bold">TO</p>
                            <img src="/asset/design/c2.png" className='l-date-select mt-1 mx-2 px-3' alt="" />
                            <input
                                type="date"
                                name="to_date"
                                className='date-blance'
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className='check-btn px-2 mt-3 text-center text-color-account'> View Statement</button>
                </form>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <InfiniteScroll
                    dataLength={statementData.length} // Length of statementData
                    next={fetchMoreData} // Function to fetch more data
                    hasMore={hasMore} // Indicates if more data is available
                    loader={<p>Loading more data...</p>} // Loader when fetching more data
                    endMessage={<p className='text-center mb-4 mt-3'>No more transactions to load.</p>} // Message when there are no more transactions
                >
                    {statementData.map((data) => renderStatement(data))}
                </InfiniteScroll>
            )}
        </>
    );
};

export default AccountStatement;
