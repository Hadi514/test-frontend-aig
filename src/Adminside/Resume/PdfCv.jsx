import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import 'jspdf-autotable';
import PdfCvContext from "../../ContextApi/PdfCvContext";
import UserContext from "../../ContextApi/UserContext";
import PdfCvUpload from "../../Userside/PdfCvUpload";

function PdfCv() {
    const { allPdfCvs, delPdfCV } = useContext(PdfCvContext);

    const { signUser } = useContext(UserContext);
    const [searchName, setSearchName] = useState("")
    const [searchProfession, setSearchProfession] = useState("")
    const filteredcv = signUser?.role === "Admin" ? allPdfCvs : allPdfCvs?.filter(cv => cv.userId?.email === signUser.email);

    // Pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25)
    const cvPerPage = itemsPerPage;

    const lastIndex = currentPage * cvPerPage;
    const firstIndex = lastIndex - cvPerPage;
    const currentItems = filteredcv.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(filteredcv.length / cvPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between mt-4">
                <h2>All Uploaded Cvs List</h2>
                {signUser?.role === "Job Seaker" && (
                    <span>
                        <PdfCvUpload />
                    </span>
                )}
            </div>
            {signUser?.role === "Admin" && (
                <div className="row mb-4 find d-flex">
                    <div className="col-md-4 mt-4">
                        <input
                            type="text"
                            className="form-control schoo-search"
                            placeholder="Search cv By Name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4 mt-4">
                        <input
                            type="text"
                            className="form-control schoo-search"
                            placeholder="Search cv By Profession"
                            value={searchProfession}
                            onChange={(e) => setSearchProfession(e.target.value)}
                        />
                    </div>
                </div>
            )}
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Profession</th>
                            <th>Action</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.filter(cv => cv.userId?.name.toLowerCase().includes(searchName.toLowerCase())).filter(cv => cv.profession?.toLowerCase().includes(searchProfession.toLowerCase())).map((cv, index) => {
                            return (
                                <tr key={index}>
                                    <td>{firstIndex + index + 1}</td>
                                    <td>{cv.userId?.name}</td>
                                    <td>{cv.userId?.email}</td>
                                    <td>{cv.userId?.number}</td>
                                    <td>{cv.profession}</td>
                                    <td><a href={cv.cv} target="blank"><button style={{
                                        backgroundColor: "rgb(17, 87, 64)",
                                        color: "white",
                                        border: "none",
                                    }}>View Cv</button></a></td>
                                    <td>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => delPdfCV(cv._id)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* {/ Pagination Controls /} */}
            {allPdfCvs?.length > cvPerPage && (
                <div className="pagination-controls mt-3">
                    <Button onClick={goToPrevPage} disabled={currentPage === 1}>
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

export default PdfCv;
