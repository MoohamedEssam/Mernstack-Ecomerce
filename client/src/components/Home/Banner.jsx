import React from "react";
import { Link } from "react-router-dom";

import { bannerList } from "./BannerList";
const Banner = () => {
  return (
    <>
      <div className=" my-20 flex flex-col justify-between items-center ">
        <div className="flex items-center flex-col md:flex-row justify-evenly h-full  gap-5 lg:px-10 px-8 mb-10    ">
          <div className="relative h-full w-full   ">
            <img
              src="images/banner/b18.jpg"
              alt=""
              className=" rounded-md w-full object-cover"
            />
            <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full text-center">
              <p className=" text-slate-100 text-lg md:text-2xl lg:text-3xl font-bold">
                Buy 1 Get 1 Free
              </p>
              <p className="text-pink-400 px-3 text-justify text-sm  lg:w-[80%] mx-auto">
                Don't miss out on this incredible offer! Stock up on your
                favorite styles and get a second item of equal or lesser value
                for free.
              </p>
              <Link to={"/products"}></Link>
            </div>
          </div>
          <div className="relative h-full w-full  ">
            <img
              src="images/banner/b10.jpg"
              alt=""
              className=" h-full rounded-md w-full"
            />
            <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full text-center">
              <p className=" text-slate-100 text-lg md:text-2xl lg:text-3xl font-bold w-full">
                UpComming Season
              </p>
              <p className="text-pink-500 text-sm px-2  w-full">
                Get ready to refresh your wardrobe with our latest collection!
              </p>
            </div>
          </div>
        </div>
        <hr />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:px-5 px-8 relative">
          {bannerList.map((item, index) => {
            return (
              <div className="relative" key={index}>
                <img
                  src={item.img}
                  alt=""
                  className=" rounded-md w-full h-full  "
                />
                <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] md:w-full text-center">
                  <p className="text-white sm:text-3xl w-full whitespace-nowrap text-xl lg:text-2xl   font-bold">
                    {item.title}
                  </p>
                  <p className="text-pink-500 text-md ">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Banner;
