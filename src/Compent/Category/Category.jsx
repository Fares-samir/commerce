import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ecommerce.routemisr.com/api/v1/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl">Loading categories...</span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Category</title>
      </Helmet>

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold"> Categories</h1>
          <p className="text-gray-500 mt-2">Choose a category to explore our products.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <div
              key={category._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-32 h-32 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-700">{category.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
