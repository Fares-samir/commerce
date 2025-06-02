import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/freshcart-logo.svg";
import Authcontext, { Authcon } from "../../../scr/Authcontext/Authcontext";
import { carcontext } from "../../Context/Context"; // ✅ أضفنا الـ import الصحيح

export default function Nav() {
  let navi = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  let { token, settoken } = useContext(Authcon);
  let { numcartitems } = useContext(carcontext);

  function logout1() {
    localStorage.removeItem("token");
    settoken(null);
    navi("/login"); // ✅ صلح اسم المسار لو كان ده المقصود
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo + First Menu */}
        <div className="flex items-center space-x-6">
          <NavLink to="/" className="flex items-center">
            <img src={logo} className="h-8" alt="Freshcart Logo" />
          </NavLink>
          {token && (
            <ul className="hidden md:flex font-medium space-x-6 rtl:space-x-reverse">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-gray-900"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/product" className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-gray-900"}>
                  Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-gray-900"}>
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/category" className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-gray-900"}>
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/brands" className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-gray-900"}>
                  Brands
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Toggle for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        {/* Right-side Menu */}
        <ul className="hidden md:flex font-medium space-x-6 rtl:space-x-reverse items-center">
          <li>
            <NavLink to="/face" className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-gray-900"}>
              <i className="fa-brands fa-facebook"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/twitter" className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-gray-900"}>
              <i className="fa-brands fa-twitter"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/youtube" className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-gray-900"}>
              <i className="fa-brands fa-youtube"></i>
            </NavLink>
          </li>
          {token ? (
            <>
             <li>
                <NavLink to="/cart" className="relative">
                  <i className="fa-solid fa-cart-shopping text-xl text-active"></i>
                  {numcartitems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
                      {numcartitems}
                    </span>
                  )}
                </NavLink>
              </li>
              <li onClick={logout1}>
                <span className="cursor-pointer text-gray-900 hover:text-blue-700">Log out</span>
              </li>
             
            </>
          ) : (
            <>
              <li>
                <NavLink to="/loging" className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-gray-900"}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-gray-900"}>
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu */}
        <div className={`${isOpen ? "block" : "hidden"} w-full md:hidden`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/product">Product</NavLink></li>
            <li><NavLink to="/cart">Cart</NavLink></li>
            <li><NavLink to="/category">Category</NavLink></li>
            <li><NavLink to="/brands">Brands</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
