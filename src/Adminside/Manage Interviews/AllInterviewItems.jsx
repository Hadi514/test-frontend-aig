import { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import InterviewContext from "../../ContextApi/InterviewContext";
import ShowInterviewModal from "./ShowInterviewModal";
import EditInterviewItem from "./EditInterviewItem";
import { Button } from "react-bootstrap";

export default function AllInterviewItems() {
  const { allInterviews, delInterviewId } = useContext(InterviewContext);

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const interviewsPerPage = itemsPerPage;

  // Calculate the indices of the items to be displayed on the current page
  const lastIndex = currentPage * interviewsPerPage;
  const firstIndex = lastIndex - interviewsPerPage;
  const currentItems = allInterviews.slice(firstIndex, lastIndex);

  // Total number of pages
  const totalPages = Math.ceil(allInterviews.length / interviewsPerPage);

  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2 className=" pb-3">Interview Items List</h2>

      <div>
        <p>Show <select name="" id="" onChange={(e) => setItemsPerPage(e.target.value)}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select> Entries</p>
      </div>

      <div className="table-responsive-sm">
        <table className="admin-table">
          <thead>
            <tr className="form-title">
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.reverse().map((posts, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{posts.title}</td>
                  <td>{posts.category}</td>
                  <td>
                    <ShowInterviewModal interviewId={posts._id} />
                    <EditInterviewItem interviewId={posts._id} />
                    <FontAwesomeIcon icon={faTrash} onClick={() => delInterviewId(posts._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* {/ Pagination Controls /} */}
      {allInterviews.length > interviewsPerPage && (
        <div className="pagination-controls text-center mt-3">
          <Button onClick={goToPrevPage} disabled={currentPage === 1}>
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
    </div>
  );
}
