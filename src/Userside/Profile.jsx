import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import ResumeContext from "../ContextApi/ResumeContext";
import UserContext from "../ContextApi/UserContext";
import { Col, Container, Row } from "react-bootstrap";
import {
  faAward,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import UserImg from "../../src/assets/Images/user-img.avif";
import EditResume from "./EditResume";
import EditorProfile from "../Editor/EditorProfile";
import PdfCv from "../Adminside/Resume/PdfCv";

function Profile() {
  const { getAllResume } = useContext(ResumeContext);
  const { signUser } = useContext(UserContext);
  const filterResumeByUser = getAllResume?.filter(
    (resume) => resume.email === signUser.email
  );
  console.log(filterResumeByUser[0]);

  const changeDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  return (
    <>
    
      {filterResumeByUser.length > 0 ? (
        <div>

      <div className="d-flex justify-content-end">
      <EditResume  resId={filterResumeByUser[0]?._id}/>
      </div>
        <section className="view-resume-head mt-3">
          <Container fluid>
          <Row
          className="bg-white p-3 mb-3 justify-content-between align-items-center"
          style={{
            boxShadow: "2px 2px 8px rgba(204,204,204,0.4)",
            borderRadius: "15px",
          }}
        >
          
          <Col md={7}>
            <h2 className="">
              <u>{filterResumeByUser[0].name}</u>
            </h2>
            <div className="mt-4 row d-flex flex-column justify-content-between">
              <div className="m-0 col-md-4">
                <FontAwesomeIcon icon={faEnvelope} style={{ color: "var(--primary-color)" }} />
                &nbsp;
                {filterResumeByUser[0].email}
              </div>
              <div className="m-0 col-md-4 mt-2">
                <FontAwesomeIcon icon={faPhone} style={{ color: "var(--primary-color)" }} />{" "}
                {filterResumeByUser[0].number}
              </div>
              <div className="m-0 col-md-4 mt-2">
                <FontAwesomeIcon icon={faAward} style={{ color: "var(--primary-color)" }} />{" "}
                {filterResumeByUser[0]?.totalWorkExp}
              </div>
            </div>
          </Col>
          <Col md={3} className="mb-3">
            <div className="resume-img">
              {filterResumeByUser[0]?.userImage ? (
                <img
                  src={filterResumeByUser[0]?.userImage}
                  alt=""
                  className="img-fluid"
                  style={{
                    height: "120px",
                    width: "120px",
                    borderRadius: "100%",
                  }}
                />
              ) : (
                <img
                  src={UserImg}
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
        
        </Row>
            <Row className="align-items-start">
              <Col
                md={12}
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "2px 2px 8px rgba(204,204,204,0.4)",
                  borderRadius: "15px",
                }}
              >
                <h3 className="text-primary mt-3">Overview</h3>
                <p className="mt-0">{filterResumeByUser[0].resumeHeadline}</p>
              </Col>
              <Col
                md={12}
                className="mt-3 p-3"
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "2px 2px 8px rgba(204,204,204,0.4)",
                  borderRadius: "15px",
                }}
              >
                <h3 className="text-primary">Summary</h3>
                <p className="m-0">{filterResumeByUser[0].description}</p>
              </Col>
              <Col
                md={12}
                className="mt-3 p-3"
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "2px 2px 8px rgba(204,204,204,0.4)",
                  borderRadius: "15px",
                }}
              >
                <h3 className="text-primary mb-3">Work Experience</h3>
                <ul>
                  {filterResumeByUser[0].employmentDetails?.map(
                    (employ, index) => {
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
                    }
                  )}
                </ul>
              </Col>
              <Col
                md={12}
                className="mt-3 p-3"
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "2px 2px 8px rgba(204,204,204,0.4)",
                  borderRadius: "15px",
                }}
              >
                <h3 className="text-primary mb-3">Education Details</h3>
                <ul>
                  {filterResumeByUser[0].educationDetails?.map(
                    (education, index) => {
                      return (
                        <div key={index}>
                          {education.endDate ? (
                            <li>
                              <span style={{ fontWeight: "bold" }}>
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
                             <span style={{fontWeight: "bold"}}>
                             Studying {education.degree} (
                              {education.fieldOfStudy}) from{" "}
                              {education.institutionName} from{" "}
                              {changeDate(education.startDate)}{" "}
                              <span className="fw-bold">to date</span>
                              </span>
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
                    }
                  )}
                </ul>
              </Col>
            </Row>
          </Container>
        </section>
        </div>
      ): (
        <EditorProfile />
      )}
      <PdfCv />
    </>
  );
}

export default Profile;
