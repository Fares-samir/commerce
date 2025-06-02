import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Forgetpass() {
  const [errMessage, setErrMessage] = useState(null);
  const [fromdisplay, setFromDisplay] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  
  const navigate = useNavigate();

  const forgetform = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Enter a valid email"),
    }),
    onSubmit: async (data) => {
      try {
        const response = await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, data);
        setSuccessMessage("Reset link sent successfully! Check your email.");
        setFromDisplay(false);
        setErrMessage(null);
      } catch (error) {
        setErrMessage(error.response?.data?.message || "Something went wrong");
        setSuccessMessage(null); 
      }
    },
  });

  const verifyResetCode = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Reset code is required"),
    }),
    onSubmit: async (data) => {
      try {
        const response = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, data);
        setSuccessMessage("Code verified successfully!");
        navigate("/update");
        setErrMessage(null);
      } catch (error) {
        setErrMessage(error.response?.data?.message || "Something went wrong");
        setSuccessMessage(null);
      }
    },
  });

  return (
    <>
      {fromdisplay ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
          <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Forget Password
            </h1>

            {errMessage && (
              <div className="p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400" role="alert">
                {errMessage}
              </div>
            )}

            {successMessage && (
              <div className="p-4 mb-4 w-full text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400" role="alert">
                {successMessage}
              </div>
            )}

            <form onSubmit={forgetform.handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  onChange={forgetform.handleChange}
                  onBlur={forgetform.handleBlur}
                  value={forgetform.values.email}
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {forgetform.touched.email && forgetform.errors.email && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {forgetform.errors.email}
                  </p>
                )}
              </div>

              <button
                disabled={!(forgetform.isValid && forgetform.dirty)}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
          <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Verify Code
            </h1>

            {errMessage && (
              <div className="p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400" role="alert">
                {errMessage}
              </div>
            )}

            {successMessage && (
              <div className="p-4 mb-4 w-full text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400" role="alert">
                {successMessage}
              </div>
            )}

            <form onSubmit={verifyResetCode.handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Reset Code
                </label>
                <input
                  onChange={verifyResetCode.handleChange}
                  onBlur={verifyResetCode.handleBlur}
                  value={verifyResetCode.values.resetCode}
                  type="text"
                  id="resetCode"
                  name="resetCode"
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {verifyResetCode.touched.resetCode && verifyResetCode.errors.resetCode && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {verifyResetCode.errors.resetCode}
                  </p>
                )}
              </div>

              <button
                disabled={!(verifyResetCode.isValid && verifyResetCode.dirty)}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-black font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
              >
                Verify Code
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
