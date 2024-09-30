import React from 'react'
import Headers from './Headers'

const AddCard = () => {
    return (
        <>
            <Headers Name="Cart Items" />
            <div className="main-card">
                <div className="product-card">
                    <div className="product-info">
                        <img src="path-to-product-image.jpg" alt="Product Image" className="product-image" />
                        <div className="details">
                            <h3 className="product-name">Product Name</h3>
                            <p className="product-price">$20.00</p>
                            <div className="quantity-controls">
                                <button className="decrease-btn">-</button>
                                <span className="quantity">1</span>
                                <button className="increase-btn">+</button>
                            </div>
                            <button className="remove-btn">Remove</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AddCard