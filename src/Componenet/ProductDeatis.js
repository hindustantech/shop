import React, { useState, useRef, useEffect, } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import Loading from './Loding';

const ProductDeatis = () => {
    const [quantity, setQuantity] = useState(1);
    const sliderRef = useRef(null);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [product, setProduct] = useState(null);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const imageurl = process.env.REACT_APP_IMAGE_BASE_URL;
    const { id } = useParams();
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
            const response = await axios.get(`${apiBaseUrl}/products_details/${id}`); // Replace with your API endpoint
            setProduct(response.data); // Assume the response data has the product details
            setMainImage(response.data.images[0]); // Set initial main image
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };



    useEffect(() => {
        fetchProductDetails(id);
        updateCartQuantity();
    }, [id]);


    const updateCartQuantity = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalQuantity = existingCart.reduce((total, item) => total + item.quantity, 0);
        setCartQuantity(totalQuantity);
    };


    // Function to change quantity
    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const addToCart = () => {
        const cartItem = {
            id,
            productName: product.products.product_name,
            price: product.products.amount,
            quantity,
            image: `${imageurl}/products/${product.products.product_image}`,
        };

        // Get current cart from localStorage or initialize an empty array
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product already exists in the cart
        const existingProductIndex = existingCart.findIndex(item => item.id === id);

        if (existingProductIndex > -1) {
            // If the product is already in the cart, increase the quantity
            existingCart[existingProductIndex].quantity += quantity;
        } else {
            // Add new product to the cart
            existingCart.push(cartItem);
        }

        // Update localStorage with the new cart data
        localStorage.setItem('cart', JSON.stringify(existingCart));

        toast.success('Product added to cart');
        console.log(JSON.stringify(existingCart))
        updateCartQuantity();
    };

    if (!product) {
        return <div> <Loading/> </div>; // Render loading state while fetching
    }

    return (
        <>
            <div className="header-profiledeatils d-flex justify-content-around text-white">
                <Link  to="/">
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
                                    src={`${imageurl}/products/${product.products.product_image}`}// Corrected to use the image from the array
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
                    {images.map((image, index) => ( // Corrected to use product.images
                        <div className='previwe productdeatils m-2' key={index}>
                            <img
                                onClick={() => {
                                    setMainImage(product.products.product_image); // Set the clicked image as main image
                                    sliderRef.current.slickGoTo(index); // Go to the corresponding slide
                                }}
                                src={`${imageurl}/products/${product.products.product_image}`}// Corrected to use the image from the array
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
                    <p className="price px-2 text-capitalize"> {product.products.product_name}</p>
                    <button className='btn-add-card'>BUY NOW <i className="fa-solid fa-cart-shopping mx-3"></i></button>
                </div>

                <div className="quantity-controls px-3">
                    <button className="decrease-btn" onClick={decreaseQuantity}>-</button>
                    <span className="quantity">{quantity}</span>
                    <button className="increase-btn" onClick={increaseQuantity}>+</button>
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
