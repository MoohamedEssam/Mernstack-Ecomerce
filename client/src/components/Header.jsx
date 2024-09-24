import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoIosMenu } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { authContext } from "../context/Auth";
import { ToastContainer, toast } from "react-toastify";
import DropDown from "./DropDown";
import { sidebarContext } from "../context/SidebarContext";
import { searchContext } from "../context/SearchContext";
import { cartContext } from "../context/CartContext";
import { motion } from "framer-motion";

const Header = () => {
  const location = useLocation();
  const isActiveHome =
    location.pathname === "/" || location.pathname.startsWith("/home");
  const isActiveAbout = location.pathname === "/about";
  const isActiveContact = location.pathname === "/contact";

  const [menu, setMenu] = useState(false);

  const { auth, setAuth } = useContext(authContext);

  const { toggleSide } = useContext(sidebarContext);

  const { toggleSearch } = useContext(searchContext);

  const { cartItems } = useContext(cartContext);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");

    navigate("/login");
  };

  const menuRef = useRef();

  useEffect(() => {
    const handler = () => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="flex items-center justify-between px-4 lg:px-12 py-2 sm:py-8 bg-white shadow-sm transition-all duration-300 sticky top-0 left-0 w-full z-30"
    >
      <div className="flex items-center gap-x-3 lg:hidden">
        <IoIosMenu
          className="text-2xl sm:text-3xl text-slate-800  font-normal cursor-pointer hover:text-slate-600 transition-all duration-300 "
          onClick={toggleMenu}
        />
        <FiSearch
          className="text-lg text-slate-800 font-normal sm:hidden cursor-pointer  "
          onClick={toggleSearch}
        />

        {/* small Devices Links */}

        {menu && (
          <motion.div
            initial={{ x: -500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fixed top-3 left-3 h-[95vh] w-[50vw] bg-white drop-shadow-xl z-30"
            onAnimationComplete={() => {
              if (!menu) {
                return {
                  x: -500,
                  opacity: 0,
                };
              }
            }}
            ref={menuRef}
          >
            <div className="">
              <div className="flex items-start flex-col mt-16  ml-10 gap-y-12 font-semibold">
                <span
                  className=" w-12 h-12 rounded-full border p-2 flex items-center justify-center text-lg hover:rotate-180 transition-all duration-300 text-slate-800 cursor-pointer"
                  onClick={toggleMenu}
                >
                  <IoCloseSharp className="" />
                </span>
                <Link
                  to={"/"}
                  className={`text-slate-800 text-lg font-semibold ${
                    isActiveHome ? "text-green-400  scale-150 " : ""
                  } hover:text-slate-500 transition-all duration-300`}
                >
                  Home
                </Link>
                <Link
                  to={"/about"}
                  className={`text-slate-800 text-lg font-semibold ${
                    isActiveAbout ? "text-green-400  scale-150 " : ""
                  } hover:text-slate-500 transition-all duration-300`}
                >
                  About
                </Link>
                <Link
                  to={"/contact"}
                  className={`text-slate-800 text-lg font-semibold ${
                    isActiveContact ? "text-green-400  scale-150 " : ""
                  } hover:text-slate-500 transition-all duration-300`}
                >
                  Contact
                </Link>
                <Link to={"/login"} className="lg:block hidden">
                  <button
                    className=" bg-neutral-600 py-1 px-12
            text-lg rounded-sm text-white font-semibold hover:bg-transparent hover:text-slate-800 transition-all duration-300 hover:border "
                  >
                    login
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
        {/* end Small Devices Links */}
      </div>

      <div>
        <Link to={"/"}>
          <h1 className="text-lg sm:text-3xl text-slate-800 font-bold">
            E-Commerce
          </h1>
        </Link>
      </div>

      {/* links */}

      <div className=" hidden lg:block relative">
        <div className="flex justify-between items-center gap-6 font-semibold">
          <Link
            to={"/"}
            className={`text-slate-800 text-lg font-semibold ${
              isActiveHome ? "text-green-400  scale-110 " : ""
            } hover:text-slate-500 transition-all duration-300`}
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className={`text-slate-800 text-lg font-semibold ${
              isActiveAbout ? "text-green-400  scale-110 " : ""
            } hover:text-slate-500 transition-all duration-300`}
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className={`text-slate-800 text-lg font-semibold ${
              isActiveContact ? "text-green-400  scale-110 " : ""
            } hover:text-slate-500 transition-all duration-300`}
          >
            Contact
          </Link>

          {!auth.user ? (
            <Link
              to={"/login"}
              className="lg:block hidden relative transition-all duration-300"
            >
              <button
                className="
               text-xl text-blue-800 hover:underline underline-offset-4 
               
               transition-all duration-200
             "
              >
                login
              </button>
            </Link>
          ) : (
            <DropDown handleLogout={handleLogout} />
          )}
        </div>
      </div>

      {/* end links */}

      <div className="flex items-center gap-x-3">
        <FiSearch
          className="text-2xl text-slate-800 sm:inline hidden cursor-pointer"
          onClick={toggleSearch}
        />

        <button onClick={toggleSide}>
          <div className="relative">
            <LuShoppingCart className="text-xl sm:text-2xl  text-slate-800 font-semibold" />
            <span className="absolute -top-3 -right-1 text-neutral-900  font-semibold rounded-full">
              {cartItems?.length}
            </span>
          </div>
        </button>

        {!auth.user ? (
          <Link to={"/login"} className=" lg:hidden">
            <button className=" bg-blue-700 py-1 px-3 rounded-md text-white font-semibold ">
              login
            </button>
          </Link>
        ) : (
          <div className="lg:hidden m-0">
            <DropDown handleLogout={handleLogout} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Header;
