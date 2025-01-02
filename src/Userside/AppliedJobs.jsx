import { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons"
import JobApplyViewModal from "../Adminside/Applied Jobs/JobApplyViewModal"
import JobApplyContext from "../ContextApi/JobApplyContext"
import UserContext from "../ContextApi/UserContext"
import { Button } from "react-bootstrap"
// import JobApplyEditModal from "./JobApplyEditModal"

export default function AppliedJobs() {
    const { getAppliedJobs, deleteApplicationById } = useContext(JobApplyContext)
    const { signUser } = useContext(UserContext)

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
                            <th>Profession</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentApplications?.filter(applyJob => applyJob.email === signUser.email).reverse().map((applyJob, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{applyJob.name}</td>
                                <td>{applyJob.jobId?.title}</td>
                                <td>{applyJob.profession}</td>
                                <td>
                                    <JobApplyViewModal applyJobId={applyJob._id} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteApplicationById(applyJob._id)} />
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
