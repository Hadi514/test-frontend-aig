import { useContext, useState } from "react";
import jobContext from "../ContextApi/JobContext";
import JobActionModal from "../Adminside/Jobs/JobViewModal"
import JobEditModal from "../Adminside/Jobs/JobEditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../ContextApi/UserContext";
import { Button } from "react-bootstrap";

function EmployerPendingJobs() {
  const { deleteById, pendingJobs } = useContext(jobContext)
  const { signUser } = useContext(UserContext)
  const filterEmployerJob = pendingJobs?.filter(jobs => jobs.userId?._id === signUser._id)

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const applicationPerPage = itemsPerPage

  const lastUserIndex = currentPage * applicationPerPage
  const firstApplicationIndex = lastUserIndex - applicationPerPage
  const currentApplications = filterEmployerJob?.slice(firstApplicationIndex, lastUserIndex)

  const totalPages = Math.ceil(filterEmployerJob?.length / applicationPerPage)

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  return (
    <>

      <h2>Pending Jobs</h2>

      <div>
        <p>Show <select name="" id="" onChange={(e) => setItemsPerPage(e.target.value)}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select> Entries</p>
      </div>

      <div className="table-responsive sm">
        <table className="admin-table">
          <thead>
            <tr className="form-title">
              <th>#</th>
              <th>Job Title</th>
              <th>City</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {currentApplications.length > 0 ? (
              currentApplications.reverse().map((post, index) => (
                <tr key={post._id}>
                  <td>{index + 1}</td>
                  <td>{post.title || "Title Missing"}</td>
                  <td>{post.city?.city || "City Missing"}</td>
                  <td>
                    <JobActionModal postedJobId={post._id} />
                    <JobEditModal postedJobId={post._id} />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteById(post._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No pending jobs found for Employers</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filterEmployerJob?.length > applicationPerPage && (
        <div className="pagination-controls mt-3">
          <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </Button>
          <span className="me-2 ms-2">Page {currentPage} of {totalPages}</span>
          <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </Button>
        </div>
      )}
    </>
  );
}

export default EmployerPendingJobs;


