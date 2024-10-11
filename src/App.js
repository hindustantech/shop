import './App.css';
import { Home } from './Componenet/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Shop } from './Componenet/Shop';
import SignUp from './Componenet/SignUp';
import Login from './Componenet/Login';
import Dashboard from './Componenet/Dashboard';
import Profile from './Componenet/Profile';
import EdditProfile from './Componenet/EdditProfile';
import Earn from './Componenet/Earn';
import ProfileDeatils from './Componenet/ProfileDeatils';
import { Toaster } from 'react-hot-toast';
import { Forgot } from './Componenet/Forgot';
import OTP from './Componenet/OTP';
import ChangePassword from './Componenet/ChangePassword';
import ForgotPasswod from './Componenet/ForgotPasswod';
import SucerityPin from './Componenet/SucerityPin';
import Notifications from './Componenet/Notifications';
import AccountSatlement from './Componenet/AccountSatlement';
import { KYC } from './Componenet/Kyc';
import ViewEvent from './Componenet/ViewEvent';
import ForgotSecurity from './Componenet/ForgotSucerityPin';
import IDCards from './Componenet/IDCards';
import SponsorReport from './Componenet/SponsorReport';
import ProductDeatis from './Componenet/ProductDeatis';
import AccountStatement from './AccountStatement';
import Withdraw from './Componenet/Withdraw';
import Activation from './Componenet/Activation'
import Deposit from './Componenet/Deposit'
import PackageActivationHistory from './Componenet/PackageActivationHistory';
import DepositHistory from './Componenet/DepositHistory';
import WithdrawHistory from './Componenet/WithdrawHistory';
import DownLine from './Componenet/DownLine';
import About from './Componenet/About';
import TermsAndConditions from './Componenet/TermsAndConditions ';
import Forgot_Spin from './Componenet/Forgot_Spin';
import OTPC from './Componenet/OTPC';
import Receipt from './Componenet/Receipt ';
import Welcome from './Componenet/Welcome';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path='/profileDetails' element={<ProfileDeatils />} />
          <Route path="/edditproile" element={<EdditProfile />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/OTP" element={<OTP />} />
          <Route path="/OTP2" element={<OTPC />} />
          <Route path="/forgotpassword" element={<ForgotPasswod />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/SecurityPin" element={<SucerityPin />} />
          <Route path="/Notification" element={<Notifications />} />
          <Route path="/Accountsatlement" element={<AccountSatlement />} />
          <Route path="/kyc" element={<KYC />} />
          <Route path="/ViewEvent" element={<ViewEvent />} />
          <Route path="/IDCards" element={<IDCards />} />
          <Route path="/ForgotSecurityPin" element={<ForgotSecurity />} />
          <Route path="/SponsorReport" element={<SponsorReport />} />
          <Route path="/AccountStatement" element={<AccountStatement />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/Activation" element={<Activation />} />
          <Route path="/Receipt/:id" element={<Receipt />} />
          <Route path="/Deposit" element={<Deposit />} />
          <Route path="/historyA" element={<PackageActivationHistory />} />
          <Route path="/historyD" element={<DepositHistory />} />
          <Route path="/historyW" element={<WithdrawHistory />} />
          <Route path="/DownLine" element={<DownLine />} />
          <Route path="/About" element={<About />} />
          <Route path="/Welcome" element={<Welcome/>} />
          <Route path="/Forgot_Spin" element={<Forgot_Spin />} />
          <Route path="/AbouTermsAndConditionst" element={<TermsAndConditions />} />
          <Route path="/signup/:email" element={<SignUp />} />
          <Route path="/ProductDeatis/:id" element={<ProductDeatis />} />
          

        </Routes>
      </Router>


    </>


  );
}

export default App;
