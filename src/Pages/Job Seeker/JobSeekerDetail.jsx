import {
    faBriefcase,
    faEnvelope,
    faFile,
    faMapMarker,
    faPhone,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { useEffect, useState } from "react";
  import { Button, Card, Col, Container, Row } from "react-bootstrap";
  import {  useParams } from "react-router-dom";
  
  function JobSeekerDetail() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [postedJobByTitle, setPostedJobByTitle] = useState([]);
    const { title } = useParams();
    const formatTitle = title.replace(/_/g, " ");
  
    const jobByTitle = async () => {
      const res = await fetch(
        `${apiUrl}/api/jobSeaker/seakerJobByTitle/${formatTitle}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      
      setPostedJobByTitle(data);
    };
  
    useEffect(() => {
      jobByTitle();
    }, []);
  
    return (
      <>
        <section className="job-head">
          <div className="page-head-overlay">
            <Container>
              <Row className="justify-content-center align-items-center py-6">
                <Col md={9}>
                  <h2 className="text-center text-white fw-bold">
                    {postedJobByTitle.title}
                  </h2>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
  
        <section
          className="job-detail py-5"
          style={{ backgroundColor: "#F2F5F8" }}
        >
          <Container>
            <Row>
              <Col md={12}>
                <Card className="detail-head p-4">
                  <div className="detail-wrapper d-flex align-items-center">
                    <div
                      className="p-4 me-3"
                      style={{ backgroundColor: "#f2f5f6" }}
                    >
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        style={{ fontSize: "25px" }}
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="section-head">
                        <h2 className="" style={{ fontSize: "200%" }}>
                          {postedJobByTitle.title}
                        </h2>
                        <p className="m-0" style={{ color: "#a9a9a9" }}>
                          {postedJobByTitle.industry}
                        </p>
                        <p className="m-0" style={{ color: "#a9a9a9" }}>
                          {postedJobByTitle.jobType}
                        </p>
                        <p className="m-0" style={{ color: "#a9a9a9" }}>
                          {postedJobByTitle.salary}
                        </p>
                      </div>
                      
                    </div>
                  </div>
                  <div className="d-flex mt-4 justify-content-between align-items-center">
                    <p className="m-0">
                    <FontAwesomeIcon
                          icon={faMapMarker}
                          style={{ color: "var(--secondary-color)" }}
                        />&nbsp; {postedJobByTitle.city}
                    </p>
                    {postedJobByTitle.resume ? (
                      <div>

                        <FontAwesomeIcon icon={faFile} style={{color: "var(--primary-color)"}}/>&nbsp; <a href={postedJobByTitle.resume} target="_blank" style={{color: "var(--primary-color)", fontWeight: "550", textDecoration: "underline"}}><u> View Resume </u></a>
                      </div>
                    ) : "Resume: N/A"}
                    <Button as="a" href={`mailto:${postedJobByTitle.email}?subject=Job%20Inquiry&body=Hello`} target="blank">Contact This Employee</Button>
                  </div>
                </Card>
  
                <Card className="detail-body p-4 mt-4">
                  <div className="d-flex justify-content-between">
                   
                    <div>
                      <h6 className="m-0">
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: "var(--secondary-color)" }}
                        />
                        &nbsp; Name
                      </h6>
                      <p className="mt-2">{postedJobByTitle.name}</p>
                    </div>
                    <div>
                      <h6 className="m-0">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          style={{ color: "var(--secondary-color)" }}
                        />
                        &nbsp; Email
                      </h6>
                      <p className="mt-2">{postedJobByTitle.email}</p>
                    </div>
                    <div>
                      <h6 className="m-0">
                        <FontAwesomeIcon
                          icon={faPhone}
                          style={{ color: "var(--secondary-color)" }}
                        />
                        &nbsp; Contact
                      </h6>
                      <p className="mt-2">{postedJobByTitle.contact}</p>
                    </div>
                    <div>
                      <h6 className="m-0">
                        <FontAwesomeIcon
                          icon={faMapMarker}
                          style={{ color: "var(--secondary-color)" }}
                        />
                        &nbsp; Location
                      </h6>
                      <p className="mt-2">
                        {postedJobByTitle.city}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3>Job Description</h3>
                    <p
                      className="m-0"
                      dangerouslySetInnerHTML={{
                        __html: postedJobByTitle.description,
                      }}
                    ></p>
                  </div>
                  <div className="mt-3">
                    <h3>Qualifications</h3>
                    <p
                      className="m-0"
                      dangerouslySetInnerHTML={{
                        __html: postedJobByTitle.qualification,
                      }}
                    ></p>
                  </div>
                  <div className="mt-3">
                    <h3>Work Experience</h3>
                    <p
                      className="m-0"
                      dangerouslySetInnerHTML={{
                        __html: postedJobByTitle.experience,
                      }}
                    ></p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
  
  export default JobSeekerDetail;
  