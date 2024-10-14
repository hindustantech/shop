import React, { useContext, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DataContext } from '../DataContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Receipt = () => {

    // const [randomNumber, setRandomNumber] = useState(null);
    const { data } = useContext(DataContext);
    const [receipt, setReceipt] = useState(null);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);
    const { id } = useParams();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;





    // Function to generate a random number between 1 and 1000
    // const generateRandomNumber = () => {
    //     const randomNum = Math.floor(Math.random() * 1000) + 1;
    //     setRandomNumber(randomNum);
    // };
    // useEffect(() => {
    //     generateRandomNumber();
    // }, []);
    useEffect(() => {

        const fetchReceipt = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/depositReceipt/${id}`);
                setReceipt(response.data);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReceipt();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching receipt: {error.message}</div>;
    }

    const downloadPDF = () => {
        const input = document.getElementById('receipt'); // Get the receipt element
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png'); // Convert canvas to image
            const pdf = new jsPDF(); // Create a new jsPDF instance
            const imgWidth = 190; // Set the width of the image in the PDF
            const pageHeight = pdf.internal.pageSize.height; // Get the height of the page
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate image height
            let heightLeft = imgHeight; // Initialize remaining height

            let position = 0; // Initialize position

            // Add image to the PDF, with page breaks if necessary
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight; // Set position for the next page
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight; // Reduce remaining height
            }

            pdf.save('receipt.pdf'); // Save the PDF
        });
    };


    // Calculate the result
    const totalAmount = (receipt.amount - ((receipt.amount * 0.09) + (receipt.amount * 0.09)));

    return (
        <div className='receipt' >
            <div className="container my-4 " id='receipt'>
                <div className="border">
                    {/* Header */}
                    <div className="text-center mb-2">
                        <h5 style={{ fontSize: '14px', fontWeight: 'bold' }}>DIGICONCEPT TECHMEDIA PRIVATE LIMITED</h5>
                        <p style={{ fontSize: '12px' }}>
                            CIN: U93000MH2020PTC339780 <br />
                            EMAIL: digiconcept.mgt@gmail.com <br />
                            FLAT NO.02, OM SAI APT, PARTH COLONY, <br />
                            SHANTI NAGAR, MAKHAMALABAD,<br />
                            NASHIK - 422003 <br />
                            Mobile: 7350002556 <br />
                            GSTN: 27AAHCD7407Q1Z2
                        </p>
                    </div>

                    {/* Invoice Info */}
                    <div className="d-flex justify-content-between mb-2 mx-4">
                        <div>
                            <h4 style={{ fontSize: '12px' }}>INVOICE</h4>
                            <p style={{ fontSize: '12px' }}>Invoice #:{receipt.id}</p>
                        </div>
                        <div >
                            <h4 style={{ fontSize: '12px' }}>Date:</h4>
                            <p style={{ fontSize: '12px' }}>{receipt.date}</p>
                        </div>
                    </div>

                    {/* Bill To */}
                    <div className="border p-3 mb-4" style={{ fontSize: '12px' }}>
                        <p className='fw-bold' >BILL TO</p>
                        <p>{data?.user?.user?.first_name}</p>
                        <p>{data?.user?.user?.addres}</p>
                        <p>{data?.user?.user?.city}</p>
                        <p> {data?.user?.user?.mobile}</p>
                        <p>{data?.user?.user?.email1}</p>
                    </div>

                    {/* Description Table */}
                    <table className="table table-bordered mb-4" style={{ fontSize: '12px' }}>
                        <thead>
                            <tr>
                                <th>DESCRIPTION</th>
                                <th className="text-end">AMOUNT</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Service Fee</td>
                                <td className="text-end">{receipt.amount}</td>
                            </tr>
                            <tr>
                                <td> <p className="text-end">CGST</p>
                                    <p className="text-end">SGST</p>
                                </td>
                                <td>
                                    <p > {receipt.amount * 0.9}</p>
                                    <p >{receipt.amount * 0.9}</p>
                                </td>

                            </tr>
                            <tr>
                                <p>Thank you for your business! &nbsp; &nbsp;  Total Amount</p>
                                
                                <td className="text-end"> {totalAmount}</td>
                            </tr>



                        </tbody>
                    </table>
                </div>
            </div>
            {/* Download Button */}
            <button onClick={downloadPDF} className='down-r  '>
                Download Receipt
            </button>
        </div>
    );
};

export default Receipt;
