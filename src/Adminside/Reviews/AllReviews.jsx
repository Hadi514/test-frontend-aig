import { useContext, useState } from "react";
import ReviewContext from "../../ContextApi/ReviewContext";
import SeeReview from "./SeeReview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faBan,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import EditReview from "./EditReview";
import Swal from "sweetalert2";

export default function AllReviews() {
  const { getReviews, deleteReviewById, allReviews } = useContext(ReviewContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const reviewPerPage = itemsPerPage;

  const lastReviewIndex = currentPage * reviewPerPage;
  const firstReviewIndex = lastReviewIndex - reviewPerPage;
  const currentReview = getReviews?.slice(firstReviewIndex, lastReviewIndex);

  const totalPages = Math.ceil(getReviews.length / reviewPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const publishReview = async (id) => {
    const res = await fetch(`${apiUrl}/api/review/acceptStatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) {
      allReviews()
      Swal.fire("Review Published Successfully!");
    } else {
      Swal.fire("Something went wrong!");
    }
  }

  const UnpublishReview = async (id) => {
    const res = await fetch(`${apiUrl}/api/review/rejectStatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) {
      allReviews()
      Swal.fire("Review UnPublished Successfully!");
    } else {
      Swal.fire("Something went wrong!");
    }
  }

  return (
    <>
      <h2>Reviews List</h2>
      <div>
        <p>
          Show{" "}
          <select
            name=""
            id=""
            onChange={(e) => setItemsPerPage(e.target.value)}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>{" "}
          Entries
        </p>
      </div>

      <div className="table-responsive-sm">
        <table className="admin-table">
          <thead>
            <tr className="form-title">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {currentReview?.map((review, index) => {
              return (
                <tr key={index}>
                  <td>{firstReviewIndex + index + 1}</td>
                  <td>{review.name}</td>
                  <td>{review.email}</td>
                  <td>{review.role}</td>
                  <td>
                    <SeeReview reviewId={review._id} />
                    <EditReview reviewId={review._id} />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="me-3"
                      onClick={() => deleteReviewById(review._id)}
                    />
                    {review?.status === "P" ? (
                      <FontAwesomeIcon
                        title="Publish Review"
                        icon={faCheck}
                        onClick={() => publishReview(review._id)
                        }
                        style={{
                          backgroundColor: "rgb(17, 87, 64)",
                          color: "white",
                          border: "none",
                          cursor: "pointer"
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        title="Unpublish Review"
                        icon={faBan}
                        onClick={() => UnpublishReview(review._id)
                        }
                        style={{
                          backgroundColor: "rgb(17, 87, 64)",
                          color: "white",
                          border: "none",
                          cursor: "pointer"
                        }}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {getReviews?.length > reviewPerPage && (
        <div className="pagination-controls mt-3">
          <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </Button>
          <span className="me-2 ms-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </Button>
        </div>
      )}
    </>
  );
}
