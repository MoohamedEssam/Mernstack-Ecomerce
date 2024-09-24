import React, { useContext } from "react";
import { categoryContext } from "../../../context/CategoryContext";
import { IoMdClose } from "react-icons/io";

const Modal = ({ modalOpen, setModalOpen }) => {
  const { getSingleCategory, setGetSingleCategory, updateCategory } =
    useContext(categoryContext);

  const handleSubmit = (e)=>{
    e.preventDefault()
    updateCategory(getSingleCategory._id);
    setModalOpen(false);
  }

  return (
    <>
      <div
        className={`fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%]
    md:w-[40vw] bg-white drop-shadow-xl h-[40vh]
    ${modalOpen ? "animate-slide-in" : "animate-slide-out"}`}
      >
        <form
          className="flex flex-col justify-between  px-9 mt-10"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor=""
            className="mb-2 text-lg text-slate-800 font-semibold"
          >
            Name
          </label>
          <input
            type="text"
            name=""
            id=""
            className="mb-5 py-2 rounded-sm bg-slate-200 focus:shadow outline-none px-4 text-slate-800 "
            value={getSingleCategory.name}
            onChange={(e) =>
              setGetSingleCategory({
                ...getSingleCategory,
                name: e.target.value,
              })
            }
          />
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 text-lg rounded-sm hover:bg-blue-600 transition-all duration-150 font-bold"
          >
            Update
          </button>
        </form>
        <span className="absolute top-3 right-3 text-slate-800 font-bold text-xl cursor-pointer hover:text-slate-500 transition-all duration-200">
          <IoMdClose onClick={() => setModalOpen(false)} />
        </span>
      </div>
    </>
  );
};

export default Modal;
