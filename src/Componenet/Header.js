import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <>
      <div className="header-bg bg-light ">
        <div className=" d-flex justify-content-between align-items-center p-3 container">
          <img src="/asset/design/1.png" alt="logo" className='height-img' />
          <form className='loginForm search-from'>
            <div className=" search-input ">
              <input type="search" className="search input-login sear" id="search" placeholder="Search..." />
              <i class="fa fa-search text-white" aria-hidden="true"></i>
            </div>
          </form>

          <FontAwesomeIcon icon={faBars} className='hambar height-img' />
        </div>

        <div className="d-flex justify-content-between align-items-center  p-3 container">
          {/* Placeholder for Image */}
          <div className="profile-image">
            <img src="/asset/logo/22.png" alt="profile" className='profile-pic' />
          </div>

          <div className="d-inline-flex flex-column ms-3">
            <h1 className="h4 color-name">Welcome!</h1>
            <p className="mb-0 color-name">Ashish Shinde</p>
          </div>

          <div className="ms-auto">
            <img src="/asset/design/5.png" alt="notification" className='notifaction-m height-img' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
