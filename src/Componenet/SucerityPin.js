import React, { useRef } from 'react'
import Headers from './Headers'

const SucerityPin = () => {
    // Create refs for each input field
    const oldPinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const newPinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const confirmPinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    // Function to handle input change and move focus
    const handleInputChange = (e, index, refs) => {
        const value = e.target.value;
        
        // Move focus to the next input if a number is entered
        if (value.length === 1 && index < refs.length - 1) {
            refs[index + 1].current.focus();
        }
        
        // Move focus back on backspace
        if (e.key === 'Backspace' && index > 0 && value.length === 0) {
            refs[index - 1].current.focus();
        }
    };

    return (
        <>
            <Headers Name="Security Pin" />

            <div className="main-body-change-password">
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-md-6 text-center">
                        <img src="/asset/design/s.png" alt="" className="img-fluid" />
                    </div>
                </div>

                <form className='loginForm'>
                    {/* Old Security PIN */}
                    <p className='px-3 mb-1 security-p'>Old Security PIN</p>
                    <div className="mb-3 security-pin-input d-flex justify-content-center align-items-center">
                        {oldPinRefs.map((ref, index) => (
                            <input
                                key={index}
                                type="text"
                                className="text-otp mx-2"
                                maxLength="1"
                                ref={ref}
                                onKeyUp={(e) => handleInputChange(e, index, oldPinRefs)}
                                required
                            />
                        ))}
                    </div>

                    {/* New Security PIN */}
                    <p className='px-3 mb-1 security-p'>New Security PIN *</p>
                    <div className="mb-3 security-pin-input d-flex justify-content-center align-items-center">
                        {newPinRefs.map((ref, index) => (
                            <input
                                key={index}
                                type="text"
                                className="text-otp mx-2"
                                maxLength="1"
                                ref={ref}
                                onKeyUp={(e) => handleInputChange(e, index, newPinRefs)}
                                required
                            />
                        ))}
                    </div>

                    {/* Confirm Security PIN */}
                    <p className='px-3 mb-1 security-p'>Confirm Security PIN *</p>
                    <div className="mb-3 security-pin-input d-flex justify-content-center align-items-center">
                        {confirmPinRefs.map((ref, index) => (
                            <input
                                key={index}
                                type="text"
                                className="text-otp mx-2"
                                maxLength="1"
                                ref={ref}
                                onKeyUp={(e) => handleInputChange(e, index, confirmPinRefs)}
                                required
                            />
                        ))}
                    </div>

                    <button type="submit" className="change_password_btn_color mt-2">Validate PIN</button>
                </form>
            </div>
        </>
    )
}

export default SucerityPin;
