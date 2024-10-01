import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Headers from './Headers';
import toast from 'react-hot-toast';

export const KYC = () => {
    const [existingFiles, setExistingFiles] = useState({
        pan: false,
        aadhaar: false,
        passbook: false,
    });
    const [files, setFiles] = useState({
        pan: null,
        aadhaar: null,
        passbook: null,
    });
    const [fileValid, setFileValid] = useState(true);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [fileNames, setFileNames] = useState({
        pan: '',
        aadhaar: '',
        passbook: '',
    });
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const id = localStorage.getItem('id'); // Assuming the user ID is saved in localStorage

    // Function to check existing uploaded documents
    const checkExistingDocuments = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/homepageapi/${id}`);
            if (response.status === 200) {
                setExistingFiles({
                    pan: response.data.panUploaded,
                    aadhaar: response.data.aadhaarUploaded,
                    passbook: response.data.passbookUploaded,
                });
            }
        } catch (error) {
            toast.error("Error fetching existing documents.");
        }
    };

    useEffect(() => {
        checkExistingDocuments(); // Fetch existing documents on mount
    }, []);

    const onDrop = (acceptedFiles, type) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (acceptedFiles.length > 0 && allowedTypes.includes(acceptedFiles[0].type)) {
            setFileValid(true);
            setFiles((prev) => ({ ...prev, [type]: acceptedFiles[0] }));
            setFileNames((prev) => ({ ...prev, [type]: acceptedFiles[0].name })); // Store the file name
        } else {
            setFileValid(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all documents are uploaded
        if (!files.pan || !files.aadhaar || !files.passbook) {
            toast.error("Please upload all required documents.");
            return;
        }

        const formData = new FormData();
        formData.append('pan', files.pan);
        formData.append('aadhaarCard', files.aadhaar);
        formData.append('passbook', files.passbook);
        formData.append('id', id);

        try {
            const response = await axios.post(`${apiBaseUrl}/updatekyc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                setUploadSuccess(true);
                toast.success("KYC documents uploaded successfully!");
                checkExistingDocuments(); // Refresh the existing documents state
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
        disabled: existingFiles.pan, // Disable if PAN already uploaded
    });

    const { getRootProps: getRootPropsAadhaar, getInputProps: getInputPropsAadhaar } = useDropzone({
        onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'aadhaar'),
        multiple: false,
        disabled: existingFiles.aadhaar, // Disable if Aadhaar already uploaded
    });

    const { getRootProps: getRootPropsPassbook, getInputProps: getInputPropsPassbook } = useDropzone({
        onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'passbook'),
        multiple: false,
        disabled: existingFiles.passbook, // Disable if Passbook already uploaded
    });

    const isSubmitDisabled = existingFiles.pan && existingFiles.aadhaar && existingFiles.passbook;

    return (
        <>
            <Headers Name="KYC" />
            <div className="kuy-main">
                <div className="uploadDocument kyc-status mt-3 mx-2 pt-3">
                    <div className="headers-kyc mx-3">
                        <p className="text-center">Upload Documents</p>
                    </div>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* PAN Card Upload */}
                        <div className="uploadDocument1 d-flex justify-content-around mx-2 mt-3">
                            <div className="text-kyc">
                                <p className="px-2 document-text mt-2">Pan Card</p>
                            </div>
                            <div className="card-pan" {...getRootPropsPan({ className: 'dropzone' })}>
                                <input {...getInputPropsPan()} />
                                <p className='gap-2'>{existingFiles.pan ? "Already Uploaded" : "Upload"}</p>
                            </div>
                        </div>
                        {fileNames.pan && <p className="text-success px-3" style={{ fontSize: "12px" }}>Uploaded: {fileNames.pan}</p>}

                        {/* Aadhaar Card Upload */}
                        <div className="uploadDocument1 d-flex justify-content-around mx-2 mt-3">
                            <div className="text-kyc">
                                <p className="px-2 document-text mt-2">Aadhaar Card</p>
                            </div>
                            <div className="card-pan" {...getRootPropsAadhaar({ className: 'dropzone' })}>
                                <input {...getInputPropsAadhaar()} />
                                <p className='gap-2'>{existingFiles.aadhaar ? "Already Uploaded" : "Upload"}</p>
                            </div>
                        </div>
                        {fileNames.aadhaar && <p className="text-success px-3" style={{ fontSize: "12px" }}>Uploaded: {fileNames.aadhaar}</p>}

                        {/* Passbook Upload */}
                        <div className="uploadDocument1 d-flex justify-content-around mx-2 mt-3">
                            <div className="text-kyc">
                                <p className="px-2 document-text mt-2">Bank Passbook</p>
                            </div>
                            <div className="card-pan" {...getRootPropsPassbook({ className: 'dropzone' })}>
                                <input {...getInputPropsPassbook()} />
                                <p className='gap-2'>{existingFiles.passbook ? "Already Uploaded" : "Upload"}</p>
                            </div>
                        </div>
                        {fileNames.passbook && <p className="text-success px-3 " style={{ fontSize: "12px" }}>Uploaded: {fileNames.passbook}</p>}

                        {!fileValid && <div className="text-danger text-center">Upload Valid (JPEG, PNG, JPG).</div>}

                        <div className="text-center mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitDisabled}
                            >
                                Submit KYC Documents
                            </button>
                        </div>

                        {uploadSuccess && <div className="text-success text-center mt-2">Documents uploaded successfully!</div>}
                    </form>
                </div>

                <div className="kyc-status-s mt-3 mx-2 pt-3">
                    <div className="headers-kyc mx-3">
                        <p className="text-center">KYC Status</p>
                    </div>
                    <div className="document-button d-flex">
                        <p className="btn-document">PAN Card</p>
                        <p className="btn-document btn-desibale">Bank Detail</p>
                        <p className="btn-document btn-desibale">ID Card Photo</p>
                    </div>
                    <div className="detail px-3 mt-2 mb-0">
                        <p className="sponser_id mb-0 mt-3">
                            KYC Status: <span>{existingFiles.pan && existingFiles.aadhaar && existingFiles.passbook ? 'Verified' : 'Pending'}</span>
                            {existingFiles.pan && existingFiles.aadhaar && existingFiles.passbook && (
                                <span>
                                    <img src="/asset/logo/50.jpeg" className="l-h mb-1 mx-2" alt="KYC Verified" />
                                </span>
                            )}
                        </p>
                        <p className="sponser_name mb-0">ID No. <span>{id}</span></p>
                    </div>
                </div>
            </div>
        </>
    );
};
