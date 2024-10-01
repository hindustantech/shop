import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faLock, faIdCard, faFileAlt, faBell, faSignOutAlt, faHistory, faMoneyCheckAlt, faMoneyBillWaveAlt, faListAlt, faCreditCard, faChartBar, faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initial state is false
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set true if token exists
  }, []);

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <img src="/asset/design/1.png" alt="logo" className='side-bar-logo' />
      <button className="close-btn-side" onClick={toggleSidebar}>
        X
      </button>

      {/* Register */}
      <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
        <Link to="/register" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faFileAlt} /> Register
          </p>
        </Link>
      </div>


      {/* Dashboard */}
      <div className="dasboard-sidebar mt-3 px-1  px-3 mx-2 mt-3  d-flex gap-3">
        <Link to="/dashboard" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faChartBar} /> Dashboard
          </p>
        </Link>
      </div>

      {/* Sponsor Report */}
      <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
        <Link to="/SponsorReport" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faClipboardList} /> Drirect Report
          </p>
        </Link>
      </div>
      <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
        <Link to="/DownLine" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faClipboardList} /> DownLine Report
          </p>
        </Link>
      </div>

      {/* Accordion - Profile */}
      <div className="accordion mt-3 mb-1 px-1 mx-1 " id="accordionExample h-10">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              <FontAwesomeIcon className='px-2' icon={faUser} /> Profile
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse  px-1"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample1"
          >
            <div className="accordion-body">
              <ul className="list-styliig">
                <Link className="link-none" to="/profile">
                  <li className="list-profile-sidebar mt-3">
                    <FontAwesomeIcon className='px-2' icon={faUser} /> View Profile
                  </li>
                </Link>
                <Link className="link-none" to="/profileDetails">
                  <li className="list-profile-sidebar mt-3">
                    <FontAwesomeIcon className='px-2' icon={faUser} /> Profile Details
                  </li>
                </Link>
                <Link className="link-none" to="/editProfile">
                  <li className="list-profile-sidebar mt-3">
                    <FontAwesomeIcon className='px-2' icon={faUser} /> Edit Profile
                  </li>
                </Link>
                <Link className="link-none" to="/ChangePassword">
                  <li className="list-profile-sidebar mt-3">
                    <FontAwesomeIcon className='px-2' icon={faKey} /> Change Password
                  </li>
                </Link>
                <Link className="link-none" to="/SecurityPin">
                  <li className="list-profile-sidebar mt-3">
                    <FontAwesomeIcon className='px-2' icon={faLock} /> Security PIN
                  </li>
                </Link>
                <Link className="link-none" to="/ForgotSecurityPin">
                  <li className="list-profile-sidebar mt-3">
                    <FontAwesomeIcon className='px-2' icon={faLock} /> Forgot Security PIN
                  </li>
                </Link>
                <Link className="link-none" to="/IDCards">
                  <li className="list-profile-sidebar mt-3">
                    <FontAwesomeIcon className='px-2' icon={faIdCard} /> ID Card
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* KYC */}
      <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
        <Link to="/kyc" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faIdCard} /> KYC
          </p>
        </Link>
      </div>

      {/* Account Statement */}
      <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
        <Link to="/AccountStatement" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faFileAlt} /> Account Statement
          </p>
        </Link>
      </div>

      {/* Event */}
      <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
        <Link to="/ViewEvent" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faListAlt} /> View Event
          </p>
        </Link>
      </div>

      {/* Notifications */}
      <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
        <Link to="/Notification" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faBell} /> Notification
          </p>
        </Link>
      </div>


      {/* Activation */}
      <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
        <Link to="/Activation" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faBell} /> Activation
          </p>
        </Link>
      </div>

      {/* Withdraw */}
      <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
        <Link to="/withdraw" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faCreditCard} /> Withdraw
          </p>
        </Link>
      </div>
      {/* History Links */}
      <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
        <Link to="/historyA" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faHistory} /> Activation Package History
          </p>
        </Link>
      </div>

      <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
        <Link to="/historyD" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faMoneyCheckAlt} /> Deposit History
          </p>
        </Link>
      </div>

      <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3 ">
        <Link to="/historyW" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faMoneyBillWaveAlt} /> Withdraw History
          </p>
        </Link>
      </div>



      {/* Logout */}
      <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3 mb-2">
        <button className="link-none Logout-btn" onClick={handleLogout}>
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faSignOutAlt} /> Logout
          </p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
