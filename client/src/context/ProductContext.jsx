import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./Auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const productContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [featureProducts, setFeatureProducts] = useState([]);

  const [pageProducts, setPageProducts] = useState([]);

  const [oneProduct, setOneProduct] = useState([]);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);

  const [arrival, setArrival] = useState([]);

  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const [clothe, setClothe] = useState([]);

  const [mobiles, setMobiles] = useState([]);
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(pageProducts.length / limit)) {
      return;
    }
    setPage(newPage);
  };

  const { auth } = useContext(authContext);

  const getAllProduct = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/product");
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const deleteProduct = async (id) => {
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
          .delete(`http://localhost:8000/api/product/${id}`, {
            headers: { Authorization: `Bearer ${auth?.token}` },
          })
          .then((res) => {
            toast.success(res.data.message);
            getAllProduct();
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const filterProduct = async () => {
    try {
      if (checked.length === 0 && radio.length === 0) {
        // If both checked and radio are empty, return all products
        getAllProduct();
      } else {
        const filterData = { checked, radio };
        console.log("filterData:", filterData);
        const response = await axios.post(
          "http://localhost:8000/api/product/filter",
          filterData
        );
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterProductByCategory = async (category) => {
    try {
      if (category === "all") {
        // Return all products
        const response = await axios.get("http://localhost:8000/api/product");
        setPageProducts(response.data.products);
        setProducts(response.data.products);
      } else {
        const response = await axios.get(
          `http://localhost:8000/api/product/filter/${category}`
        );
        setPageProducts(response.data.products);
        setProducts(response.data.products);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const singleProduct = (id) => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((res) => {
        setOneProduct(res.data.product);
      })
      .catch((err) => {});
  };

  // return 6 Products

  useEffect(() => {
    getAllProduct();
  }, []);

  const pageNation = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8000/api/product/page?page=${page}&limit=${limit}`
      );
      setPageProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    pageNation();
  }, []);

  const handleLimitChange = (limit) => {
    setLimit(limit);
  };

  const handleSearch = async () => {
    await axios
      .get(`http://localhost:8000/api/product/search?q=${searchQuery}`)
      .then((res) => {
        setSearchProducts(res.data);
      })
      .catch((error) => {
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const getFeatureProducts = async () => {
    await axios("http://localhost:8000/api/product/feature")
      .then((res) => {
        setFeatureProducts(res.data);
      })
      .catch((error) => {
      });
  };

  const getRelatedProducts = async (id, excludeId) => {
    await axios
      .get(`http://localhost:8000/api/product/category/${id}/${excludeId}`)
      .then((res) => {
        setRelatedProducts(res.data);
      })
      .catch((error) => {
      });
  };

  const newArrival = async () => {
    await axios
      .get(`http://localhost:8000/api/product/newArrival`)
      .then((res) => {
        setArrival(res.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  useEffect(() => {
    getFeatureProducts();
  }, []);
  useEffect(() => {
    newArrival();
  }, []);

  const submitRating = async (id, rating) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/product/${id}/rating`,
        { rating }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getClothe = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/product/clothe/66ed80d8678fe05040d37e26`
      );
      setClothe(response.data.product);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getMobiles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/product/mobile/66ed8851678fe05040d38137"
      );

      setMobiles(response.data.product);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getClothe();
  }, []);
  useEffect(() => {
    getMobiles();
  }, []);

  return (
    <productContext.Provider
      value={{
        products,
        deleteProduct,
        setProducts,
        filterProduct,
        checked,
        radio,
        setRadio,
        filterProductByCategory,
        singleProduct,
        oneProduct,
        handlePageChange,
        limit,
        page,
        handleLimitChange,
        pageProducts,
        setPageProducts,
        setPage,
        setLimit,
        searchQuery,
        handleSearchChange,
        searchProducts,
        setSearchQuery,
        featureProducts,
        getRelatedProducts,
        relatedProducts,
        arrival,
        submitRating,
        clothe,
        mobiles,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
