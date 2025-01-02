import { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ViewResourceModal from "./ViewResourceModal";
import EditResourceProvider from "./EditResourceProvider";
import ResourcesContext from "../../ContextApi/ResourcesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

export default function AllResource() {
  const { allResources, delResourceId } = useContext(ResourcesContext);

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const resourcePerPage = itemsPerPage;

  // Calculate the indices of the items to be displayed on the current page
  const lastIndex = currentPage * resourcePerPage;
  const firstIndex = lastIndex - resourcePerPage;
  const currentItems = allResources.slice(firstIndex, lastIndex);

  // Total number of pages
  const totalPages = Math.ceil(allResources.length / resourcePerPage);

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
      <h2 className=" pb-3">Resource List</h2>

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
                    <ViewResourceModal resouceId={posts._id} />
                    <EditResourceProvider ResourceId={posts._id} />
                    <FontAwesomeIcon icon={faTrash} onClick={() => delResourceId(posts._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* {/ Pagination Controls /} */}
      {allResources.length > resourcePerPage && (
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
