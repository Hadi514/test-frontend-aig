import { useContext, useState } from "react"
import JobApplyContext from "../../ContextApi/JobApplyContext"
import JobApplyViewModal from "./JobApplyViewModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"
// import JobApplyEditModal from "./JobApplyEditModal"

export default function PendingAppliedJobs() {
    const { jobRejection, jobApproval, getAppliedJobs, deleteApplicationById } = useContext(JobApplyContext)

    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(25)
    const applicationPerPage = itemsPerPage

    const lastUserIndex = currentPage * applicationPerPage
    const firstApplicationIndex = lastUserIndex - applicationPerPage
    const currentApplications = getAppliedJobs?.slice(firstApplicationIndex, lastUserIndex)

    const totalPages = Math.ceil(getAppliedJobs?.length / applicationPerPage)

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
                    <thead >
                        <tr className="form-title">
                            <th>#</th>
                            <th>Applicant Name</th>
                            <th>Job Title</th>
                            <th>Job City</th>
                            <th>Manage</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentApplications?.filter(job => job.status === "Pending").map((applyJob, index) => (
                            <tr key={index}>
                                <td>{firstApplicationIndex + index + 1}</td>
                                <td>{applyJob.name}</td>
                                <td>{applyJob.jobId?.title}</td>
                                <td>{applyJob.jobId?.city}</td>
                                <td>
                                    <JobApplyViewModal applyJobId={applyJob._id} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteApplicationById(applyJob._id)} />
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
                                            onClick={() => jobApproval(applyJob._id)}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            style={{
                                                backgroundColor: "red",
                                                color: "white",
                                                border: "none",
                                            }}
                                            onClick={() => jobRejection(applyJob._id)}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            {getAppliedJobs?.length > applicationPerPage && (
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
