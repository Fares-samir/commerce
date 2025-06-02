import React, { useContext, useEffect, useState } from 'react';
import { carcontext } from '../../Context/Context';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
  const { getusercart, deleteuserproduct, clearuserproduct, setnumcartitems, update } = useContext(carcontext);
  const [cartdata, setcartdata] = useState();
  const [loading, setloading] = useState(true);
  const [loadingcount, setLoadingCount] = useState({});

  useEffect(() => {
    getcartdata();
  }, []);

  function updatecount(id, count) {
    setLoadingCount((prev) => ({ ...prev, [id]: true }));

    update(id, count)
      .then((req) => {
        setcartdata(req.data.data);
        setLoadingCount((prev) => ({ ...prev, [id]: false }));
      })
      .catch((err) => {
        console.log(err);
        setLoadingCount((prev) => ({ ...prev, [id]: false }));
      });
  }

  function getcartdata() {
    setloading(true);
    getusercart()
      .then((req) => {
        setcartdata(req.data.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }

  function removeitem(id) {
    deleteuserproduct(id)
      .then((req) => {
        setnumcartitems(req.data.numOfCartItems);
        setcartdata(req.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (loading) {
    return (
      <div className="flex bg-slate-300 justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="w-full md:w-10/12 mx-auto my-5">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold mb-4">🛒 Shopping Cart</h2>

          <h2 className="text-xl text-active mb-6">
            Total cart price: <span className="font-bold">{cartdata?.totalCartPrice} EGP</span>
          </h2>

          <div className="divide-y-2 divide-dashed divide-gray-300">
            {cartdata?.products?.length > 0 ? (
              cartdata.products.map((el) => (
                <div key={el._id} className="flex flex-col sm:flex-row justify-between items-center py-4">
                  <div className="w-full sm:w-10/12">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded overflow-hidden border border-gray-300">
                        <img
                          src={el.product.imageCover}
                          className="w-full h-full object-cover"
                          alt={el.product.title}
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <h2 className="text-lg font-medium">{el.product.title}</h2>
                        <h2 className="text-active font-semibold">{el.price} EGP</h2>
                        <button
                          onClick={() => removeitem(el.product._id)}
                          className="mt-2 border border-red-600 px-4 py-1 rounded text-red-600 hover:bg-red-600 hover:text-white transition duration-200"
                        >
                          <i className="fa-solid mr-2 fa-trash-can"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-2/12 flex items-center justify-end mt-4 sm:mt-0">
                    <i
                      style={{ cursor: 'pointer' }}
                      onClick={() => updatecount(el.product._id, el.count + 1)}
                      className="fa-solid fa-plus border border-active p-2 rounded hover:bg-active hover:text-white transition"
                    ></i>

                    {loadingcount[el.product._id] ? (
                      <i className="fa-solid fa-spinner fa-spin text-active mx-3"></i>
                    ) : (
                      <span className="mx-3 text-lg font-medium">{el.count}</span>
                    )}

                    <i
                      style={{ cursor: 'pointer' }}
                      onClick={() => updatecount(el.product._id, el.count - 1)}
                      className="fa-solid fa-minus border border-active p-2 rounded hover:bg-active hover:text-white transition"
                    ></i>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-red-500 py-5">Your cart is empty</div>
            )}
          </div>

          {cartdata?._id && (
            <div className="text-end mt-6">
              <Link
                to={`/Shippingdatails/${cartdata._id}`}
                className="bg-active text-white py-2 block text-center px-6 rounded-full font-medium text-lg hover:bg-opacity-90 transition"
              >
                <i className="fa-brands fa-cc-visa mr-2"></i>Pay Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
