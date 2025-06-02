import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Mainslider from '../Mainslider/Mainslider';
import Categorysilder from '../Categorysilder/Categorysilder';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { carcontext } from '../../Context/Context';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Home() {
  const [numPages, setNumPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', currentPage],
    queryFn: () =>
      axios.get(
        `${import.meta.env.VITE_baseURL}/api/v1/products?limit=10&page=${currentPage}`
      ),
  });
  let {addusercart, setnumcartitems} = useContext(carcontext);

  useEffect(() => {
    if (data?.data?.metadata?.numberOfPages) {
      const num = Array.from(
        { length: data.data.metadata.numberOfPages },
        (_, i) => i + 1
      );
      setNumPages(num);
    }
  }, [data]);

  function goToPage(page) {
    setCurrentPage(page);
  }

  function prevPage() {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage < numPages.length) {
      goToPage(currentPage + 1);
    }
  }

  if (isError) {
    return (
      <h2 className="text-center text-red-500 my-10">
        {error.response?.data?.message || 'Something went wrong'}
      </h2>
    );
  }

  function addcart(id) {
    addusercart(id).then((req) => {
      console.log(req);
      setnumcartitems(req.data.numOfCartItems);
      toast.success(req.data.message, {
        position: "",
      });
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Toaster />
      {isLoading ? (
        <div className="flex bg-slate-300 justify-center items-center h-screen">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-10/12 mx-auto my-6">
          <Mainslider />
          <Categorysilder />
          <div className="flex flex-wrap">
            {data?.data?.data?.map((product) => {
              const {
                _id,
                title,
                imageCover,
                price,
                category,
                ratingsAverage,
              } = product;
              return (
                <div
                  key={_id}
                  className="lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-3"
                >
                  <div className="group hover:border overflow-hidden hover:border-active p-2">
                    <Link to={`/Details/${_id}`}>
                      <img
                        src={imageCover}
                        className="w-full h-auto object-cover"
                        alt={title}
                      />
                      <h5 className="text-center text-sm text-gray-700">{category.name}</h5>
                      <h2 className="text-sm font-semibold text-center text-gray-900">
                        {title.split(' ').slice(0, 2).join(' ')}
                      </h2>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-bold">{price} EGP</span>
                        <span className="text-yellow-500 flex items-center gap-1">
                          <i className="fa-solid fa-star"></i>
                          {ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={() => { addcart(_id); }}
                      className="btn w-full mt-3 translate-y-24 duration-500 group-hover:translate-y-0 bg-blue-500 text-white py-2 rounded"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <nav aria-label="Page navigation">
            <ul className="flex justify-center -space-x-px text-sm">
              <li
                onClick={prevPage}
                className={currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}
              >
                <a className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                  Previous
                </a>
              </li>

              {numPages.map((page) => (
                <li key={page} onClick={() => goToPage(page)}>
                  <a
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      currentPage === page
                        ? 'bg-gray-300 text-gray-700'
                        : 'text-gray-500 bg-white'
                    } border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                  >
                    {page}
                  </a>
                </li>
              ))}

              <li
                onClick={nextPage}
                className={
                  currentPage === numPages.length
                    ? 'opacity-50 pointer-events-none'
                    : ''
                }
              >
                <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
