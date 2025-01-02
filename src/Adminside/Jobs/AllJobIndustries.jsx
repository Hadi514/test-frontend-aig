import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import JobIndContext from "../../ContextApi/JobIndContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import AddIndModal from "./AddIndModal";
import UserContext from "../../ContextApi/UserContext";

export default function AllJobIndustries() {
  const { jobInd, jobIndId, getjobIndId, setJobIndId, deljobIndId, alljobInd } =
    useContext(JobIndContext);
    const apiUrl = import.meta.env.VITE_API_URL;
  const [lgShow, setLgShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const jobIndPerPage = itemsPerPage;
  const totalPages = Math.ceil((jobInd?.length || 0) / jobIndPerPage);
  const {signUser} = useContext(UserContext)

  const updateIndustry = async (e) => {
    e.preventDefault();
    const { industry, image } = jobIndId;
    const formData = new FormData();
    formData.append("industry", industry);
    formData.append("image", image);

    const { isConfirmed } = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    });
    if (isConfirmed) {
      const res = await fetch(
        `${apiUrl}/api/jobInd/editIndustry/${jobIndId._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (res.ok) {
        Swal.fire("Saved!", "", "success");
        alljobInd();
      }
    } else {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  const onchange = (e) => {
    if (e.target.files) {
      setJobIndId({ ...jobIndId, image: e.target.files[0] });
    } else {
      setJobIndId({ ...jobIndId, [e.target.name]: e.target.value });
    }
  };

  const openViewCategory = (id) => {
    setLgShow(true);
    getjobIndId(id);
  };

  const openEditCategory = (id) => {
    setEditShow(true);
    getjobIndId(id);
  };

  // Pagination Handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Calculate items to display on the current page
  const startIndex = (currentPage - 1) * jobIndPerPage;
  const currentItems = jobInd
    ? jobInd
        .slice()
        .reverse()
        .slice(startIndex, startIndex + jobIndPerPage)
    : [];

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2 className="text-center">Industries List</h2>
        {signUser.role !== "Employer" &&  (
        <AddIndModal />
        )}
      </div>

      <div>
        <p>
          Show{" "}
          <select
            name=""
            id=""
            onChange={(e) => setItemsPerPage(e.target.value)}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>{" "}
          Entries
        </p>
      </div>

      <div className="table-responsive-sm">
        <table className="admin-table">
          <thead>
            <tr className="form-title">
              <th>#</th>
              <th>Industry</th>
              <th style={{ opacity: "0" }}>All Jobs Industries</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((post, index) => {
              return (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{post.industry}</td>
                  <td style={{ opacity: "0" }}>{post.industry}</td>
                  <td>
                    <i
                      className="fa-solid fa-eye me-3"
                      style={{ color: "blue" }}
                      data-bs-toggle="modal"
                      data-bs-target="#static"
                      onClick={() => openViewCategory(post._id)}
                    ></i>
                    {signUser.role !== "Employer" && (
                      <span>
                        <i
                          className="fas fa-edit me-3"
                          style={{ color: "blue" }}
                          data-bs-toggle="modal"
                          data-bs-target="#staticEdit"
                          onClick={() => openEditCategory(post._id)}
                        ></i>
                        <i
                          className="fas fa-trash"
                          style={{ color: "blue" }}
                          onClick={() => deljobIndId(post._id)}
                        ></i>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
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
            {startIndex + 1} to{" "}
            {Math.min(startIndex + jobIndPerPage, jobInd?.length || 0)} of{" "}
            {jobInd?.length || 0}
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
            View Industry
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="admin-form" style={{ boxShadow: "none" }}>
            <label className="form-lable mb-2">Industry</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={jobIndId.industry}
              style={{ height: "55px", borderRadius: "0" }}
              readOnly
            />

            <div className="d-flex mt-3 justify-content-between align-items-center">
              <input
                className="form-control"
                style={{ width: "50%", height: "55px", borderRadius: "0" }}
                type="file"
                placeholder="Add industry Logo"
                name="image"
                onChange={onchange}
              />
              <img
                src={jobIndId.image}
                alt=""
                className="img-fluid"
                style={{ width: "100px" }}
              />
            </div>
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
            Edit Industry
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="admin-form" style={{ boxShadow: "none" }}>
            <label className="form-lable">Industry</label>
            <input
              className="form-control mb-2"
              type="text"
              name="industry"
              value={jobIndId.industry}
              onChange={onchange}
              style={{ height: "55px", borderRadius: "0" }}
            />
            <div className="d-flex justify-content-between align-items-center">
              <input
                className="form-control"
                style={{ width: "50%", height: "55px", borderRadius: "0" }}
                type="file"
                placeholder="Add industry Logo"
                name="image"
                onChange={onchange}
              />
              <img
                src={jobIndId.image}
                alt=""
                className="img-fluid"
                style={{ width: "100px" }}
              />
            </div>
          </form>
          <div className="text-center mt-3 text-white">
            <button
              type="button"
              className="first-button text-white"
              data-bs-dismiss="modal"
              onClick={updateIndustry}
            >
              Update Industry
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
