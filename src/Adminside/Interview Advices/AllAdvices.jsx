import { useContext, useState } from "react"
import AdviceContext from "../../ContextApi/AdviceContext"
import ViewAdvice from "./ViewAdvice"
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "react-bootstrap"

function AllAdvices() {
    const { postedAdvices, deleteAdvice } = useContext(AdviceContext)

    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(25)
    const advicePerPage = itemsPerPage

    const lastAdviceIndex = currentPage * advicePerPage
    const firstUserIndex = lastAdviceIndex - advicePerPage
    const currentAdvices = postedAdvices?.slice(firstUserIndex, lastAdviceIndex)

    const totalPages = Math.ceil(postedAdvices.length / advicePerPage)

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }
    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
    }

    return (
        <>
        <h2>Interview Advices List</h2>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Advice</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAdvices?.map((review, index) => {
                            return <tr key={index}>
                                <td>{firstUserIndex + index + 1}</td>
                                <td>{review.name}</td>
                                <td>{review.email}</td>
                                <td>{review.advice.slice(0, 20) + "..."}</td>
                                <td>
                                    <ViewAdvice idAdvice={review._id} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteAdvice(review._id)} />
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
            {postedAdvices?.length > advicePerPage && (
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

export default AllAdvices
