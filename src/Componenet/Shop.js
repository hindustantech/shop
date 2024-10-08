import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../DataContext';

export const Shop = () => {
    const { searchResults } = useContext(DataContext);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isCategorySelected, setIsCategorySelected] = useState(false);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const imageurl = process.env.REACT_APP_IMAGE_BASE_URL;
    console.log(searchResults )
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/products_view`);
            setData(response.data.products || []);
           
        } catch (error) {
           
        } finally {
            
        }
    };
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/categories`); // Replace with your API endpoint
                setCategories(response.data); // Assuming response.data is an array of categories
               
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const fetchProducts = async (categoryId) => {

        try {
            const response = await axios.get(`${apiBaseUrl}/productsCategories/${categoryId}`);
            setCategoryProducts(response.data || []);
           
        } catch (error) {
            
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/ProductDeatis/${productId}`); // Adjust the path as needed
    };


    useEffect(() => {
        fetchProduct()
    }, []);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }

    }, []);
    const handleCategoryClick = (categoryId) => {
        fetchProducts(categoryId);
        // Fetch products based on category
        // Set the selected category name
        setIsCategorySelected(true); // Indicate that a category is selected
    };
    const handleSeeAllClick = () => {
        setIsCategorySelected(false); // Reset category selection
        setCategoryProducts([]); // Clear category products
    };

    return (
        <>
            <Header data={data} />
            <div className='main-body' >
                <div className="main container">
                    <div className="container">
                        <div className="category ">
                            <h4 className='home-heading text-white pt-4'>Category</h4>
                            <div className="row justify-content-evenly">
                                {categories?.categories?.map((category) => (
                                    <div className="col-3 mt-3" key={category.id} onClick={() => handleCategoryClick(category.id)}> {/* Replace category.id with a unique identifier */}
                                        <img src={`${imageurl}/category_image/${category.category_image}`} alt="" className='category-img' />
                                        <p className='decs mt-2'>{category.category_name}</p> {/* Update to match your API response */}
                                    </div>
                                ))}
                                <div className="col-3 mt-3" onClick={handleSeeAllClick}>
                                    <img src="/asset/design/16.png" alt="" className='category-img' loading="lazy" />
                                    <p className='decs mt-2'>See all</p>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="hotProduct mt-4">
                        <h1 className="home-heading text-white px-4">Hot Product</h1>

                        <div className="search-results text-white">
                            {/* Show a message based on the type of products being displayed */}
                            {searchResults?.products?.length > 0 && !isCategorySelected ? (
                                <>
                                    <p className="text-white px-4">Showing search results:</p>
                                    {searchResults.products.map((product) => (
                                        <div className="col-6 col-md-4 mb-3" key={product.id} onClick={() => handleProductClick(product.id)}>
                                            <div className="card">
                                                <img src={`${imageurl}/products/${product.product_image}`} className="card-img-top" alt={product.product_name} loading="lazy" />
                                                <div className="card-body">
                                                    <p className="card-title title-c">{product.product_name}</p>
                                                    <p className="card-title title-c">{product.amount}</p>
                                                    <div className="d-flex Rating">
                                                        <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                                        <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                                        <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                                        <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} />425+ Reviews</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="row">
                                    {/* Show category name if a category is selected */}
                                    {isCategorySelected && <p className="text-white px-4"> category: {categories.categories.category_name}</p>}

                                    {/* If no search results, show all products or category products */}
                                    {!isCategorySelected && data.length > 0 ? (
                                        <>
                                            <p className="text-white px-4">Showing all products:</p>
                                            {data.map((product) => (
                                                <div className="col-6 col-md-4 mb-3" key={product.id} onClick={() => handleProductClick(product.id)}>
                                                    <div className="card">
                                                        <img src={`${imageurl}/products/${product.product_image}`} className="card-img-top" alt={product.product_name} loading="lazy" />
                                                        <div className="card-body">
                                                            <p className="card-title title-c">{product.product_name}</p>
                                                            <p className="card-title title-c">{product.amount}</p>
                                                            <div className="d-flex Rating">
                                                                <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                                                <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                                                <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                                                <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} />425+ Reviews</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <p className='text-white fw-bold'></p>
                                    )}

                                    {/* Show category products if a category is selected */}
                                    {isCategorySelected && categoryProducts?.productsCategories?.length > 0 ? (
                                        categoryProducts.productsCategories.map((product) => (
                                            <div className="col-6 col-md-4 mb-3" key={product.id} onClick={() => handleProductClick(product.id)}>
                                                <div className="card">
                                                    <img src={`${imageurl}/products/${product.product_image}`} className="card-img-top" alt={product.product_name} loading="lazy" />
                                                    <div className="card-body">
                                                        <p className="card-title title-c">{product.product_name}</p>
                                                        <p className="card-title title-c">{product.amount}</p>
                                                        <div className="d-flex Rating">
                                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} /></p>
                                                            <p className='card-text rating-r'><FontAwesomeIcon icon={faStar} />425+ Reviews</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        isCategorySelected && <p className='text-white fw-bold'>No products found in this category.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <Nav />
        </>
    );
};
