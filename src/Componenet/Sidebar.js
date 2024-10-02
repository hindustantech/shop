import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faLock, faIdCard, faFileAlt, faBell, faSignOutAlt, faHistory, faMoneyCheckAlt, faMoneyBillWaveAlt, faListAlt, faCreditCard, faChartBar, faClipboardList, faUserGroup } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { DataContext } from '../DataContext';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const { data } = useContext(DataContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initial state is false
  const navigate = useNavigate();
  const imageurl = process.env.REACT_APP_IMAGE_BASE_URL;
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
      <img src="/asset/design/1.png" alt="logo" className='side-bar-logo' style={{height:"70px"}} />

      <button className="close-btn-side" onClick={toggleSidebar}>
        X
      </button>
      <div className="profile-name d-flex justify-content-center align-items-center mt-2 "  style={{background:"white"}}>
        <img src={`${imageurl}/profile/${data && data.user.user && data.user.user.image}`}

          style={{
            height: '60px',  // Set desired height
            width: '60px',   // Set desired width
            borderRadius: '50%', // Makes the image circular
            objectFit: 'cover' // Ensures the image covers the entire area without distortion
          }} alt="" className="profile-deatils-img" />
        <div className="detail px-3 mb-0">
          <p className="sponser_id mb-0">
            ID : <span>{data?.user?.user?.email}</span>
          </p>
          <p className="sponser_name mb-0">
            Name : <span>{data?.user?.user?.first_name}</span>
          </p>
        </div>
      </div>
      {/* Register */}
      <div className="dasboard-sidebar mt-3 px-1 px-3 mx-2 d-flex gap-3">
        <Link to="/register" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faFileAlt} /> Register
          </p>
        </Link>


      </div>

      {/* Accordion - Profile */}
      <div className="accordion mt-3 mb-1 px-1 mx-1" id="accordionExample">
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
            className="accordion-collapse collapse px-1"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
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
                  <img src="/icon/Profiledetail.png" style={{height:"18px"}} alt=""  className='mx-2'/>  Profile Details
                  </li>
                </Link>
                <Link className="link-none" to="/edditproile">
                  <li className="list-profile-sidebar mt-3">
                  <img src="/icon/profileedit.png" style={{height:"22px"}} alt="" className='mx-2' /> Edit Profile
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

      {/* Dashboard */}
      <div className="dasboard-sidebar mt-3 px-1 px-3 mx-2 d-flex gap-3">
        <Link to="/dashboard" className="link-none">
          <p className="mt-2 text-align-center">
            <FontAwesomeIcon className="mx-2 mt-2" icon={faChartBar} /> Dashboard
          </p>
        </Link>
      </div>

      {/* My Team */}
      <div className="accordion mt-3 mb-1 px-1 mx-1" id="accordionExample2">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <FontAwesomeIcon className="mx-2" icon={faUserGroup} /> My Team
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse px-1"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample2"
          >
            <div className="accordion-body">
              <ul className="list-styliig">
                <Link to="/DownLine" className="link-none">
                  <li className="mt-2 text-align-center">
                    <FontAwesomeIcon className="mx-2 mt-2" icon={faClipboardList} /> DownLine Report
                  </li>
                </Link>
                <Link to="/SponsorReport" className="link-none">
                  <li className="mt-2 text-align-center">
                    <FontAwesomeIcon className="mx-2 mt-2" icon={faClipboardList} /> Direct Report
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit */}
      <div className="dasboard-sidebar mt-3 px-1 px-3 mx-2 d-flex gap-3">
        <Link to="/Deposit" className="link-none">
          <p className="mt-2 text-align-center">
          <img src="/icon/deposit.png" style={{height:"22px"}} alt=""className='mx-2' /> Deposit
          </p>
        </Link>
      </div>

      {/* Activation */}
      <div className="dasboard-sidebar mt-3 px-1 px-3 mx-2 d-flex gap-3">
        <Link to="/Activation" className="link-none">
          <p className="mt-2 text-align-center">
          <img src="/icon/activation.png" style={{height:"22px"}} alt="" className='mx-2'/> Activation
          </p>
        </Link>
      </div>

      {/* Withdraw */}
      <div className="dasboard-sidebar mt-3 px-1 px-3 mx-2 d-flex gap-3">
        <Link to="/withdraw" className="link-none">
          <p className="mt-2 text-align-center">
          <img src="/icon/withdrawal.png" style={{height:"22px"}} alt="" className='mx-2' /> Withdraw
          </p>
        </Link>
      </div>

      {/* History Links */}
      <div className="dasboard-sidebar mt-3 px-1 px-3 mx-2 d-flex gap-3">
        <Link to="/historyA" className="link-none">
          <p className="mt-2 text-align-center">
          <img src="/icon/activationhistory.png" style={{height:"22px"}} alt="" className='mx-2' /> Activation Package History
          </p>
        </Link>
      </div>
      <div className="dasboard-sidebar mt-3 px-1 px-3 mx-2 d-flex gap-3">
        <Link to="/historyD" className="link-none">
          <p className="mt-2 text-align-center">
            <img src="/icon/deposithistory.png" style={{height:"22px"}} alt=""className='mx-2'  /> Deposit History
          </p>
        </Link>
      </div>
      <div className="dasboard-sidebar mt-3 px-1 px-3 mx-2 d-flex gap-3">
        <Link to="/historyW" className="link-none">
          <p className="mt-2 text-align-center">
          <img src="/icon/withdrawalhistory.png" style={{height:"22px"}} alt="" className='mx-2'/> Withdraw History
          </p>
        </Link>
      </div>
      <div className="dasboard-sidebar mt-3 px-1 px-3 mx-2 d-flex gap-3">
        <Link to="/AccountStatement" className="link-none">
          <p className="mt-2 text-align-center">
          <img src="/icon/accountstatement.png" style={{height:"22px"}} alt=""className='mx-2' /> AccountStatement
          </p>
        </Link>
      </div>
      <div className="dasboard-sidebar mt-3 px-1 px-3 mx-2 d-flex gap-3">
        <Link to="/kyc" className="link-none">
          <p className="mt-2 text-align-center ">
          <img src="/icon/kyc.png" style={{height:"22px"}} alt=""className='mx-2' /> KYC
          </p>
        </Link>
      </div>

      {/* Logout */}
      {isAuthenticated && (
        <div className="dasboard-sidebar mt-3 px-1 px-3 mx-2 d-flex gap-3 mb-2">
          <Link to="#" className="link-none" onClick={handleLogout}>
            <p className="mt-2 text-align-center">
              <FontAwesomeIcon className="mx-2 mt-2" icon={faSignOutAlt} /> Logout
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
