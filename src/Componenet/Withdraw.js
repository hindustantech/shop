import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Headers from './Headers';

const Withdraw = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const [recMetrics, setRecMetrics] = useState([0, 0, 0]);
    const [amount, setAmount] = useState('');
    const [deductedAmount, setDeductedAmount] = useState('');
    const [password, setPassword] = useState('');
    const [withdrawalCurrency, setwithdrawalCurrency] = useState('inr'); // Set default currency to INR
    const [id, setId] = useState('');
    const [upi, setUpi] = useState('');

    // Fetching Data
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'amount') {
            setAmount(value);
            const actualAmount = parseFloat(value) * 0.10;
            const amountToGive = parseFloat(value) - actualAmount;
            setDeductedAmount(isNaN(amountToGive) ? '' : amountToGive.toFixed(2)); // Calculate and set deducted amount
        }
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            const actual_amount = amount * 0.10;
            const amount_to_gave = amount - actual_amount;
            formData.append('amount', amount_to_gave);
            formData.append('password', password);
            formData.append('withdrawalCurrency', withdrawalCurrency);
            formData.append('id', data.user.user.email);

            const response = await axios.post(`${apiBaseUrl}/payment_withdraw`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Headers Name="Withdraw Funds" />
            <div className="withdraw-main">
                <div className="card-withdraw mx-2">
                    <h4 className="text-center fw-bold Withdraw-heading">Withdraw</h4>
                    <hr />
                    <p className="text-center Withdraw-heading">Balance to Withdraw</p>
                    <p className="balance-w text-white">
                        Total Balance <br />
                        {Number(data && data.wallet && data.wallet.total_income).toFixed(2)}
                    </p>

                    <form className="withdraw-form mt-3" onSubmit={handleSubmit}>
                        <div className="amt-w">
                            <label htmlFor="amount" className="form-label px-1">Amount</label>
                            <input
                                type="text"
                                className="form-input-amount"
                                id="amount"
                                name="amount"
                                placeholder="Enter Amount"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="hidden"
                                className="form-control-new"
                                id="id"
                                name="id"
                                value={data.user.email}
                            />
                        </div>
                        <p className="text-center max-min mt-2">min $1000 | max $10000</p>
                        <div className="d-flex mt-2">
                            <label htmlFor="deducted_amount" className="dedu">Deducted Amount</label>
                            <input
                                type="text"
                                className="deduction"
                                id="deducted_amount"
                                name="deducted_amount"
                                value={deductedAmount}
                                readOnly
                            />
                        </div>

                        <div className="form-group mb-3 mt-3">
                            <label htmlFor="withdrawalCurrency" className="form-label" style={{ color: 'black' }}>Withdrawal Currency:</label>
                            <div className="form-input">
                                <input
                                    type="text"
                                    className="form-control"
                                    value="INR"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label" style={{ color: 'black' }}>Enter Your Password:</label>
                            <div className="form-input">
                                <input
                                    type="password"
                                    className="password-wi"
                                    id="password"
                                    name="password"
                                    placeholder="Enter Your Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="form-input" style={{ color: 'black' }}>
                                Bank Name: {data.user.user.bank_name}<br />
                                Bank Account Number: {data.user.bank_acc_no}<br />
                                Bank IFSC code: {data.user.bank_ifsc}<br />
                            </div>
                        </div>

                        <button type="submit" className="short-btn otp-btn mt-4 w-100" style={{ color: 'white' }}>Withdraw</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Withdraw;
