import { useContext } from "react"
import CourseContext from "../../ContextApi/CourseContext"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChalkboardTeacher, faClock } from "@fortawesome/free-solid-svg-icons"
import { Col, Container, Row } from "react-bootstrap"

export default function AllCoursesPage() {
    const { allCourse } = useContext(CourseContext)
    return (
        <>
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
      
            <div className="container py-4">
                <div className="row g-4">
                    {allCourse && allCourse.map((data, index) => {
                        return <div className="col-md-4" key={index}>
                            <Link to={`/course-details/${data.title.replace(/ /g, '-')}`}>
                                <div className="card courses" style={{ height: '100%' }}>
                                    <div className="course-content">
                                        {/* {/ {/ <img src={data.image ? data.image : frontendDeveloper} alt={`course-img${index}`} className="img-fluid" style={{ height: "200px", width: "100%" }} / > /} /} */}
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
        </>
    )
}
