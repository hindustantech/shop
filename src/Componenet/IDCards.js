import React, { useContext, useRef } from 'react';
import Headers from './Headers';
import { DataContext } from '../DataContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';

const IDCards = () => {
    const { data } = useContext(DataContext);
    const imageurl = process.env.REACT_APP_IMAGE_BASE_URL;
    const idCardRef = useRef(); // Create a reference to the ID card container

    // Function to download the ID card as PNG
    const downloadAsPNG = () => {
        html2canvas(idCardRef.current, { scale: 2 }).then((canvas) => { // Increase scale for better resolution
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png'); // Convert canvas to image
            link.download = 'id_card.png'; // Specify the filename
            link.click(); // Simulate a click to trigger the download
        });
    };

    // Function to download the ID card as PDF
    // Function to download the ID card as PDF
    const downloadAsPDF = () => {
        html2canvas(idCardRef.current, { scale: 2 }).then((canvas) => { // Increase scale for better quality
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait mode, mm units, A4 size
            const imgWidth = pdf.internal.pageSize.getWidth(); // Get the width of the PDF page
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate the image height based on aspect ratio

            // Determine the height of the PDF page
            const pageHeight = pdf.internal.pageSize.getHeight();
            let heightLeft = imgHeight; // Remaining height
            let position = 0;

            // Add image to PDF
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight; // Reduce the remaining height

            // Create new pages if needed
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight; // Adjust position for new page
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight; // Update remaining height
            }

            pdf.save('id_card.pdf'); // Save the PDF
        });
    };


    return (
        <>
            <Headers Name="ID card" />
            <div className="maind-body-id">

                {/* ID Card Container */}
                <div className="body-main-card mt-2 mx-2" ref={idCardRef}>

                    {/* Company Header */}
                    <div className="heading-complogo-id mt-1 d-flex justify-content-center">
                        <img src="/asset/logo/1.png" className="l-id" alt="Company Logo" style={{ height: "40px" }} />
                        <div className="heading-name-id d-inline-block text-center ml-3">
                            <p className="text-white mb-0 heading-id">Digiconcept</p>
                            <p className="text-white mb-0 heading-id mx-2">Techmedia Pvt. Ltd.</p>
                        </div>
                    </div>

                    {/* User Profile Info */}
                    <div className="info-idcard d-flex justify-content-center">
                        <img className='mt-4' src={`${imageurl}/profile/${data?.user?.user?.image}`} alt="" />
                    </div>

                    {/* User Details */}
                    <div className="text-info-idcard mt-3 mx-3">
                        <div className="id-info">
                            <h1 className='text-center name-id'>{data?.user?.user?.first_name}</h1>
                            <div className="d-flex justify-content-space-between px-5 mx-3">
                                <p className='mb-0 px-1 profile-text-right'>ID No.</p>
                                <p className='mb-0 px-1 p-text-p'>: {data?.user?.user?.email}</p>
                            </div>
                            <div className="d-flex justify-content-space-between px-5 mx-3">
                                <p className='mb-0 px-1 profile-text-right'>Address</p>
                                <p className='mb-0 px-1 p-text-p'>: {data?.user?.user?.address}</p>
                            </div>
                            <div className="d-flex justify-content-space-between px-5 mx-3">
                                <p className='mb-0 px-1 profile-text-right'>Mobile No.</p>
                                <p className='mb-0 px-1 p-text-p'>: {data?.user?.user?.mobile}</p>
                            </div>
                        </div>

                        {/* Export Buttons */}

                    </div>
                </div>

                {/* Additional Information Section */}
                <div className="body-main-card mt-3 mx-2">
                    <div className="heading-complogo-id mt-2 d-flex justify-content-center">
                        <img src="/asset/logo/1.png" className="l-id" alt="Company Logo" style={{ height: "40px" }} />
                        <div className="heading-name-id d-inline-block text-center ml-3">
                            <p className="text-white mb-0 heading-id">Digiconcept</p>
                            <p className="text-white mb-0 heading-id mx-2">Techmedia Pvt. Ltd.</p>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className='mt-4 mx-3 terms-li-id'>
                        <ul className='mt-2'>
                            <li>This card is not transferable and must be produced whenever demanded</li>
                            <li>This card is to certify that the bearer whose name appears in front of this card is an associate of Digiconcept Techmedia Pvt. Ltd.</li>
                            <li> This is valid only till the time you remain a valid Digiconcept Techmedia Pvt. Ltd.</li>
                            <li>Anyone finding this card is requested to sent it to.</li>
                            <strong>Digiconcept Techmedia Pvt. Ltd.</strong>
                        </ul>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <button onClick={downloadAsPNG} className="exp mx-2">
                            <FontAwesomeIcon icon={faFileExport} /> PNG
                        </button>
                        <button onClick={downloadAsPDF} className="exp mx-2">
                            <FontAwesomeIcon icon={faFileExport} /> PDF
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default IDCards;
