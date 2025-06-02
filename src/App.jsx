import React, { useState, useEffect } from 'react';
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Compent/Layout/Layout";
import Product from "./Compent/Product/Product";
import Home from "./Compent/Home/Home";
import Cart from "./Compent/Cart/Cart";
import Loging from "./Compent/Loging/Loging";
import Reg from "./Compent/Reg/Reg";
import Notfound from "./Compent/Notfound/Notfound";
import Category from "./Compent/Category/Category";
import Brands from "./Compent/Brands/Brands";
import Logout from './Compent/Logout/Logout';
import Authcontext from '../scr/Authcontext/Authcontext';
import Update from './Compent/Updata/Update';
import Forgetpass from './Compent/Forgetpass/Forgetpass';
import Prodected from './Compent/Prodected/Prodected';
import Details from './Compent/Details/Details';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Context from './Context/Context';
import Shippingdatails from './Compent/Shippingdatails/Shippingdatails';
import { Offline } from 'react-detect-offline';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  const client = new QueryClient();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Prodected><Home /></Prodected> },
        { path: "product", element: <Prodected><Product /></Prodected> },
        { path: "cart", element: <Prodected><Cart /></Prodected> },
        { path: "loging", element: <Loging /> },
        { path: "reg", element: <Reg /> },
        { path: "brands", element: <Prodected><Brands /></Prodected> },
        { path: "Details/:id", element: <Prodected><Details /></Prodected> },
        { path: "logout", element: <Logout /> },
        { path: "forget", element: <Forgetpass /> },
        { path: "update", element: <Update /> },
        { path: "Category", element: <Prodected><Category /></Prodected> },
        { path: "Shippingdatails/:id", element: <Prodected><Shippingdatails /></Prodected> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={client}>
          <ReactQueryDevtools />
          <Authcontext>
            <Context>
              <RouterProvider router={router} />
            </Context>
          </Authcontext>
        </QueryClientProvider>

        {!isOnline && (
          <div className='fixed bottom-6 left-7 bg-red-400 p-3 rounded'>
            You're offline right now. Check your connection.
          </div>
        )}
      </HelmetProvider>
    </>
  );
}
