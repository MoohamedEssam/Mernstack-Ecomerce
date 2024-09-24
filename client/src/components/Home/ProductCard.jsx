import React, { Fragment, useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import { authContext } from "../../context/Auth";
import { toast } from "react-toastify";

const ProductCard = ({ item }) => {
  const { addToCart, addCartItem } = useContext(cartContext);
  const { auth } = useContext(authContext);
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Fragment key={item._id}>
      <div className="w-full relative overflow-hidden  group transition-all duration-300  bg-white cursor-pointer ">
        <div className="border border-gray-500/5 rounded-md shadow-sm drop-shadow-sm  relative flex justify-center items-center  transition-all duration-300 p-5  hover:shadow-md">
          <img
            src={`http://localhost:8000/images/${item.image}`}
            className=" w-[250px] lg:w-[80%] rounded-lg   h-[230px] group-hover:scale-105 transition-all duration-300 flex items-center object-contain justify-center  "
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between gap-y-1 mt-2">
          <p className="text-gray-400 ml-4 uppercase text-sm"></p>
          <p className="text-slate-800 ml-4 text-sm uppercase font-bold">
            {item.name.slice(0, 55)}...
          </p>

          <div className="flex items-center justify-between">
            <p className=" ml-4 text-slate-700 text-md">$ {item.price}</p>
          </div>
        </div>

        <div
          className="flex flex-col  gap-y-4 absolute top-6 
          -right-[100vw]
          group-hover:right-4
          transition-all duration-300
        "
        >
          <button
            className="bg-white drop-shadow-md text-slate-700 p-3 hover:drop-shadow-xl hover:bg-slate-10"
            onClick={() =>
              auth.user
                ? addCartItem(item)
                : toast.error(`You have To Login To Complete Add To Cart`)
            }
          >
            <FaPlus />
          </button>

          <Link to={`/product/${item._id}`}>
            <button className="bg-red-400 drop-shadow-md text-slate-100 p-3 hover:drop-shadow-xl hover:bg-pink-500">
              <FaEye />
            </button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
