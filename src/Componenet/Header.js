import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from '../DataContext';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios'; // Import Axios for API calls

const Header = () => {

  const imageurl = process.env.REACT_APP_IMAGE_BASE_URL;
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to track sidebar visibility
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const { data, setSearchResults } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar state
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${apiBaseUrl}/search?keywords=${searchTerm}`); // Make API request with search term
      setSearchResults(response.data);
      // Store search results in state
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
        
    }

  }, [])


  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="header-bg bg-light">
        <div className="d-flex justify-content-between align-items-center p-3 container">
          <img src="/asset/logo/1.png" alt="logo" className='height-img' />

          <form className='loginForm search-from' onSubmit={handleSearchSubmit}>
            <div className="search-input">
              <input
                type="search"
                className="search input-login sear"
                id="search"
                placeholder="Search..."
                value={searchTerm} // Controlled input bound to state
                onChange={handleSearchInputChange} // Handle search input change
              />
              <button className='search-btn-p'><i className='fa fa-search'></i></button>
              {/* <i className="fa fa-search text-white" aria-hidden="true"></i> */}
            </div>
          </form>

          <FontAwesomeIcon
            icon={faBars}
            className="hambar height-img mx-2"
            onClick={toggleSidebar}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center p-3 container">
          <div className="profile-image">
            <Link to="/profile">
              <img
                src={`${imageurl}/profile/${data && data.user.user && data.user.user.image}`}
                alt="profile"
                className='profile-pic'
                onError={(e) => {
                  e.target.onerror = null; // prevents looping if fallback fails
                  e.target.src = "/asset/logo/22.png"; // provide fallback image path
                }}
              />
            </Link>
          </div>

          <div className="d-inline-flex flex-column ms-3">
            <h1 className="h4 color-name">Welcome!</h1>
            <p className="color-name">{data && data.user.user && data.user.user.first_name}</p>
          </div>

          <div className="ms-auto">
            <Link to="/Notification">
              <img src="/asset/design/5.png" alt="notification" className='notifaction-m height-img' />
            </Link>
          </div>
        </div>
      </div>

      {/* Optional: Display search results */}

    </>
  );
};

export default Header;
