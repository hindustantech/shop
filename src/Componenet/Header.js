import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { DataContext } from '../DataContext';
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar';

const Header = () => {
  const { data } = useContext(DataContext);
  const imageurl = process.env.REACT_APP_IMAGE_BASE_URL;
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to track sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar state
  };
  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="header-bg bg-light ">
        <div className=" d-flex justify-content-between align-items-center p-3 container">

          <img src="/asset/design/1.png" alt="logo" className='height-img' />

          <form className='loginForm search-from'>
            <div className=" search-input ">
              <input type="search" className="search input-login sear" id="search" placeholder="Search..." />
              <i className="fa fa-search text-white" aria-hidden="true"></i>
            </div>
          </form>


          <FontAwesomeIcon
            icon={faBars}
            className="hambar height-img mx-2"
            onClick={toggleSidebar}
          />

        </div>

        <div className="d-flex justify-content-between align-items-center  p-3 container">
          {/* Placeholder for Image */}
          <div className="profile-image">
            <Link to="/profile">

              <img src={`${imageurl}/profile/${data && data.user.user && data.user.user.image}`}  alt="profile" className='profile-pic' />
            </Link>
          </div>

          <div className="d-inline-flex flex-column ms-3">
            <h1 className="h4 color-name">Welcome!</h1>
            <p className=" color-name">{data && data.user.user && data.user.user.first_name}</p>
          </div>

          <div className="ms-auto">
            <Link to="/Notification">

              <img src="/asset/design/5.png" alt="notification" className='notifaction-m height-img' />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
