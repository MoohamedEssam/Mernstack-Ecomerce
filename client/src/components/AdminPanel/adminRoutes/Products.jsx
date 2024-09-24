import React, { useContext } from "react";
import SideBar from "../SideBar";
import { Link } from "react-router-dom";
import { productContext } from "../../../context/ProductContext";

const Products = () => {
  const { products, deleteProduct } = useContext(productContext);

  return (
    <div className="grid w-full grid-cols-12 h-[85vh]">
      <div className="col-span-1 md:col-span-2  bg-white drop-shadow-sm">
        <SideBar />
      </div>
      <div className="col-span-11 md:col-span-10 w-full my-5">
        <h1 className="text-center text-slate-800 text-3xl font-semibold mt-5">
          Products
        </h1>

        {products.length > 0 ? (
          <div className="mt-5 md:px-8 ">
            <div className="relative overflow-x-auto h-[75vh] px-5 w-full overflow-y-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 h-full ">
                <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      name
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => {
                    return (
                      <tr className="border-b" key={index}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            src={`http://localhost:8000/images/${item.image}`}
                            className="w-12 md:w-20 rounded-md "
                            alt=""
                          />
                        </th>

                        <td className="px-6 py-4 text-nowrap">
                          {item.name.slice(0, 20)}
                        </td>
                        <td className="px-6 py-4">$ {item.price}</td>
                        <td className="px-6 py-4">{item.category?.slug}</td>
                        <td className="px-6 py-4">{item.quantity}</td>
                        <td className="px-6 py-4 ">
                          <div className="flex flex-col items-center md:flex-row gap-2">
                            <Link
                              to={`/dashboard/admin/product/${item._id}`}
                              className="font-medium bg-indigo-500  text-white px-4 py-1 rounded-sm hover:underline mr-2"
                            >
                              Edit
                            </Link>
                            <button
                              className="font-medium bg-red-600 px-4 py-1 text-white rounded-sm hover:underline"
                              onClick={() => deleteProduct(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center mt-12 text-red-600  text-3xl ">
            ops ! There's No Products
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
