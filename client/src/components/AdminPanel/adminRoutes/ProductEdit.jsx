import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productContext } from "../../../context/ProductContext";
import SideBar from "../SideBar";
import { categoryContext } from "../../../context/CategoryContext";
import axios from "axios";
import { authContext } from "../../../context/Auth";
import { toast } from "react-toastify";

const ProductEdit = () => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: "",
    category: "",
  });
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("quantity", productData.quantity);
    formData.append("category", productData.category);

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:8000/api/product/${id}`,
        {
          formData,
          ...productData,
        }
      );
      toast.success(response.data.message, { position: "top-right" });

      navigate("/dashboard/admin/product");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.response.data.message, { position: "top-right" });
    }
  };

  const { allCategory } = useContext(categoryContext);
  const { auth } = useContext(authContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/product/${id}`);
      setProductData({
        name: res.data.product.name,
        description: res.data.product.description,
        quantity: res.data.product.quantity,
        price: res.data.product.price,
        category: res.data.product.category._id,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <div className="grid w-full grid-cols-12 h-screen relative">
      <div className="col-span-1 md:col-span-2  bg-white drop-shadow-sm">
        <SideBar />
      </div>
      <div className="col-span-10 md:col-span-10 w-full">
        <h1 className="text-center md:text-2xl text-lg mt-5  text-slate-800 font-bold">
          Update Product
        </h1>

        <form
          action=""
          className="flex flex-col justify-between gap-y-5 px-8"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor=""
              className="text-sm md:text-lg font-semibold text-slate-800 "
            >
              Category
            </label>

            <select
              id="countries"
              className=" border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none transition-all duration-100"
              name="category"
              defaultValue={productData.category}
              onChange={handleChange}
            >
              <option>Choose a Category</option>
              {allCategory.map((item, index) => {
                return (
                  <option
                    value={item._id}
                    key={index}
                    selected={item._id === productData.category}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col gap-y-3">
            <label
              htmlFor=""
              className="text-sm md:text-lg font-semibold text-slate-800"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="w-full outline-none border border-gray-60/10 rounded-md py-2 px-4 focus:border focus:border-blue-600 transition-all duration-200"
              value={productData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label
              htmlFor=""
              className="text-sm md:text-lg font-semibold text-slate-800"
            >
              Description
            </label>

            <textarea
              name="description"
              id="description"
              placeholder="Description"
              className="py-2 px-4 w-full outline-none border border-gray-60/10 rounded-md focus:border focus:border-blue-600 transition-all duration-200 "
              value={productData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex flex-col gap-y-3">
            <label
              htmlFor=""
              className="text-sm md:text-lg font-semibold text-slate-800"
            >
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              name="price"
              className="w-full outline-none border border-gray-60/10 rounded-md py-2 px-4 focus:border focus:border-blue-600 transition-all duration-200"
              value={productData.price}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label
              htmlFor=""
              className="text-sm md:text-lg font-semibold text-slate-800"
            >
              Quantity
            </label>
            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              className="w-full outline-none border border-gray-60/10 rounded-md py-2 px-4 focus:border focus:border-blue-600 transition-all duration-200"
              value={productData.quantity}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-[20vw] bg-indigo-600 py-2 text-white rounded-md md:rounded-md   text-md md:text-lg font-semibold  my-5 hover:bg-indigo-500 transition-all duration-75 ${
              loading ? "cursor-wait" : ""
            } `}
          >
            {loading ? "...loading" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
