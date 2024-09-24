import React, { Fragment, useContext, useEffect, useState } from "react";
import SideBar from "../SideBar";

import { Select } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";

import { categoryContext } from "../../../context/CategoryContext";
import axios from "axios";
import { authContext } from "../../../context/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
  });
  const [images, setImages] = useState([]);
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setImages([...images, e.target.files]);
  };
  const { allCategory } = useContext(categoryContext);

  const { auth } = useContext(authContext);

  const navigate = useNavigate();
  console.log(images);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("quantity", productData.quantity);
    formData.append("category", productData.category);

    if (images) {
      console.log(images); // Add this line to console.log the images array
      images.forEach((image) => {
        formData.append("image", image[0]); // append each image as a separate file
      });
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message, { position: "top-right" });
      setProductData({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        category: "",
      });
      navigate("/dashboard/admin/product");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message, { position: "top-right" });
    }
  };

  return (
    <div className="grid w-full grid-cols-12">
      <div className="col-span-1 md:col-span-2  bg-white drop-shadow-sm">
        <SideBar />
      </div>
      <div className="col-span-11 md:col-span-10 ">
        <div
          className="mt-5 md:ml-10 flex flex-col px-2   md:px-10 py-3 w-full
        md:w-[80%] 
         mx-auto border-1 gap-y-5"
        >
          <h1 className="text-center md:text-2xl text-lg  text-slate-800 font-bold">
            Create Product
          </h1>

          <form
            action=""
            className="flex flex-col justify-between gap-y-5 px-5 "
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
                value={productData.category}
                onChange={handleChange}
              >
                <option selected>Choose a Category</option>
                {allCategory.map((item, index) => {
                  return (
                    <Fragment key={item}>
                      <option value={item._id}>{item.name}</option>;
                    </Fragment>
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
            <div className="flex flex-col gap-y-3">
              <div>
                <label className="text-sm md:text-lg font-semibold text-slate-800">
                  Upload multiple files
                </label>
                {/* <input
                  className="block w-full text-sm text-gray-800 border border-gray-300 rounded-md cursor-pointer bg-white  focus:outline-none  focus:border-blue-600 transition-all duration-200 "
                  id="multiple_files"
                  type="file"
                  multiple
                  name="image"
                  onChange={handleImage}
                /> */}
                <input
                  type="file"
                  multiple
                  onChange={handleImage}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 focus:outline-none "
                />
                <ul className="flex items-center gap-x-2">
                  {images.map((image, index) => (
                    <li key={index}>
                      <img
                        className="w-10 h-10"
                        src={URL.createObjectURL(image[0])}
                        alt={image[0].name}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-[20vw] bg-indigo-600 py-2 text-white rounded-md md:rounded-md   text-md md:text-lg font-semibold  my-5 hover:bg-indigo-500 transition-all duration-75"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
