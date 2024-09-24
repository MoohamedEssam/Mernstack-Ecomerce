import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { categoryContext } from "../../../context/CategoryContext";
import { motion } from "framer-motion";

const Categories = ({ item, handleDelete, setModalOpen }) => {
  const { singleCategory, getSingleCategory } = useContext(categoryContext);

  return (
    <>
      <motion.tr
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-7000 "
        key={item._id}
      >
        <th
          scope="row"
          className="px-6 py-4 text-md md:text-lg text-slate-800 font-semibold  whitespace-nowrap dark:text-white"
        >
          {item.slug}
        </th>
        <td className="px-6 py-4 flex items-center gap-x-2">
          <button
            onClick={() => singleCategory(item._id) && setModalOpen(true)}
            className=" bg-blue-600 text-slate-10 px-4 py-1 rounded-sm"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(item._id)}
            type="submit"
            className="bg-red-500 text-slate-10 px-3 py-1 rounded-sm"
          >
            Delete
          </button>
        </td>
      </motion.tr>
    </>
  );
};

export default Categories;
