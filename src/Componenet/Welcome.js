import React, { useContext, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Headers from './Headers';
import { DataContext } from '../DataContext';

const WelcomeLetter = React.forwardRef((props, ref) => {


    const { data } = useContext(DataContext);
    return (
        <>
            <Headers Name="Welcome Letter" style={{ height: '300px' }} />
            <div >
                <div ref={ref} className="letter mx-2 mt-5">
                    <div className="heading-letter mt-2">
                    <p style={{ fontSize: '12px', fontWeight: 'bold' }} className="text-end mx-4">DIGICONCEPT TECHMEDIA PRIVATE LIMITED</p>
                        <p className="text-end mx-4">
                            FLAT NO.02, OM SAI APT, PARTH COLONY, <br /> 
                            SHANTI NAGAR, MAKHAMALABAD, </p>

                        <p className="text-end mx-4">Website: www.DigiConcept.com </p>
                        <p className="text-end mx-4">
                            CIN: U93000MH2020PTC339780 <br />
                            EMAIL: digiconcept.mgt@gmail.com
                        </p> 
                    </div>

                    <div className='welo mt-2'>
                        <h4 className="text-center mx-3 mb-1 pt-2 " style={{ height: '30px' }}>Congratulations! Welcome to the Family</h4>
                        <p className='text-center px-3 '>We are thrilled to have you join us on our mission to deliver innovative!</p>
                    </div>

                    <div className="content-welcome mx-4 ">
                        <h2 className='name-wel'>{data && data.user.user && data.user.user.first_name},</h2>
                        <p>
                            At DigiConcept Pvt. Ltd., we value creativity, collaboration, and innovation. We are confident that your skills and expertise will be a valuable addition to our team, and we are excited to work alongside you to achieve our shared goals.
                        </p>
                        <p>
                            Our company is built on the principles of integrity, teamwork, and a relentless pursuit of excellence. As part of our family, we encourage you to bring your ideas and passion to the table, as together, we continue to grow and innovate.
                        </p>
                        <p>
                            You will be a key contributor to our success, and we are here to support you every step of the way. Let’s embark on this exciting journey to create meaningful solutions and drive positive change in the industry.
                        </p>

                        <h3 className='mt-3'>Company History</h3>
                        <p>
                            DigiConcept Pvt. Ltd. was founded in [Year] with a vision to provide cutting-edge digital solutions that empower businesses to thrive in the digital age. Over the years, we have worked with numerous clients across various industries, delivering exceptional results and establishing ourselves as a trusted name in the industry.
                        </p>
                        <p>
                            Our journey has been fueled by a passion for innovation and a commitment to excellence. Today, we are proud to have a talented team that shares our vision and helps us achieve new milestones.
                        </p>
                        <p>
                            We are excited to see how you will contribute to our ongoing success and look forward to creating great things together.
                        </p>
                    </div>
                    <img src="/asset/logo/1.png" className='l-h mt-2 mx-2' alt="Welcome" />
                </div>
            </div>
        </>
    );
});

const Welcome = () => {
    const componentRef = useRef();

    const handleDownloadPdf = () => {
        const input = componentRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0, 210, 210); // Adjust the width and height for A4 size
            pdf.save('welcome-letter.pdf'); // This will download the PDF
        });
    };

    return (
        <>
            <WelcomeLetter ref={componentRef} />
            <button className='download-btn-wel mt-4 ' onClick={handleDownloadPdf}>Download as PDF</button>
        </>
    );
}

export default Welcome;
