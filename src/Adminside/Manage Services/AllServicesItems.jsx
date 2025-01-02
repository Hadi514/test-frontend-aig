import { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import ServicesContext from "../../ContextApi/ServicesContext";
import ShowServiceModal from "./ShowServiceModal";
import EditServiceItem from "./EditServiceItem";
import { Button } from "react-bootstrap";

export default function AllServicesItems() {
  const { allServices, delServiceId } = useContext(ServicesContext);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const servicesPerPage = itemsPerPage;

  const lastIndex = currentPage * servicesPerPage;
  const firstIndex = lastIndex - servicesPerPage;
  const currentItems = allServices.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(allServices.length / servicesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2 className=" pb-3">Services Items List</h2>

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
            {currentItems.reverse().map((posts, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{posts.title}</td>
                <td>{posts.category}</td>
                <td>
                  <ShowServiceModal serviceId={posts._id} />
                  <EditServiceItem serviceId={posts._id} />
                  <FontAwesomeIcon icon={faTrash} onClick={() => delServiceId(posts._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {/ Pagination Controls /} */}
      {allServices.length > servicesPerPage && (
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
