import { useContext, useState } from "react";
import Swal from "sweetalert2";
import CourseModals from "./CourseModals"
import CategoryContext from "../../ContextApi/CategoryContext";
import CourseContext from "../../ContextApi/CourseContext";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

export default function Addcourse() {
  const { category, AllCategory } = useContext(CategoryContext);
  const [lgShow, setLgShow] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const { deleteCourse, allCourse, allCourses } = useContext(CourseContext);

  const [searchOption, setSearchOption] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [course, setCourse] = useState({
    title: "", duration: "", level: "", description: "", image: "", categoryId: "", content: "", email: "", contact: "", learning: "", moduleName1: "", moduleName2: "", instructorName: "", days: "", timeSlot: "",
  });

  const validationFields = (fields) => {
    const titleError = document.getElementById("titleError");
    const categoryError = document.getElementById("categoryError");
    const durationError = document.getElementById("durationError");
    const levelError = document.getElementById("levelError");
    const descriptionError = document.getElementById("descriptionError");
    const learningError = document.getElementById("learningError");
    const instructorError = document.getElementById("instructorError");
    let emptyFieldError = false;
    if (!fields.categoryId) {
      categoryError.innerText = "please enter category";
      emptyFieldError = true;
    } else {
      categoryError.innerText = "";
    }
    if (!fields.title) {
      titleError.innerText = "please enter title";
      emptyFieldError = true;
    } else {
      titleError.innerText = "";
    }
    if (!fields.duration) {
      durationError.innerText = "please enter duration";
      emptyFieldError = true;
    } else {
      durationError.innerText = "";
    }
    if (!fields.level) {
      levelError.innerText = "please confirm level";
      emptyFieldError = true;
    } else {
      levelError.innerText = "";
    }
    if (!fields.description) {
      descriptionError.innerText = "please add description";
      emptyFieldError = true;
    } else {
      descriptionError.innerText = "";
    }

    if (!fields.instructorName) {
      instructorError.innerText = "Instructor Name Missing";
      emptyFieldError = true;
    } else {
      learningError.innerText = "";
    }
    return emptyFieldError;
  };

  // add course
  const addCourse = async (e) => {
    e.preventDefault();
    const { title, duration, level, description, image, categoryId, content, email, contact, learning, moduleName1, moduleName2, instructorName, days, timeSlot,
    } = course;
    const hasError = validationFields(course);
    if (hasError) {
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("level", level);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("categoryId", categoryId);
    formData.append("learning", learning);
    formData.append("contact", contact);
    formData.append("email", email);
    formData.append("content", content);
    formData.append("instructorName", instructorName);
    formData.append("moduleName1", moduleName1);
    formData.append("moduleName2", moduleName2);
    formData.append("days", days);
    formData.append("timeSlot", timeSlot);

    const res = await fetch(
      `${apiUrl}/api/course/addcourse`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      console.log(`Error: ${res.status} - ${res.statusText}`);
    }
    allCourses();
    setCourse({
      title: "",
      duration: "",
      level: "",
      description: "",
      image: "",
      categoryId: "",
      learning: "",
      content: "",
      conatct: "",
      email: "",
      moduleName1: "",
      moduleName2: "",
      instructorName: "",
      days: "",
      timeSlot: "",
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Course has been created",
      showConfirmButton: true,
    });
  };

  const onchange = (e) => {
    const { name, value } = e.target;
    const maxLengths = {
      title: 100,
      duration: 50,
      level: 50,
      description: 500,
      learning: 500,
      instructorName: 100,
      email: 100,
      contact: 50,
      moduleName1: 100,
      moduleName2: 100,
      timeSlot: 50,
      days: 50,
    };
  
    if (value.length <= maxLengths[name]) {
      setCourse({ ...course, [name]: value });
    } else {
      // Optionally, show an alert or message to the user if the limit is exceeded
      console.log(`Max length for ${name} is ${maxLengths[name]} characters.`);
    }
  };
  

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const coursePerPage = itemsPerPage

  const lastCourseIndex = currentPage * coursePerPage
  const firstCourseIndex = lastCourseIndex - coursePerPage
  const currentCourse = allCourse?.slice(firstCourseIndex, lastCourseIndex)

  const totalPages = Math.ceil(allCourse.length / coursePerPage)

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  return (
    <div className="container mt-3">
      <h2 className="px-5">Added Courses List</h2>
      <div className="row d-flex justify-content-center">
        <div className="col-md-3 col-6 mt-2">
          <input
            type="text"
            className="form-control admin-form"
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
            placeholder="Search By Title"
          />
        </div>
        <div className="col-md-3 col-6 mt-2">
          <select
            className="form-control admin-form"
            id="course level"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="">Search By Category</option>
            {AllCategory &&
              AllCategory.map((course, index) => {
                return <option key={index} value={course._id}>{course.category}</option>;
              })}
          </select>
        </div>

        <div className="d-flex justify-content-end col-md-5 col-6 mt-2">
          <Button className="mb-5 first-button" onClick={() => setLgShow(true)}><i className="fas fa-plus"></i> Add Course</Button>
        </div>

        <div className="col-md-11">
          <div>
            <p>Show <select name="" id="" onChange={(e) => setItemsPerPage(e.target.value)}>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select> Entries</p>
          </div>
          <div className="table-container" style={{ overflowX: "auto" }}>
            <div className="table-responsive-sm">

              <table className=" admin-table">
                <thead>
                  <tr className="form-title">
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Category</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourse?.filter(course => course.title.toLowerCase().includes(searchOption.toLowerCase())).filter(course => course.categoryId?._id.includes(searchCategory)).map((course, index) => {
                    return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{course.title}</td>
                          <td>
                            {course && course.categoryId?.category}
                          </td>
                          <td>{course.duration}</td>
                          <td>
                            <CourseModals courseId={course._id} />
                            <i
                              className="fa fa-trash"
                              onClick={() => deleteCourse(course._id)}
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          {allCourse?.length > coursePerPage && (
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
        </div>
      </div>

      {/* {/ {/ course modal /} /} */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add Course
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addCourse} encType="multipart/form-data" className="admin-form" style={{ boxShadow: 'none' }}>
            <div className="row">
              <div id="error" className="text-danger text-center"></div>
              <div className="col-md-6">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Course Title"
                  name="title"
                  value={course.title}
                  onChange={onchange}
                />
                <div id="titleError" className="text-danger"></div>
              </div>
              <div className="col-md-6">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Instructor Name"
                  name="instructorName"
                  value={course.instructorName}
                  onChange={onchange}
                />
                <div id="instructorError" className="text-danger"></div>
              </div>

              <div className="col-md-6">
                <input
                  className="form-control mt-3"
                  type="text"
                  placeholder="Course Duration"
                  name="duration"
                  value={course.duration}
                  onChange={onchange}
                />
                <div id="durationError" className="text-danger"></div>
                <select
                  className="form-control mt-3"
                  id="course level"
                  name="level"
                  value={course.level}
                  onChange={onchange}
                >
                  <option value="">Select Course Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <div id="levelError" className="text-danger"></div>
              </div>
              <div className="col-md-6">
                <select
                  className="form-control mt-3"
                  id="course level"
                  name="categoryId"
                  value={course.categoryId}
                  onChange={onchange}
                >
                  <option value="">Select Category</option>
                  {category &&
                    category.map((data, index) => {
                      return (
                        <option key={index} value={data._id}>{data.category}</option>
                      );
                    })}
                </select>
                <div id="categoryError" className="text-danger"></div>
                <input
                  className="form-control mt-3"
                  type="file"
                  placeholder="Image"
                  name="image"
                  onChange={onchange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="" className="mt-4 mb-1">
                  <b>Class Schedule In A Week</b>
                </label>
                <input
                  className="form-control mt-3"
                  type="text"
                  placeholder="Separate days with | sign e.g Monday | Tuesday"
                  name="days"
                  value={course.days}
                  onChange={onchange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="mt-4 mb-1">
                  <b>Time Slots</b>
                </label>
                <input
                  className="form-control mt-3"
                  type="text"
                  placeholder="5:00PM To 7:00PM"
                  name="timeSlot"
                  value={course.timeSlot}
                  onChange={onchange}
                />
              </div>

              <div className="course-detail-title text-center mt-5 mb-3">
                <h2>Course Content Details</h2>
                <p style={{ fontSize: "14px" }}>
                  In the following given fields of Module Name, you can
                  add title of your choice (any title can be given like
                  &apos;Course Content&apos; or &apos;Learning Outcomes&apos;). The boxes
                  under Module Name fields are for details about the title
                  you give. Add one detail per line, and use corresponding
                  box for each field (right box for right field and same
                  for left box).
                </p>
              </div>
              <div className="col-md-6">
                <input
                  className="form-control mt-3"
                  type="text"
                  placeholder="Module Name 1"
                  name="moduleName1"
                  value={course.moduleName1}
                  onChange={onchange}
                />
                <textarea
                  className="form-control mt-3"
                  cols="30"
                  rows="10"
                  placeholder="Learning Outcomes (Write one outcome per line)"
                  name="learning"
                  value={course.learning}
                  onChange={onchange}
                ></textarea>
                <div id="learningError" className="text-danger"></div>
              </div>
              <div className="col-md-6">
                <input
                  className="form-control mt-3"
                  type="text"
                  placeholder="Module Name 2"
                  name="moduleName2"
                  value={course.moduleName2}
                  onChange={onchange}
                />
                <textarea
                  className="form-control mt-3"
                  cols="30"
                  rows="10"
                  placeholder="Course Contents (Write one content per line)"
                  name="content"
                  value={course.content}
                  onChange={onchange}
                ></textarea>
                <div id="contentError" className="text-danger"></div>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4"></div>
              <div className="col-md-4"></div>
              <div className="col-md-12">
                <textarea
                  className="form-control mt-3"
                  cols="30"
                  rows="10"
                  placeholder="Course Description"
                  name="description"
                  value={course.description}
                  onChange={onchange}
                ></textarea>
                <div id="descriptionError" className="text-danger"></div>
              </div>
              <div className="col-md-6 mt-3">
                <input
                  name="contact"
                  id="contact"
                  className="form-control"
                  value={course.contact}
                  onChange={onchange}
                  type="text"
                  placeholder="Contact"
                ></input>
              </div>
              <div className="col-md-6 mt-3">
                <input
                  name="email"
                  id="email"
                  className="form-control"
                  value={course.email}
                  onChange={onchange}
                  type="email"
                  placeholder="Email"
                ></input>
              </div>
              <div className="col-md-12 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary first-button mt-3 text-center px-4 py-2"
                >
                  Add Course
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
