import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";


function Coursedetail() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [course, setCourse] = useState("");
  const [category, setCategory] = useState("");
  const { title } = useParams();
  const pureTitle = title.replace(/-/g, " ");

  const [showMoreLearning, setShowMoreLearning] = useState(false);
  const [showMoreContent, setShowMoreContent] = useState(false);

  const ITEM_LIMIT = 4;
  const getCorse = async () => {
    const res = await fetch(
      `${apiUrl}/api/course/getcorse/${pureTitle}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    setCategory(data.categoryy);
    setCourse(data.courseTitle);
  };
  useEffect(() => {
    getCorse();
  }, [pureTitle]);
  return (
    <div style={{ backgroundColor: "#F9F9F9" }}>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  {course?.title}
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="course-data py-4">
        <div className="container">
          <div className="row g-5">
            <div className="col-md-12">
              <div className="overview bg-white p-3 mb-4">
                <h2>Course Overview</h2>
                <p style={{ fontWeight: "initial" }}>{course?.description}</p>

                <ul style={{ lineHeight: "2.5rem", padding: 0, margin: 0, listStyle: 'none' }}>
                  <li>
                    <CheckCircleIcon
                      className="list-icon"
                      style={{ color: "var(--secondary-color)" }}
                    />
                    &nbsp;Course Instructor:{" "}
                    <span className="replaceStrong"> {course?.instructorName} </span>
                  </li>
                  <li>
                    <CheckCircleIcon
                      className="list-icon"
                      style={{ color: "var(--secondary-color)" }}
                    />
                    &nbsp;Course Duration: <span className="replaceStrong"> {course?.duration} </span>
                  </li>
                  <li>
                    <CheckCircleIcon
                      className="list-icon"
                      style={{ color: "var(--secondary-color)" }}
                    />
                    &nbsp;Course Category:{" "}
                    <span className="replaceStrong"> {category?.category} </span>
                  </li>
                  {(course?.days && course?.days !== "undefined") && (

                    <li>
                      <CheckCircleIcon
                        className="list-icon"
                        style={{ color: "var(--secondary-color)" }}
                      />
                      &nbsp;Classes In A Week:{" "}
                      <span className="replaceStrong"> {course.days} </span>
                    </li>
                  )}
                  {(course?.timeSlot && course?.timeSlot !== "undefined") && (

                    <li>
                      <CheckCircleIcon
                        className="list-icon"
                        style={{ color: "var(--secondary-color)" }}
                      />
                      &nbsp;Class Timings:{" "}
                      <span className="replaceStrong"> {course?.timeSlot} </span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="course-img text-center">
                <img src={course?.image} alt="course-img" className="img-fluid" style={{ height: "390px" }} />
              </div>
              <div className="row justify-content-center">
                {course?.learning && (
                  <div className="col-md-6 listing mt-4">
                    <div className="learning-outcomes py-2">
                      <h3>{course.moduleName1}</h3>
                      <ul
                        style={{ lineHeight: "2.5rem", padding: 0, margin: 0, listStyle: 'none' }}
                      >
                        {course?.learning
                          .split("\n")
                          .slice(0, showMoreLearning ? undefined : ITEM_LIMIT)
                          .map((line, lineindex) => (
                            <li key={lineindex}>
                              <CheckCircleIcon className="list-icon" />
                              &nbsp;{line}
                            </li>
                          ))}

                        <button
                          className="btn btn-link"
                          onClick={() => setShowMoreLearning(!showMoreLearning)}
                        >
                          {showMoreLearning ? "Show less" : "Show more"}
                        </button>
                      </ul>
                    </div>
                  </div>
                )}

                {course?.content && (
                  <div className="col-md-6 listing mt-4">
                    <div className="learning-outcomes py-2">
                      <h3>{course.moduleName2}</h3>
                      <ul
                        style={{ lineHeight: "2.5rem", padding: 0, margin: 0, listStyle: 'none' }}
                      >
                        {course?.content
                          .split("\n")
                          .slice(0, showMoreContent ? undefined : ITEM_LIMIT)
                          .map((line, lineindex) => (
                            <li key={lineindex}>
                              <CheckCircleIcon className="list-icon" />
                              &nbsp;{line}
                            </li>
                          ))}

                        <button
                          className="btn btn-link"
                          onClick={() => setShowMoreContent(!showMoreContent)}
                        >
                          {showMoreContent ? "Show less" : "Show more"}
                        </button>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              {(course.email && course.email !== "undefined") ||
              (course.contact && course.contact !== "undefined") ? (
                <div className="row mt-4 bg-white py-3">
                  <div>
                    <h4 className="text-primary">
                      Want to get more details about this course?
                    </h4>
                  </div>
                  {course.email && course.email !== "undefined" && (
                    <div className="col-md-5 bg-white py-3">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="me-2 text-center"
                        />
                        &nbsp;
                        <p
                          className="m-0 text-center"
                          style={{ fontSize: "18px" }}
                        >
                          {course.email}
                        </p>
                      </div>
                    </div>
                  )}
                  {course.contact && course.contact !== "undefined" && (
                    <div className="col-md-5 bg-white py-3">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="me-2 text-center"
                        />
                        &nbsp;
                        <p
                          className="m-0 text-center"
                          style={{ fontSize: "18px" }}
                        >
                          {course.contact}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Coursedetail;
