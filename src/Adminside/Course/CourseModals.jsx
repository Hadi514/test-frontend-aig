import { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import CourseContext from '../../ContextApi/CourseContext';
import CategoryContext from '../../ContextApi/CategoryContext';
import {  Modal } from 'react-bootstrap';
import PropTypes from "prop-types"

function CourseModals({ courseId }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { allCourses, getCourseCat, getCourse, setGetCourse, CourseById } = useContext(CourseContext);
  const { category } = useContext(CategoryContext);
  const [lgShow, setLgShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const updateCourse = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    });

    if (isConfirmed) {
      const {
        title,
        duration,
        level,
        description,
        categoryId,
        learning,
        content,
        email,
        contact,
        image,
        instructorName,
        timeSlot,
        days,
        moduleName1,
        moduleName2,
      } = getCourse;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("instructorName", instructorName);
      formData.append("timeSlot", timeSlot);
      formData.append("days", days);
      formData.append("moduleName1", moduleName1);
      formData.append("moduleName2", moduleName2);
      formData.append("duration", duration);
      formData.append("level", level);
      formData.append("email", email);
      formData.append("contact", contact);
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      formData.append("learning", learning);
      formData.append("content", content);
      formData.append("image", image);
      await fetch(
        `${apiUrl}/api/course/updatecourse/${getCourse._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      Swal.fire("Saved!", "", "success");
    } else {
      Swal.fire("Changes are not saved", "", "info");
    }
    allCourses();
  };

  const onchnge = (e) => {
    if (e.target.files) {
      setGetCourse({ ...getCourse, image: e.target.files[0] });
    } else {
      setGetCourse({ ...getCourse, [e.target.name]: e.target.value });
    }
  };

  const openShowModal = () => {
    setLgShow(true)
    CourseById(courseId)
  }
  const editShowModal = () => {
    setEditShow(true)
    CourseById(courseId)
  }

  return (
    <>
      {/* {/ view modal /} */}

      <i className="fa fa-eye me-2" onClick={() => openShowModal()} style={{cursor: "pointer"}}></i>
      <i className="fa fa-pen me-2" onClick={() => editShowModal()} style={{cursor: "pointer"}}></i>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            View Course
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='admin-form' style={{boxShadow: 'none'}}>
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="title" className="mt-3">
                  Title
                </label>
                <input
                  className="form-control"
                  value={getCourse.title}
                  id="title"
                  type="text"
                  placeholder="Title"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Duration" className="mt-3">
                  Duration
                </label>
                <input
                  className="form-control"
                  value={getCourse.duration}
                  id="Duration"
                  type="text"
                  placeholder="Duration"
                />
                <label htmlFor="level" className="mt-3">
                  Course Level
                </label>
                <input
                  className="form-control"
                  value={getCourse.level}
                  type="text"
                  id="level"
                  placeholder="Level"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="category" className="mt-3">
                  Category
                </label>
                {getCourseCat && (
                  <input
                    className="form-control"
                    value={getCourseCat.category}
                    id="title"
                    type="text"
                    placeholder="Category"
                  />
                )}
                <label htmlFor="category" className="mt-3">
                  Image
                </label>
                <input
                  className="form-control"
                  value={getCourse.image}
                  id="title"
                  type="text"
                  placeholder="Image"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="role" className="mt-3">
                  Learning Outcomes
                </label>
                <textarea
                  name="course description"
                  id="desc"
                  cols="30"
                  rows="10"
                  className="form-control"
                  value={getCourse.learning}
                  type="text"
                  placeholder="role"
                ></textarea>
              </div>
              <div className="col-md-6">
                <label htmlFor="role" className="mt-3">
                  Course Contents
                </label>
                <textarea
                  name="course description"
                  id="desc"
                  cols="30"
                  rows="10"
                  className="form-control"
                  value={getCourse.content}
                  type="text"
                  placeholder="role"
                ></textarea>
              </div>
              <div className="col-md-12">
                <label htmlFor="role" className="mt-3">
                  Course Description
                </label>
                <textarea
                  name="course description"
                  id="desc"
                  cols="30"
                  rows="10"
                  className="form-control"
                  value={getCourse.description}
                  type="text"
                  placeholder="role"
                ></textarea>
              </div>
              <div className="col-md-6">
                <label htmlFor="role" className="mt-3">
                  Contact For Details
                </label>
                <input
                  name="contact"
                  id="contact"
                  className="form-control"
                  value={getCourse.contact}
                  type="text"
                  placeholder="role"
                ></input>
              </div>
              <div className="col-md-6">
                <label htmlFor="role" className="mt-3">
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  className="form-control"
                  value={getCourse.email}
                  type="email"
                  placeholder="role"
                ></input>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* {/ Edit modal /} */}
      <Modal
        size="lg"
        show={editShow}
        onHide={() => setEditShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            View Course
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='admin-form' style={{boxShadow: 'none'}}>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="title" className="mt-3">
                  Title
                </label>
                <input
                  className="form-control"
                  name="title"
                  value={getCourse.title}
                  id="title"
                  type="text"
                  placeholder="Title"
                  onChange={onchnge}
                />
                <label htmlFor="Duration" className="mt-3">
                  Duration
                </label>
                <input
                  className="form-control"
                  name="duration"
                  value={getCourse.duration}
                  id="Duration"
                  type="text"
                  placeholder="Duration"
                  onChange={onchnge}
                />
                <label htmlFor="level" className="mt-3">
                  Course Level
                </label>
                <select
                  className="form-control"
                  name="level"
                  value={getCourse.level}
                  type="text"
                  id="level"
                  placeholder="Level"
                  onChange={onchnge}
                >
                  <option value="">Select Course Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <label htmlFor="days" className="mt-3">
                  Class Schedule In A Week
                </label>
                <input
                  className="form-control"
                  name="days"
                  value={getCourse.days}
                  id="days"
                  type="text"
                  onChange={onchnge}
                />
                <label htmlFor="moduleName1" className="mt-3">
                  Module Name 1
                </label>
                <input
                  className="form-control"
                  name="moduleName1"
                  value={getCourse.moduleName1}
                  id="moduleName1"
                  type="text"
                  placeholder="Module Name 1"
                  onChange={onchnge}
                />
                <label htmlFor="role" className="mt-3">
                  Learning Outcomes
                </label>
                <textarea
                  name="learning"
                  id="desc"
                  cols="30"
                  rows="10"
                  className="form-control"
                  value={getCourse.learning}
                  type="text"
                  placeholder="role"
                  onChange={onchnge}
                ></textarea>
              </div>

              <div className="col-md-6">
                <label htmlFor="instructorName" className="mt-3">
                  Instructor Name
                </label>
                <input
                  className="form-control"
                  name="instructorName"
                  value={getCourse.instructorName}
                  id="instructorName"
                  type="text"
                  placeholder="Instructor Name"
                  onChange={onchnge}
                />
                <label htmlFor="category" className="mt-3">
                  Category
                </label>
                <select
                  className="form-control"
                  id="course level"
                  name="categoryId"
                  value={getCourse.categoryId}
                  onChange={onchnge}
                >
                  {category &&
                    category.map((data, index) => {
                      return (
                        <option key={index} value={data._id}>{data.category}</option>
                      );
                    })}
                </select>
                <label htmlFor="image" className="mt-3">
                  Featured Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  placeholder="Image"
                  name="image"
                  onChange={onchnge}
                />
                <label htmlFor="timeSlot" className="mt-3">
                  Time Slots
                </label>
                <input
                  className="form-control"
                  name="timeSlot"
                  value={getCourse.timeSlot}
                  id="timeSlot"
                  type="text"
                  onChange={onchnge}
                />
                <label htmlFor="moduleName2" className="mt-3">
                  Module Name 2
                </label>
                <input
                  className="form-control"
                  name="moduleName2"
                  value={getCourse.moduleName2}
                  id="moduleName2"
                  type="text"
                  placeholder="Module Name 2"
                  onChange={onchnge}
                />
                <label htmlFor="role" className="mt-3">
                  Course Content
                </label>
                <textarea
                  name="content"
                  id="desc"
                  cols="30"
                  rows="10"
                  className="form-control"
                  value={getCourse.content}
                  type="text"
                  placeholder="role"
                  onChange={onchnge}
                ></textarea>
              </div>
              <div className="col-md-12">
                <label htmlFor="role" className="mt-3">
                  Course Description
                </label>
                <textarea
                  name="description"
                  id="desc"
                  cols="30"
                  rows="10"
                  className="form-control"
                  value={getCourse.description}
                  type="text"
                  placeholder="role"
                  onChange={onchnge}
                ></textarea>
              </div>
              <div className="col-md-6">
                <label htmlFor="role" className="mt-3">
                  Contact For Details
                </label>
                <input
                  name="contact"
                  id="contact"
                  className="form-control"
                  value={getCourse.contact}
                  type="text"
                  onChange={onchnge}
                  placeholder="role"
                ></input>
              </div>
              <div className="col-md-6">
                <label htmlFor="role" className="mt-3">
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  className="form-control"
                  value={getCourse.email}
                  type="email"
                  onChange={onchnge}
                  placeholder="role"
                ></input>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary first-button mt-3 text-center"
                onClick={updateCourse}
              >
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default CourseModals

CourseModals.propTypes = {
  courseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

CourseModals.defaultProps = {
  courseId: null,
};