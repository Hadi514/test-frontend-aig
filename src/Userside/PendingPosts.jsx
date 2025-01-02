import { useContext, useState } from "react";
import JobSeekerContext from "../ContextApi/JobSeekerContext";
import ViewJobSeeker from "../Adminside/Job Seekers/ViewJobSeeker";
import { Button } from "react-bootstrap";
import UserContext from "../ContextApi/UserContext";

function PendingPosts() {
  const { signUser } = useContext(UserContext);
  const { jobSeekers } = useContext(JobSeekerContext);

  const userJobSeeker = signUser?.role === "Job Seaker"
    ? jobSeekers
      .filter((jobPost) => jobPost.userId?.email === signUser?.email)
      .filter((seekerPost) => seekerPost.status === "Pending")
    : jobSeekers.filter((seekerPost) => seekerPost.status === "Pending");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const jobSeekersPerPage = itemsPerPage;

  const lastUserIndex = currentPage * jobSeekersPerPage;
  const firstJobSeekersIndex = lastUserIndex - jobSeekersPerPage;
  const currentJobSeekers = userJobSeeker?.slice(
    firstJobSeekersIndex,
    lastUserIndex
  );

  const totalPages = Math.ceil(userJobSeeker.length / jobSeekersPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>

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
            <th>View / Status</th>
          </tr>
        </thead>
        <tbody>
          {currentJobSeekers?.length > 0 ? (
            currentJobSeekers.map((seekerPost, index) => {
              return (
                <tr key={index}>
                  <td>{firstJobSeekersIndex + index + 1}</td>
                  <td>{seekerPost.name}</td>
                  <td>{seekerPost.email}</td>
                  <td>{seekerPost.contact}</td>
                  <td>{seekerPost.city}</td>
                  <td>
                    <ViewJobSeeker seekerPostId={seekerPost._id} /> |{" "}
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
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                <strong>No Pending Posts Available</strong>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {userJobSeeker.length > jobSeekersPerPage && (
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

export default PendingPosts;
