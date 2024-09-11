import React from 'react'
import Nav from './Nav'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';

export const Shop = () => {
    return (
        <>
            <div className='main-body '>
                <div className="header">
                    <Header />
                </div>
                <div className="main container">
                    <div className="category mt-4">
                        <h4 className='d-flex flex-start'>Category</h4>
                        <div className="row justify-content-evenly">
                            <div className="col-3 ">
                                <img src="/asset/logo/11.png" alt="" className='category-img' />
                                <p className='decs'>Health &
                                    Nutritution</p>
                            </div>
                            <div className="col-3 ">
                                <img src="/asset/logo/12.png" alt="" className='category-img' />
                                <p className='decs'>Agriculture
                                    Veterinary</p>
                            </div>
                            <div className="col-3 ">
                                <img src="/asset/logo/13.png" alt="" className='category-img' />
                                <p className='decs'>Skin Care</p>
                            </div>
                            <div className="col-3 ">
                                <img src="/asset/logo/14.png" alt="" className='category-img' />
                                <p className='decs'>Personal
                                    Care</p>
                            </div>
                            <div className="col-3  mt-3">
                                <img src="/asset/logo/15.png" alt="" className='category-img' />
                                <p className='decs'>Home Care</p>
                            </div>
                            <div className="col-3  mt-3">
                                <img src="/asset/logo/16.png" alt="" className='category-img' />
                                <p className='decs'>Child Care</p>
                            </div>
                            <div className="col-3  mt-3">
                                <img src="/asset/logo/17.png" alt="" className='category-img' />
                                <p className='decs'>Garments
                                    & Apparels</p>
                            </div>
                            <div className="col-3  mt-3">
                                <img src="/asset/logo/18.png" alt="" className='category-img' />
                                <p className='decs'>See all</p>
                            </div>
                        </div>
                    </div>

                    <div className="hotProduct mt-4">
                        <h1 className="text-center">Hot Product</h1>
                        <div className="row px-3">
                            <div className="col-6 col-md-4 mb-3">
                                <div className="card">
                                    <span className='badge-f'><FontAwesomeIcon icon={faHeart} /></span>
                                    <img src="/asset/logo/d.png" className="card-img-top" alt="Biomagnetic Mattress" />
                                    <div className="card-body">
                                        <p className="card-title title-c">Biomagnetic Mattress</p>
                                        <p className="card-title title-c">425+ Reviwe</p>
                                        <div className="  d-flex Rating">
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} />425+ Reviews</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 col-md-4 mb-3">
                                <div className="card">
                                    <span className='badge-f ' >  <FontAwesomeIcon icon={faHeart} /></span>
                                    <img src="/asset/logo/d.png" className="card-img-top" alt="Biomagnetic Mattress" />
                                    <div className="card-body">
                                        <p className="card-title title-c">Biomagnetic Mattress</p>
                                        <p className="card-title title-c">425+ Reviwe</p>
                                        <div className="  d-flex Rating">
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} />425+ Reviews</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 mb-3">
                                <div className="card">
                                    <span className='badge-f ' >  <FontAwesomeIcon icon={faHeart} /></span>
                                    <img src="/asset/logo/d.png" className="card-img-top" alt="Biomagnetic Mattress" />
                                    <div className="card-body">
                                        <p className="card-title title-c">Biomagnetic Mattress</p>
                                        <p className="card-title title-c">425+ Reviwe</p>
                                        <div className="  d-flex Rating">
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} />425+ Reviews</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 mb-3">
                                <div className="card">
                                    <span className='badge-f ' >  <FontAwesomeIcon icon={faHeart} /></span>
                                    <img src="/asset/logo/d.png" className="card-img-top" alt="Biomagnetic Mattress" />
                                    <div className="card-body">
                                        <p className="card-title title-c">Biomagnetic Mattress</p>
                                        <p className="card-title title-c">425+ Reviwe</p>
                                        <div className="  d-flex Rating">
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} />425+ Reviews</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 mb-3">
                                <div className="card">
                                    <span className='badge-f ' >  <FontAwesomeIcon icon={faHeart} /></span>
                                    <img src="/asset/logo/d.png" className="card-img-top" alt="Biomagnetic Mattress" />
                                    <div className="card-body">
                                        <p className="card-title title-c">Biomagnetic Mattress</p>
                                        <p className="card-title title-c">425+ Reviwe</p>
                                        <div className="  d-flex Rating">
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} />425+ Reviews</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 mb-3">
                                <div className="card">
                                    <span className='badge-f ' >  <FontAwesomeIcon icon={faHeart} /></span>
                                    <img src="/asset/logo/d.png" className="card-img-top" alt="Biomagnetic Mattress" />
                                    <div className="card-body">
                                        <p className="card-title title-c">Biomagnetic Mattress</p>
                                        <p className="card-title title-c">425+ Reviwe</p>
                                        <div className="  d-flex Rating">
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} />425+ Reviews</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div >
                <div className="navbar-b">
                    <Nav />
                </div>
            </div>
        </>
    )
}
