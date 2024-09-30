import React from 'react'
import { Link } from 'react-router-dom'

const Headers = (props) => {
    return (
        // <div className={`header-profiledeatils pt-3 ${props.bAackground}`}>
        //   <Link to="/">  <img src="/asset/logo/37.png"  className="l-h-h" alt="" /></Link>
        //     <h3 className='text-center text-white'>{props.Name}</h3>
        // </div>

        <div className={` pt-3 ${props.bAackground ? props.bAackground : ' header-profiledeatils'}`}>
            <Link to="/">
                <img src="/asset/logo/37.png" className="l-h-h " alt="Logo" />
            </Link>
            <h3 className='text-center text-white'>{props.Name}</h3>
        </div>

    )
}

export default Headers