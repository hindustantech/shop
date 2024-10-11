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
                console.log(response.data)
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


    return (
        <div>
            <div
                id="receipt" // Set id for the receipt to capture it
                className="invoice-box"
                style={{ maxWidth: '800px', margin: 'auto', padding: '30px', border: '1px solid #eee', boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)', fontSize: '16px', lineHeight: '24px', color: '#555' }}
            >
                <table style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                    <tr className="top">
                        <td colSpan="2" style={{ paddingBottom: '20px' }}>
                            <table style={{ border: '1px solid #ddd', width: '100%' }}>
                                <tr>
                                    <td className="title" style={{ fontSize: '45px', lineHeight: '45px', color: '#333' }}>
                                        <img
                                            src="/asset/logo/1.png"
                                            alt="Company logo"

                                            style={{ maxHeight: '70px' }}
                                        />
                                    </td>

                                    <td style={{ fontSize: '14px' }}>
                                        Receipt : {receipt.id}<br />
                                        Created: {receipt.created_at}<br />

                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr className="information">
                        <td colSpan="2" style={{ paddingBottom: '40px', fontSize: '14px' }}>
                            <table style={{ border: '1px solid #ddd', width: '100%' }}>
                                <tr>
                                    <td style={{ border: '1px solid #ddd' }}>
                                      <b>  Digiconcept </b> <br />


                                    </td>

                                    <td style={{ border: '1px solid #ddd' }}>

                                       <strong className='mx-2'> {data?.user?.user?.first_name} </strong><br />
                                       <strong className='mx-2'> {data?.user?.user?.email1}</strong>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr className="heading">
                        <td style={{ border: '1px solid #ddd', backgroundColor: '#f8f8f8', fontWeight: 'bold' }}>Deposit</td>
                        <td style={{ border: '1px solid #ddd', backgroundColor: '#f8f8f8', fontWeight: 'bold' }}>Amount</td>
                    </tr>

                    <tr className="item">
                        <td style={{ border: '1px solid #ddd' }}>Dposit Amount</td>
                        <td style={{ border: '1px solid #ddd' }}>₹ {receipt.amount}</td>
                    </tr>

                    <tr className="item">
                        <td style={{ border: '1px solid #ddd' }}>GST</td>
                        <td style={{ border: '1px solid #ddd' }}>₹ {receipt.amount} </td>
                    </tr>



                    <tr className="total">
                        <td></td>
                        <td style={{ borderTop: '2px solid #eee', fontWeight: 'bold' }}>Total: ₹ {receipt.amount}</td>
                    </tr>
                </table>
            </div>

            {/* Download Button */}
            <button onClick={downloadPDF} className='down-r  '>
                Download Receipt
            </button>
        </div>
    );
};

export default Receipt;
