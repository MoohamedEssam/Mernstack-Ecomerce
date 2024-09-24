import React from "react";

const NewsLetter = () => {
  return (
    <div className="news-letter">
      <div className="md:container md:mx-auto  py-10 w-full">
        <div
          className=" flex flex-col 
        md:flex-row
        items-center justify-around w-full"
        >
          <div className="text-center md:text-left">
            <h1 className="text-slate-50 font-semibold text-3xl md:text-2xl">
              Sign Up For NewsLetter
            </h1>
            <p className="text-slate-400 flex gap-x-2 items-center  mt-2 mb-5 md:mb-0 text-sm md:text-md ">
              Get E-mail updates about latest shop and
              <span className="text-slate-400 text-md">special offer</span>
            </p>
          </div>
          <div className="sm:w-full md:w-1/2  px-4 w-full ">
            <form
              action=""
              className="flex items-center justify-center md:justify-start  h-11   "
            >
              <input
                type="text"
                placeholder="Your Email Address"
                className="outline-none px-2  h-full sm:w-full text-lg font-semibold rounded-l-sm text-slate-600  "
              />
              <button
                type="submit"
                className="sm:w-1/3  bg-slate-500 px-7 h-full text-md text-nowrap font-semibold text-white rounded-r-sm hover:bg-slate-400"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
