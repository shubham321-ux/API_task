import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
        console.log(products)
        setSearchResults(data.products); 
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, []);

  const handleSearch = () => {
    const filteredProducts = products.filter((product) =>
product.brand.toLowerCase().includes(searchProduct.toLowerCase())|| 
product.category.toLowerCase().includes(searchProduct.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  const searchItem = (e) => {
    setSearchProduct(e.target.value);
  };

  return (
    <>
    <div className='main'>
    <input type="text" onChange={searchItem} placeholder='Search Product' />
      <button onClick={handleSearch}>Search</button>
      </div>
      <div className="product-container">
        {searchResults.length > 0 ? (
          searchResults.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.thumbnail} alt={product.brand} />
              <h2>{product.brand}</h2>
              <h3>Price: ${product.price}</h3>
              <p>Description: {product.description}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
      
    </>
  );
}

export default App;
