import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataContext';
import toast from 'react-hot-toast';

const Earn = () => {
    const { data } = useContext(DataContext);
    const [copySuccess, setCopySuccess] = useState('');

    // Create the shared link with the user's email
    const sharedLink = `${window.location.origin}/register?email=${data && data.user.user && data.user.user.email}`;

    // Social media sharing URLs
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(sharedLink)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharedLink)}`;
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(sharedLink)}`;
    const instagramUrl = `https://www.instagram.com/`; // Instagram doesn't support direct link sharing

    // Function to copy the link to the clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(sharedLink).then(() => {
            setCopySuccess(`Link copied! ${data && data.user.user && data.user.user.email}`);
            toast.success(`Link copied! ${data && data.user.user && data.user.user.email}`)
        }).catch(() => {
            setCopySuccess(`Failed to copy! ${data && data.user.user && data.user.user.email}`);
            toast.error(`Failed to copy! ${data && data.user.user && data.user.user.email}`)
        });
    };

    // Function to handle sharing via the Web Share API
    const shareAllPlatforms = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Refer & Earn',
                    text: `Check this out! Here's the link: ${sharedLink}`,
                    url: sharedLink
                });
               
            } else {
                toast.error('Web share not supported on this device.');
            }
        } catch (error) {
         
        }
    };

    return (
        <>
            <div className="header-refer-earn">
                <Link to="/" >
                    <img src="/asset/logo/e.png" className="l-h-h" alt="Home" />
                </Link>
                <h3 className="text-center pt-3">Refer & Earn</h3>
            </div>

            <div className="main-body-refer-earn px-4 w-full">
                <img src="/asset/design/24.png" className="img-fluid justify-content-center" alt="Refer & Earn" />
                <h4 className="px-3 h-earn">Refer a friend and Earn Commission</h4>

                <div className="container">
                    {copySuccess && <p className="text-success text-center">{copySuccess}</p>}

                    <div className="ref-box mt-3">
                        <i className="p-2 copy-i fa fa-copy" onClick={copyToClipboard}></i>
                        <p className="link-ref m-3">
                            {sharedLink}
                        </p>
                    </div>

                    <div className="benefits mt-4">
                        <h4 className="ref-benefits">Benefits of Referral Program</h4>
                        <div className="ref-boxx d-flex justify-content-evenly">
                            <p className="text-center ref-text">Passive Income Source</p>
                        </div>
                        <div className="ref-boxx mt-4 d-flex justify-content-evenly">
                            <p className="text-center ref-text">Time Flexibility</p>
                        </div>
                        <div className="ref-boxx mt-4 d-flex justify-content-evenly">
                            <p className="text-center ref-text">Anytime & Anywhere</p>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <h4 className="ref-benefits mt-4 px-4">Refer Now</h4>

                    <div className="socalmeadia d-flex justify-content-evenly align-items-center">
                        <div className="whatapp">
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                <img src="/asset/logo/31.png" className="socal-media-icons" alt="WhatsApp" />
                            </a>
                        </div>
                        <div className="facebook">
                            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                                <img src="/asset/logo/32.png" className="socal-media-icons" alt="Facebook" />
                            </a>
                        </div>
                        <div className="instagram">
                            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                                <img src="/asset/logo/33.png" className="socal-media-icons" alt="Instagram" />
                            </a>
                        </div>
                        <div className="linkdine">
                            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                                <img src="/asset/logo/34.png" className="socal-media-icons" alt="LinkedIn" />
                            </a>
                        </div>

                        {/* Share all platforms icon */}
                        <div className="share-all">
                            <i className="fa fa-share-alt" onClick={shareAllPlatforms} style={{ fontSize: '24px', cursor: 'pointer' }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Earn;
