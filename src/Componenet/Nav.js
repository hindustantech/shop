import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    
    <nav className="navbar bg-body-tertiary nav-height ">
      <div className="container  ">

        <ul className="navbar-nav d-flex flex-row flex-md-row justify-content-around w-100">
          <li className="nav-item ">
            <NavLink 
              className="nav-link text-center text-color" 
              to="/" 
              activeClassName="active"
            >
              <i className="fa fa-home" aria-hidden="true"></i>
              
              Home
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink 
              className="nav-link text-center text-color" 
              to="/shop" 
              activeClassName="active"
            >
              <i className="fa-solid fa-shop"></i> 
              Shop
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink 
              className="nav-link text-center text-color" 
              to="/dashboard" 
              activeClassName="active"
            >
              <i className="fa fa-tachometer" aria-hidden="true"></i>
               
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink 
              className="nav-link text-center text-color" 
              to="/profile" 
              activeClassName="active"
            >
              <i className="fa-solid fa-user"></i> 
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
