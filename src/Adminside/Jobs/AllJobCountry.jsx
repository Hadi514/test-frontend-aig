import { useContext, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import AddCountryModal from "./AddCountryModal";
import jobConContext from "../../ContextApi/JobConContext";
import UserContext from "../../ContextApi/UserContext";

export default function AllJobCountry() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const {
        jobCon,
        jobConId,
        getJobConId,
        delJobConId,
        setJobConId,
        alljobCon,
    } = useContext(jobConContext);

    const [lgShow, setLgShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25)
    const jobConPerPage = itemsPerPage;
    const totalItems = jobCon?.length || 0;
    const totalPages = Math.ceil(totalItems / jobConPerPage);
    const {signUser} = useContext(UserContext)

    useEffect(() => {
        // Ensure pagination resets to the first page if total items change
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalItems, totalPages]);

    const updateCountry = async () => {
        const { isConfirmed } = await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        });
        if (isConfirmed) {
            const { country, image } = jobConId
            const formData = new FormData()
            formData.append("country", country)
            formData.append("image", image)
            const res = await fetch(
                `${apiUrl}/api/jobCon/editCountry/${jobConId._id}`,
                {
                    method: "PUT",
                    body: formData
                }
            );
            if (res.ok) {
                Swal.fire("Saved!", "", "success");
                alljobCon()
            }
        } else {
            Swal.fire("Changes are not saved", "", "info");
        }
    };

    const onchange = (e) => {
        const { files, value } = e.target
        if (files) {
            setJobConId({ ...jobConId, image: files[0] })
        } else {
            setJobConId({ ...jobConId, country: value })
        }
    }

    const openViewCountry = (id) => {
        setLgShow(true);
        getJobConId(id);
    };
    const openEditCountry = (id) => {
        setEditShow(true);
        getJobConId(id);
    };

    // Pagination Handlers
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    // Calculate items to display on the current page
    const startIndex = (currentPage - 1) * jobConPerPage;
    const currentItems = jobCon
        ? jobCon.slice(startIndex, startIndex + jobConPerPage)
        : [];

    // Calculate "X of Y" format
    const itemStart = startIndex + 1;
    const itemEnd = Math.min(startIndex + jobConPerPage, totalItems);

    return (
        <div>

            <div className="d-flex mb-3 justify-content-between">
                <h2 className=" text-center">Countries List</h2>
                {signUser.role === "Employer" ? (
                    <p></p>
                ): (

                <AddCountryModal />
                )}
            </div>

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
                            <th>Country</th>
                            <th style={{ opacity: "0" }}>All Jobs Country</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.reverse().map((post, index) => (
                            <tr key={index}>
                                <td>{itemStart + index}</td>
                                <td>{post.country}</td>
                                <td style={{ opacity: "0" }}>{post.country}</td>
                                <td>
                                    <i
                                        className="fa-solid fa-eye me-3"
                                        style={{ color: "blue" }}
                                        onClick={() => openViewCountry(post._id)}
                                    ></i>
                                    {signUser.role !== "Employer" && (
                                        <span>
                                            <i
                                                className="fas fa-edit me-3"
                                                style={{ color: "blue" }}
                                                onClick={() => openEditCountry(post._id)}
                                            ></i>
                                            <i
                                                className="fas fa-trash"
                                                style={{ color: "blue" }}
                                                onClick={() => delJobConId(post._id)}
                                            ></i>
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* {/ {/ Pagination /} /} */}
            {totalPages > 1 && (
                <div className="pagination-controls text-center mt-3">
                    <Button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="me-2"
                    >
                        <FontAwesomeIcon icon={faAnglesLeft} />
                    </Button>
                    <span>
                        {itemStart} to {itemEnd} of {totalItems}
                    </span>
                    <Button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="ms-2"
                    >
                        <FontAwesomeIcon icon={faAnglesRight} />
                    </Button>
                </div>
            )}

            {/* {/ {/ View Modal /} /} */}
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        View Country
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="admin-form" style={{ boxShadow: "none" }}>
                        <label className="form-lable mb-2">Country</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={jobConId.country}
                            style={{ height: "55px", borderRadius: "0" }}
                            readOnly
                        />
                        <label className="form-lable mb-2">Country Image</label><br />
                        <img src={jobConId.image} alt="" style={{ width: "20%" }} />
                    </form>
                </Modal.Body>
            </Modal>

            {/* {/ {/ Edit Modal /} /} */}
            <Modal
                size="lg"
                show={editShow}
                onHide={() => setEditShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit Country
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="admin-form" style={{ boxShadow: "none" }}>
                        <label className="form-lable">Country</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="country"
                            value={jobConId.country}
                            onChange={onchange}
                            style={{ height: "55px", borderRadius: "0" }}
                        />
                        <label className="form-lable">Country Image</label>
                        <div className="d-flex justify-content-between">
                            <input
                                className="form-control mb-2"
                                type="file"
                                name="image"
                                onChange={onchange}
                                style={{ height: "55px", borderRadius: "0", width: "70%" }}
                            />
                            <img src={jobConId.image} alt="" style={{ width: "15%" }} />
                        </div>
                    </form>
                    <div className="mt-3 text-center">
                        <button
                            type="button"
                            className="first-button text-white"
                            onClick={updateCountry}
                        >
                            Update Job Country
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
