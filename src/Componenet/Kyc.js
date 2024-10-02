import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Modal from 'react-modal';
import Headers from './Headers';
import toast from 'react-hot-toast';
import { DataContext } from '../DataContext';

Modal.setAppElement('#root'); // Set the app element for accessibility

export const KYC = () => {
    const { data } = useContext(DataContext);
    const imageurl = process.env.REACT_APP_IMAGE_BASE_URL;
    const isKYCVerified = data && data.user.user && data.user.user.verified === 'verified';

    const [files, setFiles] = useState({
        pan: null,
        adhar: null,
        passbook: null,
    });

    const [fileValid, setFileValid] = useState(true);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [fileNames, setFileNames] = useState({
        pan: '',
        adhar: '',
        passbook: '',
    });

    // State for image previews
    const [previewUrls, setPreviewUrls] = useState({
        pan: '',
        adhar: '',
        passbook: '',
    });

    // State for the modal
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPreview, setCurrentPreview] = useState('');

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const onDrop = (acceptedFiles, type) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (acceptedFiles.length > 0 && allowedTypes.includes(acceptedFiles[0].type)) {
            setFileValid(true);
            setFiles((prev) => ({ ...prev, [type]: acceptedFiles[0] }));
            setFileNames((prev) => ({ ...prev, [type]: acceptedFiles[0].name }));

            // Create a preview URL for the uploaded file
            const previewUrl = URL.createObjectURL(acceptedFiles[0]);
            setPreviewUrls((prev) => ({ ...prev, [type]: previewUrl }));
        } else {
            setFileValid(false);
        }
    };

    const id = localStorage.getItem('id');
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!files.pan || !files.adhar || !files.passbook) {
            toast.error("Please upload all required documents.");
            return;
        }

        const formData = new FormData();
        formData.append('pan', files.pan);
        formData.append('adhar', files.adhar);
        formData.append('passbook', files.passbook);
        formData.append('id', id);

        try {
            const response = await axios.post(`${apiBaseUrl}/updatekyc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(formData)

            if (response.status === 200) {
                setUploadSuccess(true);
                toast.success("KYC documents uploaded successfully!");
            } else {
                toast.error("Failed to upload KYC documents. Try again later.");
            }
        } catch (error) {
            toast.error("An error occurred while uploading documents.");
        }
    };

    const { getRootProps: getRootPropsPan, getInputProps: getInputPropsPan } = useDropzone({
        onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'pan'),
        multiple: false,
    });

    const { getRootProps: getRootPropsadhar, getInputProps: getInputPropsadhar } = useDropzone({
        onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'adhar'),
        multiple: false,
    });

    const { getRootProps: getRootPropsPassbook, getInputProps: getInputPropsPassbook } = useDropzone({
        onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'passbook'),
        multiple: false,
    });
    const [modalTitle, setModalTitle] = useState('');
    const openModal = (url,type) => {
        setCurrentPreview(url);
        setModalTitle(type);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentPreview('');
    };

    return (
        <>
            <Headers Name="KYC" />
            <div className="kuy-main">
                <div className="uploadDocument kyc-status mt-3 mx-2 pt-3">
                    <div className="headers-kyc mx-3">
                        <p className="text-center">Upload Documents</p>
                    </div>
                    {/* <img src={`${imageurl}/profile/${data && data.user.user && data.user.user.image}`}alt="" /> */}
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* PAN Card Upload */}
                        <div className="uploadDocument1 d-flex justify-content-around mx-2 mt-3">
                            <div className="text-kyc d-flex justify-content-start">
                                <p className=" document-text mt-2 px-2">Pan Card</p>
                                {previewUrls.pan && (
                                    <button type="button" onClick={() => openModal(previewUrls.pan)} className="btn btn-preview">Preview</button>
                                )}
                            </div>
                            <div className="card-pan" {...getRootPropsPan({ className: 'dropzone' })}>
                                <input {...getInputPropsPan()} />
                                <p className='gap-2'>Upload</p>
                            </div>
                        </div>
                        {fileNames.pan && <p className="text-success px-3" style={{ fontSize: "12px" }}>Uploaded: {fileNames.pan}</p>}

                        {/* adhar Card Upload */}
                        <div className="uploadDocument1 d-flex justify-content-around mx-2 mt-3">
                            <div className="text-kyc d-flex justify-content-start">
                                <p className="px-2 document-text mt-2">adhar Card</p>
                                {previewUrls.adhar && (
                                    <button type="button" onClick={() => openModal(previewUrls.adhar)} className="btn btn-preview">Preview</button>
                                )}
                            </div>
                            <div className="card-pan" {...getRootPropsadhar({ className: 'dropzone' })}>
                                <input {...getInputPropsadhar()} />
                                <p className='gap-2'>Upload</p>
                            </div>
                        </div>
                        {fileNames.adhar && <p className="text-success px-3" style={{ fontSize: "12px" }}>Uploaded: {fileNames.adhar}</p>}

                        {/* Passbook Upload */}
                        <div className="uploadDocument1 d-flex justify-content-around mx-2 mt-3">
                            <div className="text-kyc d-flex justify-content-start">
                                <p className="px-2 document-text mt-2">Bank Passbook</p>
                                {previewUrls.passbook && (
                                    <button type="button" onClick={() => openModal(previewUrls.passbook)} className="btn btn-preview">Preview</button>
                                )}
                            </div>
                            <div className="card-pan" {...getRootPropsPassbook({ className: 'dropzone' })}>
                                <input {...getInputPropsPassbook()} />
                                <p className='gap-2'>Upload</p>
                            </div>
                        </div>
                        {fileNames.passbook && <p className="text-success px-3 " style={{ fontSize: "12px" }}>Uploaded: {fileNames.passbook}</p>}

                        {!fileValid && <div className="text-danger text-center">Upload Valid (JPEG, PNG, JPG).</div>}

                        <div className="text-center mt-4 btn-kyc-s">
                            <button
                                type="submit"
                                className="btn btn-kyc"
                                disabled={isKYCVerified}
                            >
                                Submit KYC Documents
                            </button>
                            {isKYCVerified}
                        </div>

                        {uploadSuccess && <div className="text-success text-center mt-2">Documents uploaded successfully!</div>}
                    </form>
                </div>

                <div className="kyc-status-s mt-3 mx-2 pt-3">
                    <div className="headers-kyc mx-3">
                        <p className="text-center">KYC Status</p>
                    </div>
                    <div className="document-button d-flex">
                        <p style={{ cursor: 'pointer', }} className="btn-document" onClick={() => openModal(`${imageurl}/uploads/kyc/${data && data.user.user && data.user.user.pan_image}`)}>PAN Card</p>
                        <p style={{ cursor: 'pointer', }} className="btn-document btn-desibale" onClick={() => openModal(`${imageurl}/uploads/kyc/${data && data.user.user && data.user.user.passbook_image}`)}>Bank Detail</p>
                        <p style={{ cursor: 'pointer', }} className="btn-document btn-desibale" onClick={() => openModal(`${imageurl}/uploads/kyc/${data && data.user.user && data.user.user.adhar_image}`)}>Aadhar</p>
                    </div>
                    <div className="detail px-3 mt-2 mb-0">
                        <p className="sponser_id mb-0 mt-3">
                            KYC Status : <span>{data && data.user.user && data.user.user.verified}</span>
                            {isKYCVerified && (
                                <span>
                                    <img src="/asset/logo/50.jpeg" className="l-h mb-1 mx-2" alt="" />
                                </span>
                            )}
                        </p>
                        <p className="sponser_name mb-0">ID No. <span>{data && data.user.user && data.user.user.id}</span></p>
                    </div>
                </div>
            </div>

            {/* Modal for Image Preview */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <h2>{modalTitle}  Preview</h2>
                <img src={currentPreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                <button className='close-modal-btn' onClick={closeModal}>Close</button>
            </Modal>
        </>
    );
};
