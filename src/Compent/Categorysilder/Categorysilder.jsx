import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function Categorysilder() {
  let [cate, setcate] = useState(null);

  function getallpr() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((reg) => {
      setcate(reg.data.data);
    });
  }

  useEffect(() => {
    getallpr();
  }, []);

  const settings = {
    slidesToShow: 6,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For very small screens (like some phones in portrait mode)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="my-5">
        <Slider {...settings}>
          {cate?.map((cate) => {
            return (
              <div key={cate._id}>
                <img
                  src={cate.image}
                  className="h-48 w-full object-cover object-top"
                  alt=""
                />
                <h5 className="text-center">{cate.name}</h5>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
