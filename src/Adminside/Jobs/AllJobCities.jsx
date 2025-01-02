import { useContext, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import AddCityModal from "./AddCityModal";
import JobCityContext from "../../ContextApi/JobCityContext";
import jobConContext from "../../ContextApi/JobConContext";
import UserContext from "../../ContextApi/UserContext";

export default function AllJobCities() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const {
        jobCity,
        jobCityId,
        getJobCityId,
        delJobCityId,
        setJobCityId,
        allJobCity,
    } = useContext(JobCityContext);
    const [searchCountry, setSearchCountry] = useState("")

    const { jobCon } = useContext(jobConContext)
    const [lgShow, setLgShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25)
    const jobCityPerPage = itemsPerPage;
    const totalItems = jobCity?.length || 0;
    const totalPages = Math.ceil(totalItems / jobCityPerPage);
    const {signUser} = useContext(UserContext)

    useEffect(() => {
        // Ensure pagination resets to the first page if total items change
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalItems, totalPages]);

    const updateCity = async () => {
        const { isConfirmed } = await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        });
        if (isConfirmed) {
            const { city, countryId } = jobCityId
            const res = await fetch(
                `${apiUrl}/api/jobCity/editCity/${jobCityId._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ city, countryId }),
                }
            );
            if (res.ok) {
                Swal.fire("Saved!", "", "success");
                allJobCity()
            }
        } else {
            Swal.fire("Changes are not saved", "", "info");
        }
    };

    const onchange = (e) => {
        setJobCityId({ ...jobCityId, [e.target.name]: e.target.value })
    }

    const openViewCountry = (id) => {
        setLgShow(true);
        getJobCityId(id);
    };
    const openEditCountry = (id) => {
        setEditShow(true);
        getJobCityId(id);
    };

    // Pagination Handlers
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    // Calculate items to display on the current page
    const startIndex = (currentPage - 1) * jobCityPerPage;
    const currentItems = jobCity
        ? jobCity.slice(startIndex, startIndex + jobCityPerPage)
        : [];

    // Calculate "X of Y" format
    const itemStart = startIndex + 1;
    const itemEnd = Math.min(startIndex + jobCityPerPage, totalItems);
    return (
        <div>

            <div className="d-flex mb-3 justify-content-between">
                <h2 className=" text-center">Cities List</h2>
                {signUser.role === "Employer" ? (
                    <p></p>
                ) : (
                <AddCityModal />
                )}
            </div>

            <div className="row find">
                <div className="col-md-4 my-3">
                    <select onChange={(e) => setSearchCountry(e.target.value)}>
                        <option value="">Search City By Country</option>
                        {jobCon?.map((con, index) => (
                            <option key={index} value={con._id}>{con.country}</option>
                        ))}
                    </select>
                </div>
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
                            <th>City</th>
                            <th style={{ opacity: "0" }}>All Jobs City</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.filter(post => post.countryId?._id.includes(searchCountry)).map((post, index) => (
                            <tr key={index}>
                                <td>{itemStart + index}</td>
                                <td>{post.countryId?.country}</td>
                                <td>{post.city}</td>
                                <td style={{ opacity: "0" }}>{post.city}</td>
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
                                                onClick={() => delJobCityId(post._id)}
                                            ></i>
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* {/ {/ {/ Pagination /} /} /} */}
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

            {/* {/ {/ {/ View Modal /} /} /} */}
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        View City
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="admin-form" style={{ boxShadow: "none" }}>
                        <label className="form-lable mb-2">City</label>
                        <input
                            className="form-control"
                            type="text"
                            name="city"
                            value={jobCityId.city}
                            style={{ height: "55px", borderRadius: "0" }}
                            readOnly
                        />
                    </form>
                </Modal.Body>
            </Modal>

            {/* {/ {/ {/ Edit Modal /} /} /} */}
            <Modal
                size="lg"
                show={editShow}
                onHide={() => setEditShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit City
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="admin-form" style={{ boxShadow: "none" }}>
                        <label className="form-lable">Country</label>
                        <select className="form-control mb-2" name="countryId" value={jobCityId.countryId?._id} onChange={onchange}>
                            <option value="">Select Country</option>
                            {jobCon?.map((con, index) => (
                                <option key={index} value={con._id}>{con.country}</option>
                            ))}
                        </select>
                        <label className="form-lable">City</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="city"
                            value={jobCityId.city}
                            onChange={onchange}
                            style={{ height: "55px", borderRadius: "0" }}
                        />
                    </form>
                    <div className="mt-3 text-center">
                        <button
                            type="button"
                            className="first-button text-white"
                            onClick={updateCity}
                        >
                            Update Job City
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    );
}
