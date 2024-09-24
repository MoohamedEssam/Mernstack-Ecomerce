import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCategory } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { RiProductHuntLine } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";

import { FaBorderNone } from "react-icons/fa";
import { authContext } from "../../context/Auth";
import { CgProfile } from "react-icons/cg";
import { FaBorderAll } from "react-icons/fa6";

const Dashboard = () => {
  const { auth } = useContext(authContext);
  return (
    <div className="grid w-full grid-cols-12 h-[85vh]">
      <div className="col-span-1 md:col-span-2  bg-white drop-shadow-md">
        <div className=" text-center">
          <div className="mt-5">
            <Link to={"/dashboard/user"}>
              <h1 className="hidden md:block cursor-pointer text-slate-600 lg:text-xl md:text-lg uppercase">
                Dashboard
              </h1>
            </Link>
            <div className="flex justify-start ml-1 hover:bg-slate-100 py-2 text-3xl md:hidden text-slate-600">
              <Link to={"/dashboard/user"}>
                <GrUserAdmin />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-y-9 mt-12 ">
            <Link
              to={"/dashboard/user/profile"}
              className="flex items-center gap-x-1 cursor-pointer max-w-full md:px-6 w-full md:shadow hover:bg-slate-700/10 py-2  "
            >
              <CgProfile className="text-center text-3xl px-1 text-slate-400 " />

              <span className="hidden md:block text-sm text-slate-600 ">
                Profile
              </span>
            </Link>
            <Link
              to={"/dashboard/user/order"}
              className="flex items-center gap-x-1 cursor-pointer  md:px-6 w-full md:shadow hover:bg-slate-700/15 py-2  "
            >
              <FaBorderAll className="text-center text-3xl text-slate-400 px-1" />

              <span className="hidden md:block text-sm text-slate-600">
                Order
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-11 md:col-span-10 w-full">
        <div className="mt-5  flex flex-col  m-5 px-10 py-3 w-full mx-auto border-1 gap-y-5">
          <div className="shadow-md flex flex-col  gap-y-6 px-8 py-3">
            <h1 className="text-slate-500">Your Name :{auth?.user.name}</h1>
            <h1 className="text-slate-500">Your Email :{auth?.user.email}</h1>
            <h1 className="text-slate-500"></h1>
            <Link
              to={"/dashboard/user/profile"}
              className="bg-indigo-500 text-slate-100 hover:bg-indigo-400 py-1.5 w-full md:w-1/3 mx-auto text-center"
            >
              Update Your Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
