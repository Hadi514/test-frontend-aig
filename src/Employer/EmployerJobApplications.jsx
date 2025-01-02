import { useContext, useState } from "react"
import jobContext from "../ContextApi/JobContext"
import JobApplyContext from "../ContextApi/JobApplyContext"
import UserContext from "../ContextApi/UserContext"
import JobApplyViewModal from "../Adminside/Applied Jobs/JobApplyViewModal"
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "react-bootstrap"

function EmployerJobApplications() {
  const { signUser } = useContext(UserContext)
  const { postedJobs } = useContext(jobContext)
  const { getAppliedJobs, deleteApplicationById } = useContext(JobApplyContext)

  const IdpostedJobs = postedJobs?.filter(job => job.userId?._id === signUser?._id).map(job => job._id);

  const checkApplication = getAppliedJobs
    ?.filter(application =>
      IdpostedJobs?.includes(application.jobId?._id) && application.status !== "Pending" && application.status !== "N"
    );

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const applicationPerPage = itemsPerPage

  const lastUserIndex = currentPage * applicationPerPage
  const firstApplicationIndex = lastUserIndex - applicationPerPage
  const currentApplications = checkApplication?.slice(firstApplicationIndex, lastUserIndex)

  const totalPages = Math.ceil(checkApplication?.length / applicationPerPage)

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }
  return (
    <>

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
              <th>Job Title</th>
              <th>Job City</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentApplications && currentApplications.map((application, index) => {
              return <tr key={index}>
                <td>{index + 1}</td>
                <td>{application.jobId?.title}</td>
                <td>{application.jobId?.city}</td>
                <td>{application.name}</td>
                <td>{application.email}</td>
                <td>
                  <JobApplyViewModal applyJobId={application._id} />
                  <FontAwesomeIcon icon={faTrash} onClick={() => deleteApplicationById(application._id)} />
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>

      {checkApplication?.length > applicationPerPage && (
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
  )
}

export default EmployerJobApplications
