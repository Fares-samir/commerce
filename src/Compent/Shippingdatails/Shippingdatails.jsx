import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function ShippingDetails() {
  let { id } = useParams();

  const headerOptions = {
    headers: {
      token: localStorage.getItem('token'),
    },
  };

  function checkoutSession(values) {
    const data = {
      shippingAddress: values,
    };

    const url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5174`;

    axios
      .post(url, data, headerOptions)
      .then((res) => {
        window.location.href = res.data.session.url;
      })
      .catch((err) => {
        console.error('Checkout Error:', err);
      });
  }

  const shippingFormik = useFormik({
    initialValues: {
      city: '',
      details: '',
      phone: '',
    },
    validationSchema: Yup.object({
      city: Yup.string().required('City is required'),
      details: Yup.string().required('Address details are required'),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number')
        .required('Phone is required'),
    }),
    onSubmit: checkoutSession,
  });

  return (
    <div className="mx-auto mt-10 p-4 sm:p-6 md:p-8 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center">
        Shipping Details
      </h1>
      <form onSubmit={shippingFormik.handleSubmit} className="space-y-5">
        {['city', 'details', 'phone'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block mb-2 text-sm sm:text-base font-medium text-gray-900">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              onChange={shippingFormik.handleChange}
              onBlur={shippingFormik.handleBlur}
              value={shippingFormik.values[field]}
              className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {shippingFormik.touched[field] && shippingFormik.errors[field] && (
              <p className="text-red-600 text-sm mt-1">{shippingFormik.errors[field]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={!(shippingFormik.isValid && shippingFormik.dirty)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 rounded-lg transition duration-200 disabled:opacity-50"
        >
          Submit Shipping Info
        </button>
      </form>
    </div>
  );
}
