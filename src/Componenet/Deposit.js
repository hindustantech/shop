import React, { useContext, useEffect, useState } from 'react';
import Headers from './Headers';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Deposit = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState('');
  const [receipt, setReceipt] = useState('');
  const [tpin, setTpin] = useState('');
  const [amount, setAmount] = useState('');
  const [fileValid, setFileValid] = useState(true);
  const [copied, setCopied] = useState(false);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const apiimageUrl = process.env.REACT_APP_IMAGE_BASE_URL;

  // Set INR as default deposit currency
  const [depositeCurrency, setdepositeCurrency] = useState('inr'); 

  const fetchData = async () => {
    try {
      const id = localStorage.getItem('id');
      const response = await axios.get(`${apiBaseUrl}/homepageapi/${id}`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'receipt' && files.length > 0) {
      const selectedFile = files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        setFileValid(true);
        setReceipt(selectedFile);
      } else {
        setFileValid(false);
        e.target.value = null;
        return;
      }
    }
    if (name === 'amount') setAmount(value);
    else if (name === 'tpin') setTpin(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle deposit logic only for INR
      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('id', data.user.user.id);
      formData.append('tpin', tpin);
      formData.append('depositeCurrency', depositeCurrency);
      if (receipt) {
        formData.append('receipt', receipt);
      }

      if (amount < 500) {
        toast.error('Please Enter an amount greater than 500');
        return;
      }

      const response = await axios.post(`${apiBaseUrl}/make_deposite`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('You will receive your deposit amount within 1 hour');
      navigate('/');
      fetchData();
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      navigate('/Deposit');
    }
    fetchData();
  }, []);

  const copyToClipboard = () => {
    const textToCopy = data?.qr_image[1]?.address;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch((error) => console.error('Could not copy text: ', error));
    } else {
      const textField = document.createElement('textarea');
      textField.innerText = textToCopy;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return <p>LOADING.....</p>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Headers Name="Deposit Funds" />
      <div className="deposit-main">
        <div className="card-deposit ">
          <h4 className="text-center color-text-de fw-bold">Deposit</h4>
          <hr />

          <form className='mt-2' onSubmit={handleSubmit} encType="multipart/form-data">
           
            <div className="Amt-Dep from-group">
              <input
                type="text"
                className="atm-d"
                id="amount"
                name="amount"
                placeholder="Enter Amount"
                value={amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row m-3">
              <button type="button" className="col withdraw-btn amount-short-btn p-1 m-1" onClick={() => setAmount('5000')}>5000</button>
              <button type="button" className="col withdraw-btn amount-short-btn p-1 m-1" onClick={() => setAmount('10000')}>10000</button>
              <button type="button" className="col withdraw-btn amount-short-btn p-1 m-1" onClick={() => setAmount('25000')}>25000</button>
              <button type="button" className="col withdraw-btn amount-short-btn p-1 m-1" onClick={() => setAmount('50000')}>50000</button>
            </div>

            <div className="Amt-Dep from-group row qr">
              <center>
                <img src={`${apiimageUrl}/qrcode/${data?.qr_image[1]?.qr}`} className="qr-img" alt="frame" style={{ width: '180px' }} />
              </center>
              <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                <div style={{ wordWrap: 'break-word', maxWidth: '75%' }}>Address: {data?.qr_image[1]?.address}</div>
                {!copied && (
                  <button className="btn d-flex btn-link" style={{ textDecoration: 'none', color: 'black' }} onClick={copyToClipboard}>
                    Copy
                  </button>
                )}
                {copied && <span className="text-success">Copied!</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="receipt" className="form-label px-3">Payment Receipt</label>
              <div className="Amt-Dep from-group">
                <input
                  type="file"
                  className="form-control-new"
                  id="receipt"
                  name="receipt"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleChange}
                  style={{ border: 'none' }}
                  required
                />
              </div>
              {!fileValid && <div className="text-danger">Please select a valid image file (JPEG, PNG, JPG)</div>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="tpin" className="form-label px-3" style={{ color: 'black' }}>Enter your Transaction Hash</label>
              <div className="Amt-Dep from-group">
                <input
                  type="text"
                  className="transaction-note"
                  id="tpin"
                  name="tpin"
                  placeholder="Enter your Transaction Hash"
                  onChange={handleChange}
                  style={{ border: 'none' }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="withdraw-btn short-btn w-100 br-50" style={{ color: 'white' }}>Deposit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Deposit;
