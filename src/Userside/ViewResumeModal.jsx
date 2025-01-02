import {
  faAward,
  faEnvelope,
  faEye,
  faPhone,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Col, Container, Modal, Row } from "react-bootstrap";
import ResumeContext from "../ContextApi/ResumeContext";
import defaultImg from "../../src/assets/Images/resume-default.jpg"

function ViewResumeModal({ resId }) {
  const [lgShow, setLgShow] = useState(false);
  const { resumeById, getResumeId } = useContext(ResumeContext);

  const viewAndShowModal = () => {
    getResumeId(resId);
    setLgShow(true);
  };

  const changeDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <FontAwesomeIcon
        className="me-3"
        icon={faEye}
        onClick={() => viewAndShowModal(true)}
        style={{ cursor: "pointer" }}
      />
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <section className="view-resume-head">
            <div className="bg-primary px-3 py-3">
              <Row>
                <Col md={6}>
                  <div className="resume-img">
                    {resumeById.image ? (

                      <img
                        src={resumeById.image}
                        alt=""
                        className="img-fluid"
                        style={{
                          height: "180px",
                          width: "180px",
                          borderRadius: "100%",
                        }}
                      />
                    ): (
                      <img
                        src={defaultImg}
                        alt=""
                        className="img-fluid"
                        style={{
                          height: "180px",
                          width: "180px",
                          borderRadius: "100%",
                        }}
                      />
                    )}
                  </div>
                </Col>

                <Col md={6}>
                  <h2 className="text-white">{resumeById.name}</h2>
                  <div className="mt-3">
                    <p className="m-0 text-white">
                      <FontAwesomeIcon
                        icon={faUserDoctor}
                        style={{ color: "#fff" }}
                      />{" "}
                      {resumeById.profession}
                    </p>
                    <p className="m-0 text-white">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{ color: "#fff" }}
                      />{" "}
                      {resumeById.email}
                    </p>
                    <p className="m-0 text-white">
                      <FontAwesomeIcon
                        icon={faPhone}
                        style={{ color: "#fff" }}
                      />{" "}
                      {resumeById.number}
                    </p>
                    <p className="m-0 text-white">
                      <FontAwesomeIcon
                        icon={faAward}
                        style={{ color: "#fff" }}
                      />{" "}
                      {resumeById.totalWorkExp}
                    </p>
                  </div>
                </Col>
              </Row>

              {/* <hr className="mt-4"/> */}
            </div>
            <Container fluid>
              <Row className="align-items-start">
                <Col md={12}>
                  <h3 className="text-primary mt-3">Overview</h3>
                  <p className="mt-0">{resumeById.resumeHeadline}</p>
                  <hr className="mt-4" />

                  <div className="mt-3">
                    <h3 className="text-primary">Summary</h3>
                  </div>
                  <p className="m-0">{resumeById.description}</p>
                </Col>
                <Col md={12}>
                  <hr />
                  <h3 className="text-primary mb-3">Work Experience</h3>
                  <ul>
                    {resumeById.employmentDetails?.map((employ, index) => {
                      return (
                        <div key={index}>
                          {employ.endDate ? (
                            <li>
                              <span style={{ fontWeight: "bold" }}>
                                Worked at {employ.companyName} as{" "}
                                {employ.position} from{" "}
                                {changeDate(employ.startDate)} to{" "}
                                {changeDate(employ.endDate)}
                              </span>
                              <ul
                                style={{
                                  listStyleType: "none",
                                  marginLeft: "20px",
                                }}
                              >
                                {employ.description
                                  .split("\n")
                                  .map((line, idx) => (
                                    <li
                                      key={idx}
                                      style={{ fontWeight: "light" }}
                                    >
                                      {line}
                                    </li>
                                  ))}
                              </ul>
                            </li>
                          ) : (
                            <li>
                              <span style={{ fontWeight: "bold" }}>
                                Working at {employ.companyName} as{" "}
                                {employ.position} from{" "}
                                {changeDate(employ.startDate)}{" "}
                                <span className="fw-bold">to date</span>
                              </span>
                              <ul
                                style={{
                                  listStyleType: "none",
                                  marginLeft: "20px",
                                }}
                              >
                                {employ.description
                                  .split("\n")
                                  .map((line, idx) => (
                                    <li key={idx}>{line}</li>
                                  ))}
                              </ul>
                            </li>
                          )}
                        </div>
                      );
                    })}
                  </ul>
                  <hr className="mt-4" />
                  <h3 className="text-primary mb-3">Education Details</h3>
                  <ul>
                    {resumeById.educationDetails?.map((education, index) => {
                      return (
                        <div key={index}>
                          {education.endDate ? (
                            <li>
                              <span style={{fontWeight: "bold"}}>

                              Studied {education.degree} (
                              {education.fieldOfStudy}) from{" "}
                              {education.institutionName} from{" "}
                              {changeDate(education.startDate)} to{" "}
                              {changeDate(education.endDate)}
                              </span>
                              <ul
                                style={{
                                  listStyleType: "none",
                                  marginLeft: "20px",
                                }}
                              >
                                {education.description
                                  .split("\n")
                                  .map((line, idx) => (
                                    <li key={idx}>{line}</li>
                                  ))}
                              </ul>
                            </li>
                          ) : (
                            <li>
                              Studying {education.degree} (
                              {education.fieldOfStudy}) from{" "}
                              {education.institutionName} from{" "}
                              {changeDate(education.startDate)}{" "}
                              <span className="fw-bold">to date</span>
                              <ul
                                style={{
                                  listStyleType: "circle",
                                  marginLeft: "20px",
                                }}
                              >
                                {education.description
                                  .split("\n")
                                  .map((line, idx) => (
                                    <li key={idx}>{line}</li>
                                  ))}
                              </ul>
                            </li>
                          )}
                        </div>
                      );
                    })}
                  </ul>
                </Col>
              </Row>
            </Container>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewResumeModal;

ViewResumeModal.propTypes = {
  resId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ViewResumeModal.defaultProps = {
  resId: null,
};
