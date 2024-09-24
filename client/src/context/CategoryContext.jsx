import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./Auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const categoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [allCategory, setAllCategory] = useState([]);

  const [getSingleCategory, setGetSingleCategory] = useState({
    name: "",
  });

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(authContext);

  const FetchAll = async () => {
    try {
      setLoading(true);
      let response = await axios.get("http://localhost:8000/api/category");
      setAllCategory(response.data.categories);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
      });
    }
  };

  const CreateCategory = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/category", {
        name,
      });

      toast.success("Category created successfully", {
        position: "top-right",
      });
      FetchAll();
      setName("");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-right",
      });
      throw new Error(error.message);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/category/${id}`, {
            headers: { Authorization: `Bearer ${auth?.token}` },
          })
          .then((res) => {
            FetchAll();
            toast.success(res.data.message);
          })
          .catch((err) => {
            toast.error(err.response, data, message);
          });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const singleCategory = async (id) => {
    try {
      let response = await axios.get(
        `http://localhost:8000/api/category/${id}`
      );

      setGetSingleCategory(response.data.category);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
      });
    }
  };

  const updateCategory = async (id) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:8000/api/category/${id}`,
        {
          name: getSingleCategory.name,
        },
    
      );

      console.log(response);

      toast.success("Category updated successfully", {
        position: "top-right",
      });
      FetchAll();
    } catch (error) {
      console.log(error);

      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    FetchAll();

    // eslint-disable-next-line
  }, []);
  return (
    <categoryContext.Provider
      value={{
        allCategory,
        setAllCategory,
        CreateCategory,
        name,
        setName,
        handleDelete,
        singleCategory,
        getSingleCategory,
        setGetSingleCategory,
        updateCategory,
        loading,
      }}
    >
      {children}
    </categoryContext.Provider>
  );
};

export default CategoryContextProvider;
