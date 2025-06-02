import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Forgetpass from "../Forgetpass/Forgetpass";



const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&]{6,16}$/;

export default function Update() {
  const [errMessage, setErrMessage] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  const navigate = useNavigate();

  const registerForm = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Enter a valid email"),
        newPassword: Yup.string()
        .required("newpassword is required")
        .matches(
          passwordRegex,
          "newpassword must be 6-16 characters long and include at least one digit and one special character"
        ),
    }),
    onSubmit: async (data) => {
      try {
        const response = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`, data);
        console.log("aaaaaaa");
        console.log(response.data);

        
        
        if (response.data.token ) {
          
          navigate("/loging");
        } else {
          setErrMessage(response.data.message);
        }
      } catch (error) {
        setErrMessage(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Update Now
        </h1>
        {errMessage && (
          <div className="p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400" role="alert">
            {errMessage}
          </div>
        )}
     <form onSubmit={registerForm.handleSubmit} className="space-y-6">
  {["email", "newPassword"].map((field) => (
    <div key={field}>
      <label htmlFor={field} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {field.charAt(0).toUpperCase() + field.slice(1)}
      </label>
      <input
        onChange={registerForm.handleChange}
        onBlur={registerForm.handleBlur}
        value={registerForm.values[field]}
        type={field === "email" ? "email" : "password"} 
        id={field}
        name={field}
        className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
      {registerForm.touched[field] && registerForm.errors[field] && (
        <p className="text-red-600 dark:text-red-400 text-sm mt-1">
          {registerForm.errors[field]}
        </p>
      )}
    </div>
  ))}
  <button
    disabled={!(registerForm.isValid && registerForm.dirty)}
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
  >
    Update
  </button>
</form>

      </div>
    </div>
  );
}
