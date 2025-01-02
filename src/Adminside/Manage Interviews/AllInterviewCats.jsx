import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import InterviewCatContext from "../../ContextApi/InterviewCatContext";
import AddInterviewCatModal from "./AddInterviewCatModal";
import { Button } from "react-bootstrap";

function AllInterviewCats() {
  const { interviewCat, delInterviewCatId } = useContext(InterviewCatContext);

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const interviewCatPerPage = itemsPerPage;

  // Calculate the indices of the items to be displayed on the current page
  const lastIndex = currentPage * interviewCatPerPage;
  const firstIndex = lastIndex - interviewCatPerPage;
  const currentItems = interviewCat.slice(firstIndex, lastIndex);

  // Total number of pages
  const totalPages = Math.ceil(interviewCat.length / interviewCatPerPage);

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
    <>
      <div className="d-flex justify-content-between mb-3">
        <h2 className="">Interview Categories List</h2>
        <AddInterviewCatModal />
      </div>

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
              <th>Category</th>
              <th style={{ opacity: "0" }}>All Interview Category List</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.reverse().map((intCat, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{intCat.category}</td>
                <td style={{ opacity: "0" }}>{intCat.category}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => delInterviewCatId(intCat._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {/ Pagination Controls /} */}
      {interviewCat.length > interviewCatPerPage && (
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
    </>
  );
}

export default AllInterviewCats;