import React from 'react';
import Nav from "./../Nav/Nav";
import Footer from './../Footer/Footer';
import { Outlet, useLocation } from "react-router-dom";
import { Offline } from 'react-detect-offline';

export default function Layout() {
  const location = useLocation();

  // نخفي البانر في صفحات اللوجن و الريجيستر
  const hideOfflineBanner = ["/loging", "/reg"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* الـ Navbar */}
      <Nav />

      {/* محتوى الصفحة */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* الـ Footer */}
      <Footer />

      {/* بانر الـ offline يظهر فقط لما مش بنكون على صفحات اللوجن أو الريجيستر */}
      {!hideOfflineBanner && (
        <Offline>
          <div className="fixed bottom-6 left-7 bg-red-400 p-3 rounded text-white shadow-lg z-50 max-w-xs w-full text-center">
            You're offline right now. Check your connection.
          </div>
        </Offline>
      )}
    </div>
  );
}
