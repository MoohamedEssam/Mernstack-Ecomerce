import React, { useContext, useEffect, useRef, useState } from "react";
import SideBar from "../SideBar";
import axios from "axios";
import { authContext } from "../../../context/Auth";
import { toast } from "react-toastify";
import AllCategory from "./AllCategory";
import { categoryContext } from "../../../context/CategoryContext";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(authContext);

  const { allCategory, CreateCategory, name, setName } =
    useContext(categoryContext);

  const toggleAddCategory = () => {
    setAddCategory(!addCategory);
  };

  const createRef = useRef();

  useEffect(() => {
    let handle = () => {
      if (createRef.current && !createRef.current.contains(event.target)) {
        setAddCategory(false);
      }
    };
    document.addEventListener("mousedown", handle);
  }, []);

  return (
    <div className="grid w-full grid-cols-12 h-[85vh]">
      <div className="col-span-1 md:col-span-2  bg-white drop-shadow-sm">
        <SideBar />
      </div>
      <div className="col-span-11 md:col-span-10 w-full">
        <div className="mt-5 md:ml-10 flex flex-col  m-5 md:px-10 py-3 w-[84%]  border-1 gap-y-5">
          <h1 className="text-center md:text-2xl text-lg  text-slate-800 font-bold">
            Create Category
          </h1>
          <div className="mt-2" ref={createRef}>
            <button
              onClick={toggleAddCategory}
              className={`${
                !addCategory ? "bg-neutral-700" : "bg-neutral-500"
              } text-white px-4 hover:bg-slate-500 py-1 transition-all duration-300 flex items-center justify-between gap-x-2`}
            >
              Add Category
              <IoIosArrowDown
                className={`${addCategory ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {addCategory && (
                <motion.form
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`${
                    addCategory ? "block " : "hidden "
                  } mt-5 transition-opacity duration-300 w-[full]
              sm:w-[80%] md:w-[60%] flex items-center justify-between border border-gray-10 `}
                  onSubmit={CreateCategory}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-[60%] ms:w-[70%] md:px-2 outline-none focus:outline-none py-2 rounded-l-md "
                  />
                  <button
                    disabled={loading}
                    type="submit"
                    className={`bg-gray-600 w-[35%] md:w-[25%] py-2 rounded-r-sm text-white ${
                      loading ? "bg-neutral-500" : ""
                    } `}
                  >
                    {loading ? (
                      <motion.div
                        role="status"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <svg
                          aria-hidden="true"
                          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </motion.div>
                    ) : (
                      "Create"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-5  ">
            <AllCategory allCategory={allCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
