import { useContext, useState } from "react";
import ResourceCatContext from "../../ContextApi/ResourceCatContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditResourceCatModal from "./EditResourceCatModal";
import AddResourceCatModal from "./AddResourceCatModal";
import { Button } from "react-bootstrap";

function AllResourceCat() {
  const { resourceCat, delResourceCatId } = useContext(ResourceCatContext);

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const resourceCatPerPage = itemsPerPage;

  // Calculate the indices of the items to be displayed on the current page
  const lastIndex = currentPage * resourceCatPerPage;
  const firstIndex = lastIndex - resourceCatPerPage;
  const currentItems = resourceCat.slice(firstIndex, lastIndex);

  // Total number of pages
  const totalPages = Math.ceil(resourceCat.length / resourceCatPerPage);

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
        <h2 className="text-center">Resources Categories List</h2>
        <AddResourceCatModal />
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
              <th style={{ opacity: "0" }}>All Resource Categories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.reverse().map((resCat, index) => {
              return (
                <tr key={index}>
                  <td>{firstIndex + index + 1}</td>
                  <td>{resCat.category}</td>
                  <td style={{ opacity: "0" }}>{resCat.category}</td>
                  <td>
                    <EditResourceCatModal resCatId={resCat._id} />
                    <FontAwesomeIcon icon={faTrash} onClick={() => delResourceCatId(resCat._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* {/ Pagination Controls /} */}
      {resourceCat.length > resourceCatPerPage && (
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

export default AllResourceCat;
