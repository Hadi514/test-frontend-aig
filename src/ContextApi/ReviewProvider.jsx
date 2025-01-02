import { useEffect, useState } from "react";
import ReviewContext from "./ReviewContext";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

export default function ReviewProvider({ children }) {
  const [getReviews, setGetReviews] = useState([]);
  const [getReviewById, setGetReviewById] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const allReviews = async () => {
    const res = await fetch(`${apiUrl}/api/review/allReviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setGetReviews(data);
  };

  const reviewById = async (id) => {
    if (id) {
      const res = await fetch(
        `${apiUrl}/api/review/getReviewById/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setGetReviewById(data);
    }
  };

  const deleteReviewById = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Review deleted successfully.",
          icon: "success",
        });
      }
      return result;
    });
    if (isConfirmed) {
      const res = await fetch(`${apiUrl}/api/review/delReviewById/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      })
      if (res.ok) {
        allReviews()
      }
    }
  }

  useEffect(() => {
    allReviews();
  }, []);

  return (
    <ReviewContext.Provider value={{ getReviews, getReviewById, reviewById, deleteReviewById, allReviews, setGetReviewById }}>
      {children}
    </ReviewContext.Provider>
  );
}

ReviewProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
