import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCategory } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { RiProductHuntLine } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";

import { FaBorderNone } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className=" text-center">
      <div className="mt-5">
        <Link to={"/dashboard/admin"}>
          <h1 className="hidden md:block text-slate-600  text-center lg:text-xl uppercase">
            admin panel
          </h1>
          <div className="flex justify-start text-slate-500 md:hidden  items-center text-3xl px-1">
            <GrUserAdmin />
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-y-9 mt-12 ">
        <Link
          to={"/dashboard/admin/create-category"}
          className="flex items-center gap-x-1 cursor-pointer  md:px-6 w-full md:shadow hover:bg-slate-700/15 py-2  "
        >
          <MdOutlineCategory className="text-center text-3xl px-1 text-slate-400 " />
          <span className="hidden md:block text-xs lg:text-lg   text-slate-600 ">
            Create Category
          </span>
        </Link>
        <Link
          to={"/dashboard/admin/create-product"}
          className="flex items-center gap-x-1 cursor-pointer  md:px-6 w-full md:shadow hover:bg-slate-700/15 py-2  "
        >
          <AiOutlineProduct className="text-center text-3xl text-slate-400 px-1" />
          <span className="hidden md:block text-xs lg:text-lg   text-slate-600 ">
            Create Product
          </span>
        </Link>
        <Link
          to={"/dashboard/admin/product"}
          className="flex items-center gap-x-1 cursor-pointer  md:px-6 w-full md:shadow hover:bg-slate-50/10 py-2  "
        >
          <RiProductHuntLine className="text-center text-3xl text-slate-400 px-1" />
          <span className="hidden md:block text-xs lg:text-lg   text-slate-600 ">
            {" "}
            Products
          </span>
        </Link>
        <Link
          to={"/dashboard/admin/order"}
          className="flex items-center gap-x-1 cursor-pointer  md:px-6 w-full md:shadow hover:bg-slate-50/10 py-2  "
        >
          <FaBorderNone className="text-center text-3xl text-slate-400 px-1" />
          <span className="hidden md:block text-xs lg:text-lg   text-slate-600 ">
            Orders
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
