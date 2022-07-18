import React, { useState, useEffect } from 'react';
import axios from 'axios';
const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
useEffect(() => {
  fetchProducts();
}, []);
const fetchProducts = () => {
  axios
    .get('https://ayhly7s3krexcjusj5yosx2uqi0sjtmn.lambda-url.eu-west-1.on.aws/')
    .then((res) => {
      console.log(res);
      setProducts(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
return (
    <div>
      <h1>Featured Documents</h1>
      <div className='item-container'>
        {products.map((product) => (
          <div className='card' key={product.Id}>
            <h3>{product.Id}</h3>
            <p>{product.File}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FeaturedProducts;