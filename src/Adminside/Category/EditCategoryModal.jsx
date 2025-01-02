import { useContext, useState } from "react"
import CategoryContext from "../../ContextApi/CategoryContext"
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function EditCategoryModal({ courseCategoryID }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { setCourseCatId, allCategory, courseCatId, getCatId } = useContext(CategoryContext)
  const [editShow, setEditShow] = useState(false);
  console.log(courseCatId);


  const updateCategory = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    });
    if (isConfirmed) {

      const { image, category } = courseCatId
      const formData = new FormData()
      formData.append("category", category)
      formData.append("image", image)
      const res = await fetch(
        `${apiUrl}/api/category/editcategory/${courseCatId._id}`,
        {
          method: "PUT",
          body: formData,
        }

      );
      if (res.ok) {
        Swal.fire("Saved!", "", "success");
        allCategory();
      }
    }
    else {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  const onchange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setCourseCatId({ ...courseCatId, image: files[0] });
    } else {
      setCourseCatId({ ...courseCatId, [name]: value });
    }
  };

  const openEditCategory = () => {
    setEditShow(true);
    getCatId(courseCategoryID);
  };

  return (
    <>
      <FontAwesomeIcon icon={faPen} style={{ cursor: "pointer" }} onClick={() => openEditCategory()} />
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
              value={courseCatId.category}
              onChange={onchange}
              style={{ height: "55px", borderRadius: "0" }}
            />
            <span className="mt-3">Category Image: <img src={courseCatId.image} alt="" className="img-fluid" style={{ width: "10%" }} /></span>
            <input
              className='form-control'
              style={{ width: '100%', height: '55px', borderRadius: '0', marginTop: '20px' }}
              type='file'
              placeholder='Add category Logo'
              name='image'
              onChange={onchange}
            />
          </form>
          <div className="text-center mt-3 text-white">
            <button
              type="button"
              className="first-button text-white"
              data-bs-dismiss="modal"
              onClick={updateCategory}
            >
              Update Category
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditCategoryModal


EditCategoryModal.propTypes = {
  courseCategoryID: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

EditCategoryModal.defaultProps = {
  courseCategoryID: null,
};