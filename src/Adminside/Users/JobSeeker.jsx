import { useContext, useState } from "react";
import UserContext from "../../ContextApi/UserContext";
import UserViewModal from "./UserViewModal";
import UserEditModal from "./EditUserModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

function JobSeekerUser() {
  const { addedUsers, deleteUserById } = useContext(UserContext);
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [currentPage, setCurrentPage] = useState(1);
  const userPerPage = itemsPerPage;

  // Filter first, then slice for pagination
  const jobSeekers = addedUsers?.filter((user) => user.role === "Job Seaker") || [];
  const lastUserIndex = currentPage * userPerPage;
  const firstUserIndex = lastUserIndex - userPerPage;
  const currentUsers = jobSeekers.slice(firstUserIndex, lastUserIndex);

  const totalPages = Math.ceil(jobSeekers.length / userPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      <div>
        <h2>Registered Job Seekers List</h2>
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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.reverse().map((user, index) => (
              <tr key={user._id}>
                <td>{firstUserIndex + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <UserViewModal userId={user._id} />
                  <UserEditModal userId={user._id} />
                  <FontAwesomeIcon icon={faTrash} onClick={() => deleteUserById(user._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {/ Show pagination only if there are more than 10 job seekers /} */}
      {jobSeekers.length > userPerPage && (
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

export default JobSeekerUser;
