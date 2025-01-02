import { useContext, useState } from "react";
import jobContext from "../../ContextApi/JobContext";
import { Button } from "react-bootstrap";
import JobActionModal from "../Jobs/JobViewModal"
import JobEditModal from "./JobEditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons";

function RejectedJobs() {
  const { jobRejection, jobApproval, deleteById, rejectedJobs } = useContext(jobContext);

  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [currentPage, setCurrentPage] = useState(1);
  const rejectedJobsPerPage = itemsPerPage;

  // Filter first, then slice for pagination
  const lastJobIndex = currentPage * rejectedJobsPerPage;
  const firstJobIndex = lastJobIndex - rejectedJobsPerPage;
  const currentRejectedJobs = rejectedJobs.slice(firstJobIndex, lastJobIndex);

  const totalPages = Math.ceil(rejectedJobs.length / rejectedJobsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const formatDate = (jobDate) => {
    return new Date(jobDate).toLocaleDateString();
  };

  return (
    <>
      <h2>Rejected Jobs List</h2>

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
              <th>Employer</th>
              <th>Date</th>
              <th>Manage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRejectedJobs.length > 0 ? (
              currentRejectedJobs.map((post, index) => (
                <tr key={post._id}>
                  <td>{index + 1}</td>
                  <td>{post.title || "Title Missing"}</td>
                  <td>{post.city?.city}</td>
                  <td>{post.userId?.name || "Employer Missing"}</td>
                  <td>{formatDate(post.createdAt)}</td>
                  <td>
                    <JobActionModal postedJobId={post._id} />
                    <JobEditModal postedJobId={post._id} />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteById(post._id)}
                    />
                  </td>

                  <td>
                    <div className="d-flex">
                      <Button
                        className="me-2"
                        style={{
                          backgroundColor: "rgb(17, 87, 64)",
                          color: "white",
                          border: "none",
                        }}
                        onClick={() => jobApproval(post._id)}

                      >
                        Approve
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                        }}
                        onClick={() => jobRejection(post._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No Rejected jobs found for Employers</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {rejectedJobs.length > rejectedJobsPerPage && (
        <div className="pagination-controls text-center mt-3">
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

export default RejectedJobs;


