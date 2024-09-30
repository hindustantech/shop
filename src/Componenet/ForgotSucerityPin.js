import React from 'react'
import Headers from './Headers'

const ForgotSecurity = () => {

    return (
        <>

            <Headers Name="Forgot Security PIN" />
            <div className="main-body-change-password">
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-md-6 text-center">
                        <img src="/asset/design/f.jpeg" alt="" className="img-fluid" />
                    </div>
                </div>


                <form className='loginForm'   >
                    <div className="mb-3 input-fi">

                        <input
                            type="text"
                            className="text login-color input-login"
                            name='id_number'
                            placeholder="ID Number "

                            required
                        />
                    </div>
                    <div className="mb-3 input-fi">

                        <input
                            type="text"
                            className="text login-color input-login"
                            name='Mobile '

                            placeholder="Mobile Number "
                            required
                        />
                    </div>
                    <button type="submit" className="change_password_btn_color mt-2 "> change Password</button>

                </form>
            </div>
        </>
    )
}

export default ForgotSecurity