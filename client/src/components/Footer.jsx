import React from "react";
import { Link } from "react-router-dom";
import { FaCcPaypal } from "react-icons/fa6";

import { FaCcStripe } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-10 bg-neutral-900 py-14 md:px-10 px-2  w-full relative ">
      <div className="grid grid-cols-2 md:grid-cols-4  gap-x-5 gap-y-8">
        <div className=" w-full">
          <h2 className="text-slate-100 text-2xl font-semibold uppercase mb-4 ">
            About
          </h2>
          <p className="text-slate-300 text-md text-wrap text-left w-full text-sm">
            we're driven by a passion to deliver exceptional experiences that
            exceed our customers' expectations. Our journey began with a simple
            yet powerful idea: to create a platform that makes online shopping
            easy, convenient, and enjoyable. Today, we're proud to be a leading
            ecommerce destination, dedicated to providing top-quality products,
            outstanding customer service, and a seamless shopping experience.
            Learn more about our mission, values, and the people behind our
            brand
          </p>
          <div className="flex items-center gap-x-4 mt-4 w-full ">
            <Link
              to={"/checkout"}
              className="text-slate-400 text-4xl hover:text-slate-300"
            >
              <FaCcPaypal />
            </Link>
            <Link
              to={"/checkout"}
              className="text-slate-400 hover:text-slate-300 text-4xl"
            >
              <FaCcStripe />
            </Link>
            <Link
              to={"/checkout"}
              className="text-slate-400 text-4xl  hover:text-slate-300"
            >
              <FaCcVisa />
            </Link>
          </div>
        </div>

        <div className=" px-4 drop-shadow-md ">
          <h2 className="text-slate-100 text-2xl uppercase font-semibold mb-4">
            Categories
          </h2>
          <ul className="flex flex-col justify-between gapy-2">
            <li className="text-slate-100 font-semibold">
              <Link to={"/products"} className="hover:text-slate-400">
                Women's
              </Link>
            </li>
            <li className="text-slate-100 font-semibold">
              <Link className="hover:text-slate-400" to={"/products"}>
                Men's
              </Link>
            </li>
            <li className="text-slate-100 font-semibold">
              <Link className="hover:text-slate-400" to={"/products"}>
                Kid's
              </Link>
            </li>
            <li className="text-slate-100 font-semibold">
              <Link className="hover:text-slate-400" to={"/products"}>
                Technology's
              </Link>
            </li>
            <li className="text-slate-100 font-semibold">
              <Link className="hover:text-slate-400" to={"/products"}>
                Sports
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-slate-10 text-2xl uppercase font-semibold mb-4">
            Information
          </h2>
          <ul className="text-slate-200 font-semibold ">
            <li>
              <Link className="hover:text-slate-400" to={"/about"}>
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-slate-400" to={"/contact"}>
                Contact Us
              </Link>
            </li>

            <li>
              <Link className="hover:text-slate-400">Terms & Conditions</Link>
            </li>
            <li>
              <Link className="hover:text-slate-400">Privacy Policy</Link>
            </li>
            <li>
              <Link className="hover:text-slate-400">Return Policy</Link>
            </li>
            <li>
              <Link className="hover:text-slate-400">FAQs</Link>
            </li>
            <li>
              <Link className="hover:text-slate-400">Help</Link>
            </li>
          </ul>
        </div>

        <div className=" w-full ">
          <h2 className="text-slate-10 text-2xl font-semibold uppercase mb-4 ">
            Contact
          </h2>
          <p className="text-slate-200 font-semibold flex items-center">
            <Link>Email: info@example.com</Link>
          </p>
          <p className="text-slate-200 font-semibold">Phone: +1 234 567 890</p>
          <p className="text-slate-200 font-semibold">
            Address: 10 Street Name, City Name Country, Zip code
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
