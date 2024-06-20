import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const groupedProducts = {};
  products.forEach((product) => {
    if (!groupedProducts[product.category]) {
      groupedProducts[product.category] = [];
    }
    groupedProducts[product.category].push(product);
  });

  return (
    <>
    <Header></Header>
    <div id="products-container">
      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="product-list">
            {groupedProducts[category].map((product) => (
              <div key={product._id} className="product-card">
               {/*<img src={product.imageUrl} alt={product.name} />*/} 
                <h3>{product.name}</h3>
                <p>Price: Rs.{product.price}</p>
                <button>Buy</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
    
  );
};

export default ProductsPage;
