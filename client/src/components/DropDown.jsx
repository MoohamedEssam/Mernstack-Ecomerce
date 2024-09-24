import React, { useContext, useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { authContext } from "../context/Auth";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const DropDown = ({ handleLogout }) => {
  const [dropDown, setDropDown] = useState(false);
  const { auth, setAuth } = useContext(authContext);
  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };
  const dropDownRef = useRef();

  useEffect(() => {
    let handler = () => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);
  return (
    <>
      <motion.div
        className="relative inline-block text-left z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2  font-semibold text-gray-900 shadow-sm ring-gray-300 hover:bg-gray-100 uppercase md:text-md text-sm"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={toggleDropDown}
          >
            {auth?.user.name}
            {dropDown ? (
              <svg
                className="-mr-1 h-5 w-5 text-gray-400 rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </motion.div>
      </motion.div>
      {dropDown && (
        <div
          className={`absolute flex flex-col gap-6  top-15 right-2  lg:top-12 lg:right-2 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black 
          
          w-36 ring-opacity-5 focus:outline-none ${
            dropDown ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } transition-all duration-300`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
          ref={dropDownRef}
        >
          <div className="py-2" role="none">
            <Link
              to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
              className="block px-4 py-2  text-gray-700 text-sm md:text-md uppercase mb-3  hover:text-gray-400 transition-all duration-100"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-2"
            >
              Dashboard
            </Link>
            <form method="POST" action="#" role="none">
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left  text-gray-700  text-sm md:text-md uppercase hover:text-gray-400 transition-all duration-100 mb-4"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-3"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DropDown;
