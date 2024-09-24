import React, { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import axios from "axios";
import { authContext } from "../../../context/Auth";

import { Link } from "react-router-dom";

import Categories from "./Categories";
import Modal from "./Modal";
import { categoryContext } from "../../../context/CategoryContext";

const AllCategory = ({ allCategory }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { auth } = useContext(authContext);

  const { handleDelete, singleCategory } = useContext(categoryContext);

  return (
    <div>
      <div className="flex h-[60vh]  overflow-y-auto relative  ">
        <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500  drop-shadow-sm  ">
          <thead className="text-xs  text-gray-700 uppercase bg-white ">
            <tr>
              <th
                scope="col"
                className="px-3 py-2 md:px-6 md:py-3  whitespace-nowrap"
              >
                Category name
              </th>

              <th
                scope="col"
                className="px-10 py-2 md:px-6 md:py-3  whitespace-nowrap"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allCategory?.map((item, index) => {
              return (
                <Fragment key={index}>
                  <Categories
                    key={item._id}
                    item={item}
                    handleDelete={handleDelete}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                  />
                </Fragment>
              );
            })}
          </tbody>
        </table>

        {modalOpen ? (
          <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AllCategory;
