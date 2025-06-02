import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Forgetpass from "../Forgetpass/Forgetpass";
import Authcontext, { Authcon } from "../../../scr/Authcontext/Authcontext";

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&]{6,16}$/;

export default function Login() {
  const { settoken } = useContext(Authcon);

  const [errMessage, setErrMessage] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  const navigate = useNavigate();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Enter a valid email"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          passwordRegex,
          "Password must be 6-16 characters long and include at least one digit and one special character"
        ),
    }),
    onSubmit: async (data) => {
      try {
        const response = await axios.post(`${baseUrl}/api/v1/auth/signin`, data);
        if (response.data.message === "success") {
          settoken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
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
          Log in Now
        </h1>
        {errMessage && (
          <div
            className="p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400"
            role="alert"
          >
            {errMessage}
          </div>
        )}
        <form onSubmit={loginForm.handleSubmit} className="space-y-6">
          {["email", "password"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values[field]}
                type={field === "password" ? "password" : "email"}
                id={field}
                name={field}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {loginForm.touched[field] && loginForm.errors[field] && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {loginForm.errors[field]}
                </p>
              )}
            </div>
          ))}
          <Link to="/forget" className="text-blue-500 hover:text-blue-700">
            Forgot password?
          </Link>
          <button
            disabled={!(loginForm.isValid && loginForm.dirty)}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 mt-4"
          >
            Log in
          </button>

          {/* Link to the Register page */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Don’t have an account?{" "}
              <Link to="/Notfound" className="text-blue-500 hover:text-blue-700 font-medium">
                Register here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
