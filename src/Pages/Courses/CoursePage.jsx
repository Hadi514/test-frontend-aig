import { useContext } from "react"
import { Link } from "react-router-dom"
import CourseContext from "../../ContextApi/CourseContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher, faClock } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";

export default function CoursePage() {
  const { allCourse, setCourseCategory, uniqueCourseCategory, courseCategory } = useContext(CourseContext)

  return (
    <div className="ps-0" style={{ overflowX: "hidden" }}>

      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Explore Our Courses
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <div className="container-fluid">

        <div className="row mt-3 py-4 d-flex justify-content-between">
          <div className="col-md-3">
            <div
            >
              <div className="pb-3 pt-2 outlet">
                {uniqueCourseCategory &&
                  [...uniqueCourseCategory].map((cat, index) => {
                    return (
                      <div className="text-dark px-2" key={index}>
                        <button
                          className="btn btn-outline-primary w-100 text-dark mt-2"
                          onClick={() => setCourseCategory(cat.category)}
                        >
                          <div className="d-flex justify-content-start">
                            <div>
                              <img src={cat.image} style={{ width: "20px" }} className="img-fluid" alt="" />
                              <span
                                className="text-dark ms-2"
                              >
                                {cat.category}
                              </span>
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-md-9">

            <div className="row g-4">
              {allCourse && allCourse.filter(course => course.categoryId && course.categoryId.category === courseCategory)
                .map((data, index) => {
                  return <div className="col-md-4" key={index}>
                    <Link to={`/course-details/${data.title.replace(/ /g, '-')}`}>
                      <div className="card courses" style={{ height: '100%' }}>
                        <div className="course-content">
                          {/* {/ {/ {/ <img src={data.image ? data.image : frontendDeveloper} alt={`course-img${index}`} className="img-fluid" style={{ height: "200px", width: "100%" }} / > /} /} /} */}
                          <img src={data.image} alt={`course-img${index}`} className="img-fluid" style={{ height: "200px", width: "100%" }} />
                        </div>
                        <div className="course-title p-4">
                          <h5 className="bold-p">{data.title.length > 20 ? data.title.slice(0, 20) + "..." : data.title}</h5>
                          <hr />
                          <div className="d-flex align-items-start">
                            <FontAwesomeIcon icon={faChalkboardTeacher} className="mt-1 course-card-icon" />&nbsp;
                            <p>
                              Instructor: <span className="replaceStrong">{data.instructorName}</span>
                            </p>
                          </div>
                          <div className="d-flex">
                            <FontAwesomeIcon icon={faClock} className="mt-1 course-card-icon" />&nbsp;
                            <p>
                              Duration: <span className="replaceStrong">{data.duration}</span>
                            </p>
                          </div>
                        </div>

                      </div>
                    </Link>
                  </div>
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}