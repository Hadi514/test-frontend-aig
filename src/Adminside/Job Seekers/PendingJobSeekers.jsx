import { useContext, useState } from "react";
import ViewJobSeeker from "./ViewJobSeeker";
import { Button } from "react-bootstrap";
import UserContext from "../../ContextApi/UserContext";
import JobSeekerContext from '../../ContextApi/JobSeekerContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function PendingJobSeekers() {
  const { signUser } = useContext(UserContext);
  const { jobSeekers, delSeekerId, jobSeekerApproval, jobSeekerRejection } = useContext(JobSeekerContext);

  const userJobSeeker = signUser?.role === "Job Seaker"
    ? jobSeekers.filter(
      (jobPost) => jobPost.userId?.email === signUser?.email
    )
    : jobSeekers;

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const jobSeekersPerPage = itemsPerPage;

  const pendingJobSeekers = userJobSeeker?.filter(seekerPost => seekerPost.status === "Pending");
  const totalPages = Math.ceil((pendingJobSeekers?.length || 0) / jobSeekersPerPage);

  const lastUserIndex = currentPage * jobSeekersPerPage;
  const firstJobSeekersIndex = lastUserIndex - jobSeekersPerPage;
  const currentJobSeekers = pendingJobSeekers?.slice(
    firstJobSeekersIndex,
    lastUserIndex
  );

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
    <h2>Pending Job Seekers List</h2>
      <div>
        <p>Show <select name="" id="" onChange={(e) => setItemsPerPage(e.target.value)}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select> Entries</p>
      </div>

      <table className="admin-table">
        <thead>
          <tr className="form-title">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Location</th>
            <th>View</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentJobSeekers?.length > 0 ? (
            currentJobSeekers.map((seekerPost, index) => (
              <tr key={index}>
                <td>{firstJobSeekersIndex + index + 1}</td>
                <td>{seekerPost.name}</td>
                <td>{seekerPost.email}</td>
                <td>{seekerPost.contact}</td>
                <td>{seekerPost.city}</td>
                <td>
                  <ViewJobSeeker seekerPostId={seekerPost._id} />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => delSeekerId(seekerPost._id)}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                  />
                </td>
                <td>
                  {seekerPost.status === "Pending" ? (
                    <span
                      style={{
                        color: "#fff",
                        backgroundColor: "orange",
                        padding: "8px",
                      }}
                    >
                      Pending
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "#fff",
                        backgroundColor: "green",
                        padding: "8px",
                      }}
                    >
                      Approved
                    </span>
                  )}
                </td>
                <td>
                  <Button
                    className="me-2"
                    style={{
                      backgroundColor: "rgba(0,255,0, 0.6)",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => jobSeekerApproval(seekerPost._id)}
                  >
                    Approve
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => jobSeekerRejection(seekerPost._id)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                <strong>No Pending Job Seekers</strong>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {pendingJobSeekers?.length > jobSeekersPerPage && (
        <div className="pagination-controls mt-3">
          <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span className="me-2 ms-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}

export default PendingJobSeekers;
