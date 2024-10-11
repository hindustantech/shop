import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Headers from './Headers';
import axios from 'axios';
import toast from 'react-hot-toast';

const Activation = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [referralUserName, setReferralUserName] = useState('');
  const [referralUserEmail, setReferralUserEmail] = useState('');
  const [tpin, setTpin] = useState('');
  const [acitvateid, setActivateid] = useState('');
  const [input_amount, setInput_Amount] = useState('');
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const fetchData = async () => {
    try {
      const id = localStorage.getItem('id');
      const response = await axios.get(`${apiBaseUrl}/homepageapi/${id}`);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData1 = async (referralid) => {
    try {
      const id = localStorage.getItem('id');
      const response = await axios.get(`${apiBaseUrl}/homepageapi/${id}`);
      const userData = response.data.getalluser;

      const foundUser = userData.find(user => user.email === referralid);

      if (foundUser) {
        setReferralUserName(foundUser.first_name);
        setReferralUserEmail(foundUser.email);
        toast.success("ID Found");
      } else {
        setReferralUserName('');
        toast.error("ID NOT Found");
      }
    } catch (error) {
     
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount') setInput_Amount(value);
    else if (name === 'tpin') setTpin(value);
    else if (name === 'refferalid') setActivateid(value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const amount = parseInt(input_amount, 10); // Convert input_amount to an integer
      

      if (isNaN(amount)) {
        toast.error('Invalid amount. Please check your input.');
        return;
      }

      const formData = new FormData();
      formData.append('amount', input_amount);
      formData.append('id', data.user.user.email); // Correct ID field
      formData.append('tpin', tpin);
      formData.append('acitvateid', acitvateid); // Fix typo here

      
      const response = await axios.post(`${apiBaseUrl}/activate_package`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',

        },
      });

      toast.success('Package Activated Successfully');

      // Clear product data from local storage
      localStorage.removeItem('cart');

      // Refresh user data
      fetchData();
      navigate('/');

    } catch (error) {
      toast.error('Something went wrong. Package not Activated');
    }
  };



  useEffect(() => {
    // Replace icons after component is mounted

    const token = localStorage.getItem('id');
    if (token == null) {

      navigate('/login');

    } else {
      navigate('/activation');
    }


    fetchData();
    const product = JSON.parse(localStorage.getItem('cart'));
     // Log the product data for debugging
    if (product && product.length > 0) {
      setProductData(product[0]); // Get the first item
      setInput_Amount(product[0].price); // Set the input_amount to the product price
    }

    // Clear product data if it already exists
    if (product) {
      localStorage.removeItem('cart'); // Clear it to prevent duplication
    }
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token == null) {
  //     navigate('/login');
  //   } else {
  //     fetchData();
  //   }

  //   // Fetch product data from local storage

  // }, []);

  useEffect(() => {
    if (data && data.user.user && data.user.user.email) {
      setActivateid(data.user.user.email);
      // Optionally, fetch data when activating ID
    }
  }, [data]);

  const handleReferral = (e) => {
    const { name, value } = e.target;



    if (name === 'refferalid') {
      fetchData1(value);
      setActivateid(value); // Call fetchData only when referral ID changes
    }

    setActivateid(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Headers Name="Package Activate" />
      <div className="activation-page">
        <div className="card-activate mx-4">
          <h4 className="text-center Withdraw-heading fw-bold">Package Activate</h4>
          <hr />

          <form className="select-package" onSubmit={handleSubmit}>
            <p className="text-center check-user-id Withdraw-heading">Check User ID</p>
            <input
              type="text"
              className='text-center userid-A Withdraw-heading mt-3'
              id="refferalid"
              name="refferalid"
              placeholder="Enter ID To Activation"
              onChange={handleChange}
              onBlur={handleReferral}
            />
            <p className="text-center font-size-name Withdraw-heading ">
              User Name: {referralUserName}
            </p>

            <p className="text-center mt-4 Withdraw-heading fw-bold">Available Balance</p>

            <input
              type="text"
              className='text-white package-card-price-section mt-2'
              id="totalbalance"
              name="totalbalance"
              defaultValue={data && data.wallet && data.wallet.activation_wallet}
              readOnly
            />

            <input
              type="hidden"
              className='text-white package-card-price-section mt-2'
              id="id"
              name="id"
              value={data && data.user.user && data.user.user.email}
              readOnly
            />

            {productData && (
              <div>
                <h5 className='mt-2'>Product Name: {productData.productName}</h5>

                <input
                  type="number"
                  className="text-center userid-A Withdraw-heading mt-3"
                  placeholder="Amount"
                  name="activate_package"
                  value={input_amount} // Set value to input_amount
                  readOnly // Make it read-only to prevent manual entry
                  style={{ width: "100%" }}
                />
              </div>
            )}

            <div className="form-group mb-3 mt-3">
              <label htmlFor="tpin" className="form-label" style={{ color: 'black' }}>
                Enter Password
              </label>
              <div className="form-input">
                <input
                  type="text"
                  className="password-filed-a"
                  id="tpin"
                  name="tpin"
                  placeholder="Enter your Password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type='submit' className="activate-btn text-center mt-5" style={{ color: 'white' }}>
              Activate
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Activation;
