import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShop, faTachometerAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center">
      
        <ul className="navbar-nav d-flex flex-row flex-md-row justify-content-around w-100">
          <li className="nav-item p-2">
            <Link className="nav-link text-center text-color" aria-current="page" to="/">
              <FontAwesomeIcon icon={faHome} className="me-1" /> <br />
               Home
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link className="nav-link text-center text-color" to="/shop">
              <FontAwesomeIcon icon={faShop} className="me-1" /><br /> Shop
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link className="nav-link text-center text-color" to="/dahboard">
              <FontAwesomeIcon icon={faTachometerAlt} className="me-1" /><br /> Dashboard
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link className="nav-link text-center text-color" to="/profile">
              <FontAwesomeIcon icon={faUser} className="me-1" /> <br />
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
