import { useContext, useState } from "react";
import JobSeekerContext from "../ContextApi/JobSeekerContext";
import ViewJobSeeker from "../Adminside/Job Seekers/ViewJobSeeker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import UserContext from "../ContextApi/UserContext";

function ManageJobSeekerPosts() {
  const { signUser } = useContext(UserContext);
  const { jobSeekers, delSeekerId } = useContext(JobSeekerContext);

  const userJobSeeker = signUser?.role === "Job Seaker"
    ? jobSeekers.filter(
      (jobPost) => jobPost.userId?.email === signUser?.email
    )
    : jobSeekers;

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
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {currentJobSeekers?.map((seekerPost, index) => {
            return (
              <tr key={index}>
                <td>{firstJobSeekersIndex + index + 1}</td>
                <td>{seekerPost.name}</td>
                <td>{seekerPost.email}</td>
                <td>{seekerPost.contact}</td>
                <td>{seekerPost.city}</td>
                <td className="">
                  <ViewJobSeeker seekerPostId={seekerPost._id} />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => delSeekerId(seekerPost._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {jobSeekers?.length > jobSeekersPerPage && (
        <div className="pagination-controls mt-3">
          <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span className="me-2 ms-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      )}
    </>
  );
}

export default ManageJobSeekerPosts;
