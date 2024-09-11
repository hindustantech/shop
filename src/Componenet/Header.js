import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <>
      <div className="header-bg bg-light p-3 container-fluid">
        <div className=" d-flex justify-content-between align-items-center">
          <img src="/asset/logo/2.png" alt="logo" className='height-img' />
          <form className='loginForm'>
            <div className=" search-input ">
              <input type="search" className="search input-login sear" id="search" placeholder="Search..." />
              <i class="fa fa-search text-white" aria-hidden="true"></i>
            </div>
          </form>

          <FontAwesomeIcon icon={faBars} className='hambar height-img' />
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          {/* Placeholder for Image */}
          <div className="profile-image">
            <img src="/asset/logo/22.png" alt="profile" className='profile-pic' />
          </div>

          <div className="d-inline-flex flex-column ms-3">
            <h1 className="h4">Welcome</h1>
            <p className="mb-0 color-name">Ashish Shinde</p>
          </div>

          <div className=" ms-auto">
            <img src="/asset/logo/10.png" alt="notification" className='notifaction-m height-img' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
