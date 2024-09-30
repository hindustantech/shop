import React from 'react'
import Nav from './Nav'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Shop = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const imageurl = process.env.REACT_APP_IMAGE_BASE_URL;

    const fetchProduct = async () => {
        try {

            const response = await axios.get(`${apiBaseUrl}/products_view`);
            setData(response.data.products || []);
            console.log(response.data)

        } catch (error) {
            console.log(error);
        } finally {
            console.log(false);
        }
    };

    useEffect(() => {
        fetchProduct()
    }, [])

    const handleProductClick = (productId) => {
        navigate(`/ProductDeatis/${productId}`); // Adjust the path as needed
    };
    return (
        <>
            <div className="header">
                <Header />
            </div>
            <div className='main-body'>

                <div className="main container ">
                    <div className="container">
                        <div className="category ">
                            <h4 className='home-heading text-white pt-4'>Category</h4>

                            <div className="row justify-content-evenly">
                                <div className="col-3 ">
                                    <img src="/asset/logo/11.png" alt="" className='category-img' />
                                    <p className='decs mt-2'>Health &
                                        Nutritution</p>
                                </div>
                                <div className="col-3 ">
                                    <img src="/asset/logo/12.png" alt="" className='category-img' />
                                    <p className='decs mt-2'>Agriculture
                                        Veterinary</p>
                                </div>
                                <div className="col-3 ">
                                    <img src="/asset/logo/13.png" alt="" className='category-img' />
                                    <p className='decs mt-2'>Skin Care</p>
                                </div>
                                <div className="col-3 ">
                                    <img src="/asset/logo/14.png" alt="" className='category-img' />
                                    <p className='decs mt-2'>Personal
                                        Care</p>
                                </div>
                                <div className="col-3  mt-3">
                                    <img src="/asset/design/15.png" alt="" className='category-img' />
                                    <p className='decs mt-2'>Home Care</p>
                                </div>
                                <div className="col-3  mt-3">
                                    <img src="/asset/logo/16.png" alt="" className='category-img' />
                                    <p className='decs mt-2'>Child Care</p>
                                </div>
                                <div className="col-3  mt-3">
                                    <img src="/asset/logo/17.png" alt="" className='category-img' />
                                    <p className='decs mt-2'>Garments & Apparels</p>
                                </div>
                                <div className="col-3  mt-3">
                                    <img src="/asset/design/16.png" alt="" className='category-img' />
                                    <p className='decs mt-2'>See all</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hotProduct mt-4 ">
                        <h3 className=" t-h m-3 home-heading px-4">Hot Product</h3>
                        <div className="row ">
                            {data.length > 0 ? (data.map((product) => (<div className="col-6 col-md-4 mb-3"  key={product.id} onClick={() => handleProductClick(product.id)}>
                                <div className="card ">
                                    <span className='badge-f'><FontAwesomeIcon icon={faHeart} /></span>
                                    <img src={`${imageurl}/products/${product.product_image}`} className="card-img-top" alt="Biomagnetic Mattress" />
                                    <div className="card-body">
                                        <p className="card-title title-c">{product.product_name}</p>
                                        <p className="card-title title-c">425+ Reviwe</p>
                                        <div className="  d-flex Rating">
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} />425+ Reviews</p>
                                        </div>
                                    </div>
                                </div>
                            </div>))) : (
                                <p>No products found.</p>
                            )}



                        </div>
                    </div>

                </div >

            </div>

            <Nav />

        </>
    )
}
