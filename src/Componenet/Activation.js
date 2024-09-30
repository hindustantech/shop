import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Headers from './Headers';
import axios from 'axios';
import toast from 'react-hot-toast';
const Activation = () => {
  // Correct the useState syntax to use square brackets
  const [data, setData] = useState(null); // Changed Data to data
  const [error, setError] = useState(null); // Changed Error to error
  const [loading, setLoading] = useState(true); // Changed Loading to loading
  const [amount, setAmount] = useState('');
  const [tpin, setTpin] = useState('');
  const [activateid, setActivateid] = useState(null);
  const [input_amount, setInput_Amount] = useState();
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleAmountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setInput_Amount(value);
  };

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

  const fetchData1 = async (refferalid) => {
    try {
      const id = localStorage.getItem('id');
      const response = await axios.get(`${apiBaseUrl}/homepageapi/${id}`);
      const userData = response.data.getalluser;
      console.log(response.data)
      let found = false;

      userData.forEach(user => {
        if (user.email === refferalid) {
          found = true;
        }
      });

      if (found) {
        toast.success("ID Found");
      } else {
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
    if (name === 'amount') setAmount(value);
    else if (name === 'tpin') setTpin(value);
    else if (name === 'refferalid') setActivateid(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const amount = parseInt(input_amount, 10);
      if (amount >= 4000 && amount % 4000 === 0) {
        const formData = new FormData();
        formData.append('amount', input_amount);
        formData.append('id', data.user.user.id); // Changed Data to data
        formData.append('tpin', tpin);
        formData.append('acitvateid', activateid);

        if (amount < 1000) {
          toast('Please Enter the amount greater than 1000');
          return;
        }

        const response = await axios.post(`${apiBaseUrl}/activate_package`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data)
        toast.success('Package Activated Successfully');
        fetchData();
        navigate('/activation');
      } else {
        toast.success('Amount Should be greater than 5000 and multiple of 5000');
      }
    } catch (error) {
      toast.error('Something went wrong. Package not Activated');

    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token == null) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (data && data.user && data.user.email) {
      setActivateid(data.user.email);
      fetchData1(data.user.email);
    }
  }, [data]);

  const handleReferral = (e) => {
    const { name, value } = e.target;
    if (name === 'refferalid') {
      fetchData1(value);
      setActivateid(value);
    }
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
            <p className="text-center font-size-name Withdraw-heading ">
              User Name:  {data && data.user && data.user.name ? data.user.name : "User name not available"}
            </p>
            <input
              type="text"
              className='text-center userid-A Withdraw-heading mt-3'
              id="refferalid"
              name="refferalid"
              defaultValue={data && data.user && data.user.email}
              placeholder="Enter Your Refferal Id"
              onChange={handleChange}
              onBlur={handleReferral}
            />
            <p className="text-center check-user-id Withdraw-heading">Check User ID</p>
            <p className="text-center mt-4 Withdraw-heading fw-bold">Available Balance</p>

            <input
              type="text"
              className='text-white  package-card-price-section mt-2'
              id="totalbalance"
              name="totalbalance"
              defaultValue={data && data.wallet && data.wallet.activation_wallet}
              readOnly
            />


            <input
              type="number"
              className="text-center userid-A Withdraw-heading  mt-3"
              id="activate_package"
              name="activate_package"
              placeholder="Enter Amount"
              value={input_amount}
              onChange={handleAmountChange}
            />


            <div className="form-group mb-3">
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
