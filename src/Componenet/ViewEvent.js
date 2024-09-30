import React, { useEffect, useState } from 'react'
import Headers from './Headers'
import axios from 'axios';


const ViewEvent = () => {

    const [Events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Function to fetch all Events data
    const fetchEvents = async () => {
        try {


            // Fetch Events data from the API
            const response = await axios.get(`${apiBaseUrl}/getEvents`);
            console.log(response.data)
            setEvents(response.data); // Assuming the response contains report data
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(); // Fetch reports when component mounts
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message if any
    }



    return (
        <>

            <Headers Name="View Events" />
            <div className="main-id-card   ">
                <div className=" search-reports mt-3 mx-4 d-flex justify-content-center aling-item-center  ">

                    <input type="search" className="search-reports-input px-4" id="search" placeholder="Search..." />

                    <div className="search-icon  text-center  "><i class="fa fa-search pt-2 " aria-hidden="true"></i></div>
                </div>

                <div className="lts-main container  row">
                {Events.map((event) => (
                    <div className="col-md-6 col-12 mb-3 mt-3" key={event.id}>
                        <div className="referal-card d-flex flex-column justify-content-evenly container-fluid mx-2 mt-2">
                            <div className="lts-header">
                                <p className='text-center text-white'>LTS (Leadership Training Seminar)</p> {/* Assuming 'title' is a property */}
                            </div>
                            <div className="referral-deatils text-center">
                                <div className="d-flex justify-content-space-between box-s">
                                    <p className='mb-0 mt-2 profile-text-right'>Event on Date</p>
                                    <p className='mb-0 px-4 mt-2 p-text-p'>: {event.date}</p> {/* Adjust according to your data */}
                                </div>
                                <div className="d-flex justify-content-space-between box-s">
                                    <p className='mb-0 mt-2 profile-text-right'>Event On Time</p>
                                    <p className='mb-0 px-4 mt-2 p-text-p'>: {event.time}</p> {/* Adjust according to your data */}
                                </div>
                                <div className="d-flex justify-content-space-between box-s">
                                    <p className='mb-0 mt-2 profile-text-right'>Venue</p>
                                    <p className='mb-0 px-4 mt-2 p-text-p'>: {event.venue}</p> {/* Adjust according to your data */}
                                </div>
                                <div className="d-flex justify-content-space-between box-s">
                                    <p className='mb-0 mt-2 profile-text-right'>State</p>
                                    <p className='mb-0 px-4 mt-2 p-text-p'>: {event.state}</p> {/* Adjust according to your data */}
                                </div>
                                <div className="d-flex justify-content-space-between box-s">
                                    <p className='mb-0 mt-2 profile-text-right'>City</p>
                                    <p className='mb-0 px-4 mt-2 p-text-p'>: {event.city}</p> {/* Adjust according to your data */}
                                </div>
                                <div className="d-flex justify-content-space-between box-s">
                                    <p className='mb-0 mt-2 profile-text-right'>Status</p>
                                    <p className='mb-0 px-4 mt-2 p-text-p'>: {event.status}</p> {/* Adjust according to your data */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                </div>
            </div>
        </>
    )
}

export default ViewEvent