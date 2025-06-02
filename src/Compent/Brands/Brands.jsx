import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ecommerce.routemisr.com/api/v1/brands')
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching brands:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Our Brands</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-32 h-32 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-700">{brand.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
