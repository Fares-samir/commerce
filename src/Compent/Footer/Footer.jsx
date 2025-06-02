import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Logo or image */}
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80"
          alt="Footer Logo"
          className="w-12 h-12 rounded-full object-cover mb-3 md:mb-0"
        />

        {/* Text content */}
        <p className="text-center md:text-left text-gray-300 text-xs">
          &copy; {new Date().getFullYear()} E-Commerce Inc. All rights reserved.
        </p>

        {/* Social media links */}
        <div className="flex space-x-3 mt-3 md:mt-0 text-sm">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500 transition"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 transition"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
