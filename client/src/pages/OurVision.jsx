import React from "react";

const OurVision = () => {
  return (
    <div className="flex flex-col md:flex-row  justify-between py-10 px-2 gap-y-6 gap-x-9">
      <div className="w-full md:w-1/2">
        <img
          src="/images/vision.jpg"
          alt=""
          className="rounded-md object-cover max-w-full"
        />
      </div>

      <div className="pt-10 w-full md:w-1/2">
        <h1
          className="text-center text-4xl 
        md:text-4xl font-semibold text-slate-800 uppercase md:text-left md:capitalize mb-5"
        >
          Our Vision
        </h1>
        <p className="text-slate-400 leading-7 text-sm text-justify md:text-left px-6 w-full md:px-0">
          we envision a future where online shopping is not just a transaction,
          but a meaningful experience that enriches lives. We strive to create a
          world where technology and innovation come together to make a positive
          impact on our customers, our community, and the environment. Our
          vision is to be a catalyst for change, inspiring a new era of
          Ecommerce that is sustainable, inclusive, and customer-centric. Join
          us on our journey to shape the future of online shopping and create a
          brighter tomorrow for all.
        </p>
      </div>
    </div>
  );
};

export default OurVision;
