import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { carcontext } from '../../Context/Context';

export default function Details() {
  const { id } = useParams();
  let { addusercart, setnumcartitems } = useContext(carcontext);

  const cleanedId = id?.trim();
  const [mainImage, setMainImage] = useState(null);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['product', cleanedId],
    queryFn: () =>
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${cleanedId}`),
    enabled: !!cleanedId, // prevents running query if id is undefined
  });

  const product = data?.data?.data;

  function handleImageChange(e) {
    const imgSrc = e.target.getAttribute('src');
    setMainImage(imgSrc);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error: {error?.message || 'Something went wrong'}
      </div>
    );
  }

  function addcart(id) {
    addusercart(id)
      .then((req) => {
        setnumcartitems(req.data.numOfCartItems);
        toast.success(req.data.message, {
          position: '',
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  return (
    <>
      <Toaster />
      <div className="w-full md:w-8/12 mx-auto my-5">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-3/12">
            <img
              src={mainImage || product?.imageCover}
              className="w-full"
              alt={product?.title || 'Product'}
            />
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {product?.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={handleImageChange}
                  className="w-20 h-20 object-cover cursor-pointer border rounded"
                  alt={`Thumbnail ${i}`}
                />
              ))}
            </div>
          </div>

          <div className="w-full md:w-8/12 pl-5 my-5">
            <h2 className="text-xl font-semibold">{product?.title}</h2>
            <p className="text-gray-500 my-5">{product?.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">{product?.price} EGP</span>
              <span className="text-yellow-500 flex items-center gap-1">
                <i className="fa-solid fa-star"></i>
                {product?.ratingsAverage}
              </span>
            </div>
            <button
              onClick={() => {
                addcart(id);
              }}
              className="btn mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
