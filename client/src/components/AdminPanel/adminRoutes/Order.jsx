import React, { useContext, useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Link } from "react-router-dom";
import axios from "axios";
import { orderSelect } from "./OrderSelectedList";

const Order = () => {
  const [allOrders, setAllOrders] = useState([]);
  console.log(allOrders);
  

  const getAllOrders = async () => {
    axios
      .get("http://localhost:8000/api/order")
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e, id) => {
    axios
      .put(`http://localhost:8000/api/order`, {
        orderId: id,
        orderStatus: e.target.value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div className="grid w-full grid-cols-12 h-[85vh]">
      <div className="col-span-1 md:col-span-2  bg-white drop-shadow-sm">
        <SideBar />
      </div>
      <div className="col-span-10 md:col-span-10 w-full">
        <h1 className="text-center text-slate-800 text-3xl font-semibold mt-5">
          Orders
        </h1>
        <div className="p-8">
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-slate-50 text-center">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {allOrders?.map((item) => {
                  return (
                    <tr class="bg-white border-b" key={item._id}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-1/2 dark:text-white"
                      >
                        <img
                          src={`http://localhost:8000/images/${item.products.map(
                            (item) => item.productId.image
                          )}`}
                          className=" rounded-md"
                          alt=""
                        />
                      </th>
                      <td class="px-6 py-4 text-left w-full ">
                        <td class="px-6 py-4 text-nowrap text-left ">
                          {item.products.map((item) =>
                            item.productId.description.slice(0, 40)
                          )}
                          ...
                        </td>
                      </td>
                      <td class="px-6 py-4">
                        {item.products.map((item) => item.quantity)}
                      </td>
                      <td class="px-6 py-4">
                        ${item.products.map((item) => item.productId.price)}
                      </td>
                      <td class="px-6 py-4">${item.subtotal}</td>

                      <td class="px-6 py-4">
                        <select
                          name="status"
                          onChange={(e) => handleSubmit(e, item._id)}
                          className=" focus:bg-zinc-500 bg-neutral-700 text-center md:text-left text-white transition-all duration-75 py-2 outline-none border border-slate-200 px-4 rounded-sm"
                        >
                          {orderSelect.map((s) => (
                            <option
                              value={s.label}
                              selected={item.orderStatus === s.label}
                            >
                              {s.value}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td class="px-6 py-4">
                        <select className="focus:bg-slate-400 focus:text-black bg-gray-600 text-center md:text-left text-white transition-all duration-75 py-2 outline-none border border-slate-200 px-1 rounded-sm">
                          <option disabled selected>
                            Name: {item.address.firstName}{" "}
                            {item.address.lastName}
                          </option>
                          <option disabled>Email: {item.address.email}</option>
                          <option disabled>Phone: {item.address.phone}</option>
                          <option disabled>
                            Street: {item.address.street}
                          </option>
                          <option disabled>City: {item.address.city}</option>
                          <option disabled>State: {item.address.state}</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
