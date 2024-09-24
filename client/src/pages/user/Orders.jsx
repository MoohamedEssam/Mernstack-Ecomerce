import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaBorderAll } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { orderContext } from "../../context/OrderContext";
import axios from "axios";

const Orders = () => {
  const [userOrder, setUserOrder] = useState([]);
  const [userOrderProducts, setUserOrderProducts] = useState([]);
  const [user, setUser] = useState("");

  const getUserOrder = async () => {
    await axios
      .get("http://localhost:8000/api/order/user-order")
      .then((res) => {
        setUser(res.data.map((item) => item.userId.name));

        setUserOrder(res.data);
        // setUserOrderProducts(res.data.products.map((item) => item.products));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  return (
    <div className="grid w-full grid-cols-12 h-[85vh]">
      <div className="col-span-1 md:col-span-2  bg-white drop-shadow-sm">
        <div className=" text-center">
          <div className="mt-5">
            <Link to={"/dashboard/user"}>
              <h1 className="hidden md:block cursor-pointer text-slate-600 text-xl uppercase">
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
        <div className="mt-5 md:ml-10 flex flex-col  m-5 md:px-10 py-3 w-[80%] mx-auto border-1 gap-y-5">
          {userOrder.length > 0 && (
            <h1 className="text-slate-700 text-lg md:text-2xl text-center md:text-left flex flex-col gap-y-3 justify-center items-center">
              <span className="flex gap-x-3">
                <span className="text-slate-700 uppercase">Hello</span>

                <p className="text-slate-500 uppercase font-semibold">{user}</p>
              </span>
              <span className="flex justify-start items-start w-full">
                Your Orders
              </span>
            </h1>
          )}

          {userOrder.length > 0 ? (
            <div className="w-full my-10 h-[50vh] drop-shadow-md overflow-y-auto ">
              <div className="relative overflow-x-auto   ">
                <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 text-center  ">
                  <thead class="text-xs text-gray-700 uppercase bg-slate-50">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Image
                      </th>
                      <th scope="col" class="px-6 py-3 ">
                        Title
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrder.map((item) => {
                      return item.products.map((product) => {
                        return (
                          <tr
                            key={product.productId}
                            className="bg-white border-b"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center flex items-center justify-center"
                            >
                              <img
                                src={`http://localhost:8000/images/${product.productId.image}`}
                                className="w-20 rounded-md"
                                alt=""
                              />
                            </th>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white md:text-wrap"
                            >
                              {product.productId.name.slice(0, 20)}..
                            </th>
                            <td className="px-6 py-4">
                              ${product.productId.price}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {product.quantity}
                            </td>
                            <td className="px-6 py-4">{item.orderStatus}</td>
                            <td className="px-6 py-4 text-center">
                              ${product.productId.price * product.quantity}
                            </td>
                          </tr>
                        );
                      });
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center text-4xl ">Sorry, no order items.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
