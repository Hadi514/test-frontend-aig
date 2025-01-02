import { useContext, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import JobCatContext from "../../ContextApi/JobCatContext";
import AddCatModal from "./AddCatModal";
import Swal from "sweetalert2";
import UserContext from "../../ContextApi/UserContext";

export default function AllJobCat() {
  const { signUser } = useContext(UserContext)
  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    jobCat,
    jobCatId,
    getjobCatId,
    deljobCatId,
    setJobCatId,
    alljobCat,
  } = useContext(JobCatContext);

  const [lgShow, setLgShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const jobCatPerPage = itemsPerPage;
  const totalItems = jobCat?.length || 0;
  const totalPages = Math.ceil(totalItems / jobCatPerPage);

  useEffect(() => {
    // Ensure pagination resets to the first page if total items change
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalItems, totalPages]);

  const updateCategory = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    });
    if (isConfirmed) {
      const { image, category } = jobCatId
      const formData = new FormData()
      formData.append("category", category)
      formData.append("image", image)
      const res = await fetch(
        `${apiUrl}/api/jobCat/editcategory/${jobCatId._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (res.ok) {
        Swal.fire("Saved!", "", "success");
        alljobCat()
      }
    } else {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  const onchange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setJobCatId({ ...jobCatId, image: files[0] });
    } else {
      setJobCatId({ ...jobCatId, [name]: value });
    }
  };

  const openViewCategory = (id) => {
    setLgShow(true);
    getjobCatId(id);
  };
  const openEditCategory = (id) => {
    setEditShow(true);
    getjobCatId(id);
  };

  // Pagination Handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Calculate items to display on the current page
  const startIndex = (currentPage - 1) * jobCatPerPage;
  const currentItems = jobCat
    ? jobCat.slice().reverse().slice(startIndex, startIndex + jobCatPerPage)
    : [];

  // Calculate "X of Y" format
  const itemStart = startIndex + 1;
  const itemEnd = Math.min(startIndex + jobCatPerPage, totalItems);

  return (
    <div>

      <div className="d-flex mb-3 justify-content-between">
        <h2 className=" text-center">Categories List</h2>
        {signUser?.role !== "Employer" &&  (
          <AddCatModal />
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
              <th>Category</th>
              <th style={{ opacity: "0" }}>All Jobs Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((post, index) => (
              <tr key={index}>
                <td>{itemStart + index}</td>
                <td>{post.category}</td>
                <td style={{ opacity: "0" }}>{post.category}</td>
                <td>
                  <i
                    className="fa-solid fa-eye me-3"
                    style={{ color: "blue" }}
                    onClick={() => openViewCategory(post._id)}
                  ></i>
                  {signUser.role !== "Employer" && (
                    <span>
                      <i
                        className="fas fa-edit me-3"
                        style={{ color: "blue" }}
                        onClick={() => openEditCategory(post._id)}
                      ></i>
                      <i
                        className="fas fa-trash"
                        style={{ color: "blue" }}
                        onClick={() => deljobCatId(post._id)}
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
            View Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="admin-form" style={{ boxShadow: "none" }}>
            {jobCatId.image && (
              <div>
                <label className="form-lable mb-2">Category Image</label><br />
                <img src={jobCatId.image} style={{ width: "10%" }} alt="" /><br />
              </div>
            )}
            <label className="form-lable my-2">Category</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={jobCatId.category}
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
            Edit Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="admin-form" style={{ boxShadow: "none" }}>
            <label className="form-lable">Category</label>
            <input
              className="form-control mb-2"
              type="text"
              name="category"
              value={jobCatId.category}
              onChange={onchange}
              style={{ height: "55px", borderRadius: "0" }}
            />
            <div className="d-flex justify-content-between">
              <input
                className='form-control'
                style={{ width: '70%', height: '55px', borderRadius: '0', marginTop: '20px' }}
                type='file'
                placeholder='Add industry Logo'
                name='image'
                onChange={onchange}
              />
              <img src={jobCatId.image} alt="" style={{ width: "10% " }} />
            </div>
          </form>
          <div className="mt-3 text-center">

            <button
              type="button"
              className="first-button text-white"
              onClick={updateCategory}
            >
              Update Job Category
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
