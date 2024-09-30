import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faLock, faIdCard, faFileAlt, faBell } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
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
     
        <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
          <Link to="/register" className="link-none">
            <p className="mt-2 text-aling-center">
              <FontAwesomeIcon className="mx-2 mt-2" icon={faFileAlt} /> Register
            </p>
          </Link>
        </div>
        <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
          <Link to="/historyA" className="link-none">
            <p className="mt-2 text-aling-center">
              <FontAwesomeIcon className="mx-2 mt-2" icon={faFileAlt} /> Activation _packge history
            </p>  
          </Link>
        </div>
        <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
          <Link to="/historyD" className="link-none">
            <p className="mt-2 text-aling-center">
              <FontAwesomeIcon className="mx-2 mt-2" icon={faFileAlt} /> Deposite History
            </p>
          </Link>
        </div>
        <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
          <Link to="/historyW" className="link-none">
            <p className="mt-2 text-aling-center">
              <FontAwesomeIcon className="mx-2 mt-2" icon={faFileAlt} /> WithdrawHistory
            </p>
          </Link>
        </div>
     
          <div className="dasboard-sidebar mt-3 px-1  px-3 mx-2 mt-3  d-flex gap-3">
            <Link to="/dashboard" className="link-none">
              <p className="mt-2 text-aling-center">
                <FontAwesomeIcon className="mx-2 mt-2" icon={faUser} /> Dashboard
              </p>
            </Link>
          </div>

          <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
            <Link to="/SponsorReport" className="link-none">
              <p className="mt-2 text-aling-center">
                <FontAwesomeIcon className="mx-2 mt-2" icon={faIdCard} /> Sponsor Report
              </p>
            </Link>
          </div>

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
                    <Link className="link-none " to="/profile" >
                      <li className="list-profile-sidebar mt-3">
                        <FontAwesomeIcon className='px-2' icon={faUser} /> View Profile
                      </li>
                    </Link>
                    <Link className="link-none " to="/profileDeatils" >
                      <li className="list-profile-sidebar mt-3">
                        <FontAwesomeIcon className='px-2' icon={faUser} />  Profile Deatils
                      </li>
                    </Link>
                    <Link className="link-none " to="/edditproile" >
                      <li className="list-profile-sidebar mt-3">
                        <FontAwesomeIcon className='px-2' icon={faUser} /> Edit  Profile 
                      </li>
                    </Link>

                    <Link className="link-none " to="/ChangePassword">
                      <li className="list-profile-sidebar mt-3">
                        <FontAwesomeIcon className='px-2' icon={faKey} /> Change Password
                      </li>
                    </Link>
                    <Link className="link-none " to="/sucerityPin">
                      <li className="list-profile-sidebar mt-3">
                        <FontAwesomeIcon className='px-2' icon={faLock} /> Security PIN
                      </li>
                    </Link>

                    <Link className="link-none " to="/ForgotSecurity">
                      <li className="list-profile-sidebar mt-3">
                        <FontAwesomeIcon className='px-2' icon={faLock} /> Forgot Security PIN
                      </li>
                    </Link>
                    <Link className="link-none " to="/IDCards">
                      <li className="list-profile-sidebar mt-3">
                        <FontAwesomeIcon className='px-2' icon={faIdCard} /> ID Card
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
            <Link to="/kyc" className="link-none">
              <p className="mt-2 text-aling-center">
                <FontAwesomeIcon className="mx-2 mt-2" icon={faIdCard} /> KYC
              </p>
            </Link>
          </div>


          <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
            <Link to="/AccountStatement" className="link-none">
              <p className="mt-2 text-aling-center">
                <FontAwesomeIcon className="mx-2 mt-2" icon={faFileAlt} /> Account Statement
              </p>
            </Link>
          </div>

          <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
            <Link to="/ViewEvent" className="link-none">
              <p className="mt-2 text-aling-center">
                <FontAwesomeIcon className="mx-2 mt-2" icon={faFileAlt} /> View Event
              </p>
            </Link>
          </div>

          <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
            <Link to="/Notification" className="link-none">
              <p className="mt-2 text-aling-center">
                <FontAwesomeIcon className="mx-2 mt-2" icon={faBell} /> Notification
              </p>
            </Link>
          </div>
          <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
            <Link to="/Activation" className="link-none">
              <p className="mt-2 text-aling-center">
                <FontAwesomeIcon className="mx-2 mt-2" icon={faBell} /> Activation
              </p>
            </Link>
          </div>
          <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
            <Link to="/withdraw" className="link-none">
              <p className="mt-2 text-aling-center">
                <FontAwesomeIcon className="mx-2 mt-2" icon={faBell} /> withdraw
              </p>
            </Link>
          </div>
          <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2  d-flex gap-3">
            <Link to="/Deposit" className="link-none">
              <p className="mt-2 text-aling-center">
                <FontAwesomeIcon className="mx-2 mt-2" icon={faBell} /> Deposit
              </p>
            </Link>
          </div>
          <div className="dasboard-sidebar mt-3 px-1 mt-2  px-3 mx-2 mb-2  d-flex gap-3 ">
            <Link to="/Login" className="link-none">
              <p className="mt-2 text-aling-center" onClick={handleLogout}>
                <FontAwesomeIcon className="mx-2 mt-2" icon={faBell} /> Logout
              </p>
            </Link>
          </div>
       
    </div>
  );
};

export default Sidebar;
