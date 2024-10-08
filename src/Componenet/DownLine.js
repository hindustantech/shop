import React, { useEffect, useState } from 'react';
import Headers from './Headers';
import axios from 'axios';

const DownLine = () => {
    const [reports, setReports] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // State to store search term

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

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update the search term
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message if any
    }

    // Filter reports based on search term
    const filteredReports = reports?.my_downline?.filter((report) => {
        return report.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
               report.mobile.includes(searchTerm) || 
               report.user_id.toString().includes(searchTerm); // Add more fields as needed
    }) || [];

    return (
        <>
            <Headers Name="DownLine Report" />
            <div className="main-id-card">
                <div className="search-reports mt-3 mx-2 d-flex justify-content-center align-items-center">
                    <input 
                        type="search" 
                        className="search-reports-input px-4" 
                        id="search" 
                        placeholder="Search..." 
                        value={searchTerm} // Bind the input value to the search term
                        onChange={handleSearchChange} // Handle input change
                    />
                    <div className="search-icon text-center">
                        <i className="fa fa-search pt-2" aria-hidden="true"></i>
                    </div>
                </div>

                <div className="card-id mt-3 row">
                    {filteredReports.length > 0 ? (
                        filteredReports.map((report) => (
                            <div className="col-md-4 mt-2 col-12 mb-2" key={report.id}>
                                <div className="id-card mx-2 mt-1">
                                    <div className="info">
                                        <p className="id-no text-center">ID: {report.user_id}</p>
                                        <hr />
                                        <div className="d-flex justify-content-between">
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
                                  
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>No reports available.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default DownLine;
