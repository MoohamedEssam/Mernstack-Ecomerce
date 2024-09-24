import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { productContext } from "../../context/ProductContext";
import { cartContext } from "../../context/CartContext";
import ProductCard from "../Home/ProductCard";
import { motion } from "framer-motion";
import axios from "axios";
import { FaRegStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { authContext } from "../../context/Auth";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { singleProduct, oneProduct, getRelatedProducts, relatedProducts } =
    useContext(productContext);

  const { auth } = useContext(authContext);
  const { id } = useParams();

  const [rating, setRating] = useState(1);

  const [review, setReview] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  const [view, setView] = useState(1);

  const { addToCart, addCartItem } = useContext(cartContext);

  const categoryID = useMemo(() => oneProduct?.category?._id, [oneProduct]);

  const handleRatingChange = async (e) => {
    const rating = parseInt(e.target.value);
    setRating(rating);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/product/${oneProduct._id}/rating`,
        {
          rating,
        }
      );
      console.log(response);
      // Update the product rating display
      oneProduct.rating = parseFloat(response.data.ratingData.rating);
    } catch (error) {
      console.error(error);
      // Display an error message to the user
      alert("Error submitting rating. Please try again.");
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/product/${oneProduct._id}/review`,
        {
          review,
        }
      );
      console.log(response);
      setReview("");
    } catch (error) {
      console.error(error);
      // Display an error message to the user
      alert("Error submitting review. Please try again.");
    }
  };

  useEffect(() => {
    if (oneProduct) {
      const totalRating = oneProduct?.ratings
        ?.map((item) => (item.rating === undefined ? 1 : item.rating * 1))
        .reduce((acc, rating) => acc + rating, 0);

      if (totalRating) {
        const averageRating = totalRating / oneProduct.ratings?.length;
        setAverageRating(averageRating);
      } else {
        setAverageRating(0);
      }
    }
  }, [oneProduct]);

  useEffect(() => {
    const views = oneProduct?.views;
    setView(views);
  }, [oneProduct]);

  useEffect(() => {
    singleProduct(id);
    getRelatedProducts(categoryID, oneProduct._id);
  }, [id, categoryID]);

  useEffect(() => {
    getRelatedProducts(categoryID, oneProduct._id);
  }, [oneProduct._id, categoryID]);

  const handleImageClick = (img) => {
    setMainImage(img);
  };
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (oneProduct && oneProduct.images) {
      setMainImage(oneProduct.images[0]);
    }
  }, [oneProduct]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className="flex  items-center lg:px-20 sm:px-5 md:px-3 px-6 my-10 lg:gap-x-24 gap-x-1 w-full  transition-all duration-150  ">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex items-center md:items-start justify-center lg:gap-x-24 md:gap-x-10 flex-col md:flex-row w-full  "
        >
          <div className="w-full  md:w-[55%]   transition-all duration-200 md:flex gap-x-1  ">
            <div className="w-full hidden  md:flex  items-center flex-col gap-y-8 ">
              {oneProduct?.images?.map((img) => (
                <img
                  key={img}
                  src={`http://localhost:8000/images/${img}`}
                  className="w-[80px] h-[80px]   hover:scale-105  rounded-md cursor-pointer    transition-all duration-300 object-contain  "
                  alt=""
                  onClick={() => handleImageClick(img)}
                />
              ))}
            </div>

            <motion.img
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              src={`http://localhost:8000/images/${mainImage}`}
              className="w-full md:max-w-[70%] rounded-md h-[50%] bg-slate-50 "
            />
            <div className="md:hidden grid grid-cols-4 place-items-center  gap-x-1  my-5">
              {oneProduct?.images?.map((img) => (
                <img
                  key={img}
                  src={`http://localhost:8000/images/${img}`}
                  className="w-[110px] rounded-sm   duration-300 cursor-pointer h-[80px] hover:scale-105 transition-all  "
                  alt=""
                  onClick={() => handleImageClick(img)}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="text-center md:text-left flex flex-col md:w-[45%] w-full   items md:items-start justify-between gap-y-0 mt-5 md:mt-0  "
          >
            <h1 className="text-slate-800 text-2xl uppercase text-wrap break-words w-full  ">
              {oneProduct?.name}
            </h1>
            <p className="text-slate-500 text-lg">$ {oneProduct?.price}</p>
            <p className="text-sm text-justify text-slate-400 break-words text-wrap ">
              {oneProduct?.description}
            </p>

            <div className="flex justify-center my-2 w-full  items-center">
              <label className="text-slate-600 text-lg font-bold">Rate:</label>
              <select
                id="rating"
                name="rating"
                className="ml-2 w-full shadow-sm
                text-yellow-500 px-4
                 outline-none border border-gray-30/10 py-2"
                value={rating}
                onChange={handleRatingChange}
              >
                <option value="1" className="yellow-star">
                  &#9733;
                </option>
                <option value="2" className="yellow-star active">
                  &#9733;&#9733;
                </option>
                <option value="3" className="yellow-star">
                  &#9733;&#9733;&#9733;
                </option>
                <option value="4" className="yellow-star">
                  &#9733;&#9733;&#9733;&#9733;
                </option>
                <option value="5" className="yellow-star">
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </option>
              </select>
            </div>

            <div className="flex justify-between items-center w-full my-1">
              <p className="text-slate-500 text-lg">
                Rating:{" "}
                <span className="product-rating">
                  {parseFloat(averageRating)?.toFixed(1)}/5
                </span>
              </p>

              <div className="rating-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`star ${
                      i < Math.floor(averageRating) ? "active" : ""
                    }`}
                    onClick={() =>
                      handleRatingChange({ target: { value: i + 1 } })
                    }
                  >
                    <FaRegStar />
                  </span>
                ))}
              </div>
            </div>

            <div className=" flex flex-col justify-between gap-y-1 w-full mt-4">
              <textarea
                id="review"
                name="review"
                className=" w-full outline-none border h-28 resize-none border-gray-700/10 p-2 shadow-sm focus:border-slate-400 focus:drop-shadow-lg transition-all "
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write a review..."
              />
              <button
                className="bg-orange-700 hover:bg-orange-500 uppercase text-white font-bold py-2 px-4 rounded"
                onClick={handleReviewSubmit}
              >
                Submit Review
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-3 items-center  drop-shadow-md  justify-between w-full mt-4 sm:mt-4">
              <button
                className="text-white bg-slate-900 py-2 px-10  text-lg  sm hover:bg-slate-700"
                onClick={() =>
                  auth.user
                    ? addCartItem(oneProduct)
                    : toast.error("You Have to Login to continue")
                }
              >
                Add to Cart
              </button>

              <p className="text-lg text-slate-900">
                All Views :<span className="text-slate-500">{view}</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="mt-20"
      >
        <h1 className="text-xl text-slate-800 font-semibold text-center w-full">
          Related Products
        </h1>

        {relatedProducts?.length === 0 ? (
          <div className="text-center text-xl font-bold text-slate-500 my-10">
            there's not Products Like This. You can try searching for similar
            products.
          </div>
        ) : (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-9 gap-5 sm:px-12 my-14  "
          >
            {relatedProducts?.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
