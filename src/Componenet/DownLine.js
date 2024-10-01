import React, { useEffect, useState } from 'react'
import Headers from './Headers'
import axios from 'axios';
const DownLine = () => {

    const [reports, setReports] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Function to fetch all reports data
    const fetchReports = async () => {
        try {
            const id = localStorage.getItem('id'); // Get ID from localStorage
            if (!id) {
                throw new Error("ID not found in localStorage");
            }

            // Fetch reports data from the API
            const response = await axios.get(`${apiBaseUrl}/userteamapi/${id}`);
            console.log(response.data)
            setReports(response.data); // Assuming the response contains report data
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports(); // Fetch reports when component mounts
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message if any
    }


    return (
        <>
            <Headers Name="DownLine  Report" />
            <div className="main-id-card  ">
                <div className=" search-reports mt-3 mx-2 d-flex justify-content-center aling-item-center  ">

                    <input type="search" className="search-reports-input px-4" id="search" placeholder="Search..." />

                    <div className="search-icon  text-center  "><i className="fa fa-search pt-2 " aria-hidden="true"></i></div>
                </div>


                <div className="card-id  mt-3 row ">
                    {reports.my_downline.map((report) => (
                        <div className="col-md-4 mt-2 col-12" key={report.id}> {/* Add a unique key for each report */}
                            <div className="id-card mx-2 mt-1">
                                <div className="info">
                                    <p className="id-no text-center">ID: {report.user_id}</p>
                                    <hr />

                                    <div className="d-flex justify-content-between"> {/* Corrected from justify-content-space-between */}
                                        <p className='mb-0 px-1 sponser-text fw-bold'>Name</p>
                                        <p className='mb-0 p-text-s fw-bold-p'>: {report.first_name}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className='mb-0 px-1 sponser-text fw-bold'>Date of Joining</p>
                                        <p className='mb-0 p-text-s fw-bold-p'>: {report.joining_date}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className='mb-0 px-1 sponser-text fw-bold'>Mobile NO</p>
                                        <p className='mb-0 p-text-s fw-bold-p'>: {report.mobile}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className='mb-0 px-1 sponser-text fw-bold'>State Name</p>
                                        <p className='mb-0 p-text-s fw-bold-p'>: {report.state}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className='mb-0 px-1 sponser-text fw-bold'>City</p>
                                        <p className='mb-0 p-text-s fw-bold-p'>: {report.city}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className='mb-0 px-1 sponser-text fw-bold'>Status</p>
                                        <p className='mb-0 p-text-s fw-bold-p'>: {report.is_active}</p>
                                    </div>
                                </div>
                                <div className="image mt-4">
                                    <img src="asset/design/m.jpeg" className='img-m mx-3 mt-2' alt='profile' style={{ height: '141px', width: '123px' }} />
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </>
    )
}

export default DownLine