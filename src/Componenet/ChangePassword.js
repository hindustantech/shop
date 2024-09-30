import React from 'react'
import Headers from './Headers'

const ChangePassword = () => {
    return (
        <>
            <Headers Name="Change Password"/>
            <div className="main-body-change-password">
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-md-6 text-center">
                        <img src="/asset/design/c.png" alt="" className="img-fluid" />
                    </div>
                </div>


                <form className='loginForm ' >
                    <div className="mb-3 input-fi">

                        <input
                            type="text"
                            className="text login-color input-login"
                            name='exixtinf_password'
                            placeholder="Existing password "
                          
                            required
                        />
                        <i className="fa fa-eye"></i>
                    </div>
                    <div className="mb-3 input-fi">

                        <input
                            type="text"
                            className="text login-color input-login"
                            name='new_password'
                            placeholder=" New password "
                          
                       
                            required
                        />
                        <i className="fa fa-eye"></i>
                    </div>
                    <div className="mb-3 input-fi">

                        <input
                            type="text"
                            className="text login-color input-login"
                            name='cnf_password'
                            placeholder="Confirm new  password "
                          
                            required
                        />
                        <i className="fa fa-eye"></i>
                    </div>
                    <button type="submit" className="change_password_btn_color mt-3 "> change Password</button>

                </form>
            </div>

        </>
    )
}

export default ChangePassword