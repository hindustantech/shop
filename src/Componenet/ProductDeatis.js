import React, { useState, useRef, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import toast from 'react-hot-toast';
import Loading from './Loding';

const ProductDeatis = () => {
    const [quantity, setQuantity] = useState(1);
    const sliderRef = useRef(null);
   
    const [product, setProduct] = useState(null);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const imageurl = process.env.REACT_APP_IMAGE_BASE_URL;
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
    const images = [
        "asset/logo/16.png",
        "asset/logo/15.png",
        "asset/logo/14.png",
    ];
    const [mainImage, setMainImage] = useState(images[0]);
    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => {
            setMainImage(images[next]);
        },
    };

    const fetchProductDetails = async (id) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/products_details/${id}`);
            setProduct(response.data);
            setMainImage(response.data.images[0]);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useEffect(() => {
        fetchProductDetails(id);
        
    }, [id]);

    const handleBuyNow = () => {
        // Create the cart item for the current product
        const cartItem = {
            id,
            productName: product.products.product_name,
            price: product.products.amount,
            quantity,
            image: `${imageurl}/products/${product.products.product_image}`,
        };
    
        // Store only one product in localStorage
        localStorage.setItem('cart', JSON.stringify([cartItem])); // Store it as an array with one item
        toast.success('Product added to cart, proceeding to checkout!');
        navigate('/Activation'); // Redirect to the activation page
    };
    

 

    if (!product) {
        return <div><Loading /></div>;
    }

    return (
        <>
            <div className="header-profiledeatils d-flex justify-content-around text-white">
                <Link to="/">
                    <img src="/asset/logo/37.png" className="product-d mt-3 mx-3" alt="" />
                </Link>
                <p className='text-center text-white mt-3 f-w-bold'>{product.products.product_name}</p>
                <i className="fa fa-search mt-3 mx-4 p-s" aria-hidden="true"></i>
            </div>
            <div className="px-2">
                <div className='productdeatils main-page-product mt-2 mx-3'>
                    <Slider ref={sliderRef} {...settings}>
                        {images.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={`${imageurl}/products/${product.products.product_image}`}
                                    alt={`Slide ${index}`}
                                    style={{ width: "350", height: "320px", cursor: "pointer" }}
                                    className='mx-1'
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Preview images */}
                <div className="d-inline-flex mx-2 mt-2">
                    {images.map((image, index) => (
                        <div className='previwe productdeatils m-2' key={index}>
                            <img
                                onClick={() => {
                                    setMainImage(product.products.product_image);
                                    sliderRef.current.slickGoTo(index);
                                }}
                                src={`${imageurl}/products/${product.products.product_image}`}
                                alt={`Preview ${index}`}
                                style={{ width: "50px", height: "50px", cursor: "pointer" }}
                            />
                        </div>
                    ))}

                    <div className=''>
                        <p className="price-productdeatils text-capitalize mx-3">MRP: {product.products.amount} Inc GST</p>
                    </div>
                </div>

                {/* Product details like price */}
                <div className="info d-flex mx-2">
                    <p className="price px-2 text-capitalize">{product.products.product_name}</p>
                    <button className='btn-add-card' onClick={handleBuyNow}>
                        BUY NOW <i className="fa-solid fa-cart-shopping mx-3"></i>
                    </button>
                </div>  

               
                <div className="decs px-4">
                    <p className='text-capitalize'>
                        {product.products.product_description}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ProductDeatis;
