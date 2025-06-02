import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ecommerce.routemisr.com/api/v1/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl">Loading products...</span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-40 h-40 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-700">{product.title}</h2>
              <p className="text-active font-bold mt-2">{product.price} EGP</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
